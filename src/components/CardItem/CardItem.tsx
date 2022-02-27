import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

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
  price?: number;
  idOffer?: string;
  knubmer: string;
}

export const CardItem = (props: CardItemProps) => {
  const nav = useNavigate();

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
        <Typography align="center" component="span" sx={{ fontSize: 18 }}>
          {props.price} SBC
        </Typography>
        {!props.isProfile && (
          <>
            <Typography align="center" component="span" sx={{ fontSize: 18 }}>
              KNumber: {props.knubmer}
            </Typography>

            <Typography align="center" component="span" sx={{ fontSize: 12 }}>
              ID offer: {props.idOffer}
            </Typography>
          </>
        )}
      </Box>
      <Box
        component="div"
        p={2}
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
      >
        <Button variant="contained">
          {props.isProfile ? "Продать" : "Купить"}
        </Button>
        {props.isProfile && <Button variant="contained" color="error">Уничтожить</Button>}
        <Button sx={{ marginLeft: 2 }} onClick={() => nav("/item")}>
          Подробнее
        </Button>
      </Box>
    </Paper>
  );
};
