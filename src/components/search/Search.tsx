import { Autocomplete, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const recommed = [
    {
        title: "test"
    }
];

export const Search = () => {



    return (
            <Box pt={8} sx={{
                width: "100%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                    <Autocomplete
                        sx={{
                            width: "60%",
                        }}
                        options={[{ title: "test" }].map((option: any) => option.title)}
                        renderInput={(params) => <TextField {...params} label="freeSolo" />}
                        freeSolo />
            </Box>
    );
}