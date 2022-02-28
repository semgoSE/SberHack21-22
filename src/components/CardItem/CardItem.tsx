import React, { useState, useContext } from "react";
import { Box, Button, Paper, Typography, TextField } from "@mui/material";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { putOffer } from "./../../lib/market";
import { AccountContext } from "./../../context/Account";
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

interface CardItemProps {
  isProfile: boolean;
  address: string;
  num: number;
  count: number;
  area: number;
  price?: number;
  id?: string;
  knubmer: string;
  token?: any;
}

export const CardItem = (props: CardItemProps) => {
  const nav = useNavigate();
  const { user } = useContext(AccountContext);
  const [price, setPrice] = useState(0);
  const handlePutOffer = async (obj: any) => {
    setTimeout(
      async () =>
        await putOffer(
          user?.cls,
          obj,
          price,
          (user?.cls as any).wallet.sbc_type
        ),
      1000
    );
  };

  const handleBuy = async (obj: any) => {
    const sbcList = await user?.cls.wallet.sbw.listTokenSupplyCandidates(props.id)
    if (sbcList) {
      if (sbcList.length == 0) await user?.cls.send_request_for_sbercoin(props.price)
      if (sbcList.length > 0) await user?.cls.wallet.sbw.applyForOffer(props.id, sbcList[0]) 
      else console.error("WALLET: No token for buy");
      
    }
  };

  const handleCloseOffer = async (obj: any) => {
    await user?.cls.wallet.sbw.closeOffer(obj)
  };
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        alignItems: "center",
        overflow: "hidden",
        fontWeight: "bold",
      }}
    >
      <Box
        component="img"
        sx={{
          maxWidth: 400,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        alt="The house from the offer."
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
        }}
      >
        <Typography align="center" component="span" sx={{ fontSize: 22 }}>
          ({props.num}/{props.count}) {props.address}
        </Typography>
        {!props.isProfile && (
          <>
            <Typography align="center" component="span" sx={{ fontSize: 18 }}>
              {props.price} SBC
            </Typography>

            <Typography align="center" component="span" sx={{ fontSize: 18 }}>
              KNumber: {props.knubmer}
            </Typography>

            <Typography align="center" component="span" sx={{ fontSize: 12 }}>
              ID: {props.id}
            </Typography>
          </>
        )}
      </Box>
      <Box
        component="div"
        p={2}
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
      >
        {props.isProfile && (
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            autoComplete="price"
            autoFocus
            onChange={(event: any) => {
              setPrice(event.target.value);
            }}
          />
        )}
        {props.isProfile && (
          <Button
            variant="contained"
            onClick={() => handlePutOffer(props.token)}
          >
            Продать
          </Button>
        )}
        {!props.isProfile && (
          <Button variant="contained" onClick={() => handleBuy(props.token)}>
            Купить
          </Button>
        )}
        {!props.isProfile && user?.email == "bank@sbrf.ru" && (
          <Button variant="contained" color="error" onClick={() => handleCloseOffer(props.id)}>
            Снять
          </Button>
        )}
        {props.isProfile && (
          <Button variant="contained" color="error">
            Уничтожить
          </Button>
        )}
        {/* <Button sx={{ marginLeft: 2 }} onClick={() => nav("/item")}>
          Подробнее
        </Button> */}
      </Box>
    </Paper>
  );
};
