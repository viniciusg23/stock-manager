import { Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";

function SupplierSelect(props: any) {

    const [suppliers, setSuppliers] = useState<{name: string, description: string}[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const options = {method: 'GET'};

                const data = await fetch('/supplier/view', options);
                const jsonData = await data.json();

                setSuppliers(jsonData.suppliers);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);
    
    return (
        <Select
            labelId="pursacheMonth"
            value={""}
            label="Mês de Compra"
            onChange={(e) => {props.supplierState(e.target.value)}}
        >
            {suppliers.map((supplier) => (
                <MenuItem value={supplier.name}>{supplier.name}</MenuItem>
            ))}
            
        </Select>
    );
}

export default SupplierSelect;