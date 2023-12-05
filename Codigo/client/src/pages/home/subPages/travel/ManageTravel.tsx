import { useEffect, useState } from "react";
import FadeTransition from "../../components/FadeTransition";
import { Box, Button, Typography } from "@mui/material";
import NewTravelController from "./components/NewTravelController";
import { Product } from "../../../../entities/Product";
import ProductPurchasedOnTravel from "./components/ProductPurchasedOnTravel";
import { enqueueSnackbar } from "notistack";
import NewPurchaseForm from "./components/NewPurchaseForm";
import SpendController from "./components/SpendController";
import PDFBody from "./components/PDFBody";
import { PictureAsPdf } from "@mui/icons-material";

export interface IPurchasedProduct {
  id: number;
  product: Product;
  uniquePrice: number;
  quantity: number;
  total: number;
}

function ManageTravel() {
  const [purchasedProducts, setPurchasedProducts] = useState<IPurchasedProduct[]>([]);

  const [travelName, setTravelName] = useState<string>("");
  const [travelCost, setTravelCost] = useState<string>("");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [uniquePrice, setUniquePrice] = useState<number | string>("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [total, setTotal] = useState<number | string>("");

  const [travelOptions, setTravelOptions] = useState<boolean>(false);
  const [actualCost, setActualCost] = useState<number>(0);

  const handleAddProduct = () => {
    if (!selectedProduct || !uniquePrice || !quantity || !total) {
      enqueueSnackbar("Campos Inválidos", { variant: "error" });
      return;
    }

    const newPurchase: IPurchasedProduct = {
      id: Math.random(),
      product: selectedProduct,
      uniquePrice: Number(uniquePrice),
      quantity: Number(quantity),
      total: Number(total),
    };

    const updatedArray = [...purchasedProducts, newPurchase];

    setPurchasedProducts(updatedArray);
  };

  const handleRemovePurchase = (purchaseId: number) => {
    const updatedArray = purchasedProducts.filter(
      (purchase) => purchase.id !== purchaseId
    );

    setPurchasedProducts(updatedArray);
  };

  useEffect(() => {
    if (uniquePrice && quantity) {
      setTotal(Number(uniquePrice) * Number(quantity));
    }
  }, [uniquePrice, quantity]);

  useEffect(() => {
    const total = purchasedProducts.reduce(
      (accumulator, purchased) => accumulator + purchased.total,
      0
    );
    setActualCost(total);
  }, [purchasedProducts]);

  return (
    <FadeTransition>
      <>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="end"
          mb="1em"
        >
          <Typography variant="h4" m={0}>
            Viagens
          </Typography>

          <NewTravelController
            travelName={travelName}
            setTravelName={setTravelName}
            travelCost={travelCost}
            setTravelCost={setTravelCost}
            travelOptions={travelOptions}
            setTravelOptions={setTravelOptions}
          />
        </Box>

        <Box
          sx={{
            display: travelOptions ? "flex" : "none",
            justifyContent: "space-between",
            mt: "2em",
            gap: "1em",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
              pr: "1.5em",
              borderRight: "2px solid #000",
            }}
          >
            <SpendController
              travelCost={travelCost}
              actualCost={actualCost.toString()}
            />

            <NewPurchaseForm
              uniquePrice={uniquePrice}
              handleUniquePriceChange={(
                event: React.ChangeEvent<HTMLInputElement>
              ) => setUniquePrice(event.target.value)}
              quantity={quantity}
              handleQuantityChange={(
                event: React.ChangeEvent<HTMLInputElement>
              ) => setQuantity(event.target.value)}
              total={total}
              handleTotalChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setTotal(event.target.value)
              }
              handleProductSelect={(
                event: React.ChangeEvent<{}>,
                value: any | null
              ) => setSelectedProduct(value)}
              handleAddProduct={handleAddProduct}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              width: "60%",
              gap: "1em",
            }}
          >
            <Typography sx={{ fontSize: "1.2em" }}>
              Produtos Comprados Na Viagem
            </Typography>
            {purchasedProducts.length < 1 ? (
              <Typography
                my="3em"
                sx={{
                  opacity: 0.5,
                  fontSize: "2em",
                }}
              >
                Nenhum produto adicionado por enquanto
              </Typography>
            ) : (
              <>
                {purchasedProducts.map((purchase) => {
                  return (
                    <ProductPurchasedOnTravel
                      info={purchase}
                      handleRemoveProduct={handleRemovePurchase}
                    />
                  );
                })}
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={(e) => {
                      const totalValue: number = purchasedProducts.map((purchase) => purchase.total).reduce((acc, currentValue) => acc + currentValue, 0);

                      const pdfBody = { produtos: purchasedProducts, valorTotal: totalValue };                    
                      PDFBody(pdfBody);
                  }}
                >
                  <PictureAsPdf />
                  Gerar PDF
                </Button>
              </>
            )}
          </Box>
        </Box>
      </>
    </FadeTransition>
  );
}

export default ManageTravel;
