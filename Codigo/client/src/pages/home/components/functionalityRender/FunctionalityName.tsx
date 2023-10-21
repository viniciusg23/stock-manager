import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FadeIn from "react-fade-in/lib/FadeIn";

interface IFunctionalityNameProps {
    functionality: string;
}

function FunctionalityName({ functionality }: IFunctionalityNameProps) {
    const [key, setKey] = useState<number>(0);

    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [functionality]);

    return (
        <FadeIn key={key}>
            <Typography>{functionality}</Typography>
        </FadeIn>
    );
}

export default FunctionalityName;