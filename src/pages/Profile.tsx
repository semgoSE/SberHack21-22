import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  Box,
  Paper,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { Header } from "../components/header";
import { AccountContext } from "../context/Account";
import { WalletCard } from "../components/profile/wallet-card/WalletCard";
import { Transaction } from "../components/profile/transaction/Transaction";
import { UserCard } from "../components/profile/user-card/UserCard";
import { CardItem } from "../components/CardItem/CardItem";

export const Profile = () => {
  const { user } = useContext(AccountContext);
  const [objcList, setObjcList] = useState<any>([]);
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [knumber, setKNumber] = useState("");
  const [count, setCount] = useState("");
  const handleGetObject = async () => {
    let req = await user?.cls.create_object_tokens(
      address,
      area,
      knumber,
      count
    );
    console.log("TEST: Request for ObjC send");
  };
  useEffect(() => {
    const getObjcList = async () => {
      const olist = await user?.cls.wallet.get_objc_list();
      if (olist) {
        setObjcList([...olist]);
      }
    };
    setInterval(getObjcList, 5000);
  }, []);

  return (
    <Box component="main" sx={{ height: "100vh" }}>
      <Header />
      <Typography pl={4} pt={8} variant="h2">
        Ваш аккаунт
      </Typography>
      <Box p={4} component="div">
        <Grid container spacing={4} justifyContent="center">
          <Grid item>
            <UserCard />
          </Grid>
          <Grid item>
            <WalletCard />
          </Grid>
          {/* <Grid item>
                        <Paper>
                            <Box
                                p={2}
                            >
                                <Typography color={"black"} variant="h4">Последние транзакции</Typography>
                                <List>
                                    <Transaction />
                                    <Transaction />
                                </List>
                                <Button variant="text">Показать все</Button>
                            </Box>
                        </Paper>
                    </Grid> */}
        </Grid>
      </Box>
      {user?.name === "bank" && (
        <div>
          <Typography pl={4} variant="h2">
            Токенезация недвижимости(admin)
          </Typography>
          <Box maxWidth={400} p={2}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="street"
              label="Address"
              name="street"
              autoFocus
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="area"
              label="Area"
              type="text"
              id="area"
              onChange={(event) => {
                setArea(event.target.value);
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="knumber"
              label="KNumber"
              id="knumber"
              onChange={(event) => {
                setKNumber(event.target.value);
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="count"
              label="Count"
              type="number"
              id="count"
              onChange={(event) => {
                setCount(event.target.value);
              }}
            />
            <Button size="large" variant="contained" onClick={handleGetObject}>
              Создать
            </Button>
          </Box>
        </div>
      )}
      <Typography pl={4} variant="h2">
        Ваши активы
      </Typography>
      <Box p={4} sx={{ display: "flex", maxWidth: 800 }}>
        <List>
          {objcList &&
            (objcList as any).map((tokenAddress: any, j: number) => {
              const content = tokenAddress.tokenBody.content;
              return (
                <>
                  <CardItem
                    key={tokenAddress.tokenBody.tokenId}
                    isProfile={true}
                    address={content[1]}
                    area={parseInt(content[2])}
                    knubmer={content[3]}
                    num={parseInt(content[0])}
                    count={parseInt(content[4])}
                    id={tokenAddress.tokenBody.tokenId}
                    token={tokenAddress}
                  />
                </>
              );
            })}
        </List>
      </Box>
      
    </Box>
  );
};
