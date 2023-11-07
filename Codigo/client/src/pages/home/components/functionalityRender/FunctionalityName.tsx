import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface IFunctionalityNameProps {
    functionality: string;
}

function FunctionalityName({ functionality }: IFunctionalityNameProps) {
    const [key, setKey] = useState<number>(0);

    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [functionality]);

    return (
        <Typography>{functionality}</Typography>
    );
}

export default FunctionalityName;