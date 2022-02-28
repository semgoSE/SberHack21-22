import React, { useContext, useState, useEffect } from "react";
import {
  Avatar,
  Grid,
  Stack,
  Typography,
  Box,
  Autocomplete,
  TextField,
  Container,
} from "@mui/material";
import { Header } from "../components/header";
import { Search } from "../components/search";
import { CardItem } from "../components/CardItem/CardItem";
import { AccountContext } from "../context/Account";
import { listOffers } from "../lib/market";

export const Market = () => {
  const { user } = useContext(AccountContext);

  const [offers, setOffers] = useState<any>([]);

  useEffect(() => {
    const getOffers = async () => {
      const lOffers = await listOffers(user?.cls);
      setOffers(lOffers);
    };
    setInterval(getOffers, 5000);
  },[]);

  return (
    <Grid component="main" sx={{ height: "100vh" }}>
      <Header />
      <Search />
      <Box pt={8}>
        <Grid
          container
          spacing={4}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {offers &&
            offers.map((offer: any) => {
              return (
                <Grid item>
                  <CardItem
                    isProfile={false}
                    address={offer.objc_content[1]}
                    num={offer.objc_content[0]}
                    count={offer.objc_content[4]}
                    price={offer.sbc}
                    area={offer.objc_content[2]}
                    id={offer.id}
                    knubmer={offer.objc_content[3]}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Grid>
  );
};
