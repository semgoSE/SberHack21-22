import { Box, Button, Link, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../../context/Account";

export const WalletCard = () => {
  const { user } = useContext(AccountContext);
  const [sbcList, getSBCList] = useState({});

  useEffect(() => {
    const getSbc = async () => {
      const sbc = await user?.cls.wallet.get_sbc_list();
      getSBCList(sbc);
      console.log(sbc);
      
    };
    setInterval(getSbc, 5000);
  }, []);
  const handleGetSBC = async () => {
    let req = await user?.cls.send_request_for_sbercoin("100000");
    console.log("TEST: Request for SBC send");
  };
  return (
    <Paper>
      <Box
        p={2}
        sx={{
          borderRadius: 4,
          background: "linear-gradient(to bottom right, #21BA72, #A0E720)",
          height: 170,
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 360,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 16,
          }}
        >
          <Typography p={1} sx={{ color: "white" }} variant="h4">
            Текущий баланс
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            left: 16,
          }}
        >
          {(sbcList as any).tokens &&
            (sbcList as any).tokens.map((token: any) => {
              return (
                <Typography color="white">
                  {token.tokenBody.content[0]}
                </Typography>
              );
            })}
        </Box>
        <Typography color="white" variant="subtitle1">
          {(sbcList as any).all} SBC
        </Typography>
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            right: 16,
          }}
        >
          {(sbcList as any).tokens &&
            (sbcList as any).tokens.map((token: any) => {
              return (
                <Typography color="white">
                  {"****" + token.tokenBody.tokenId.slice(-10)}
                </Typography>
              );
            })}
        </Box>
      </Box>

      <Stack direction="row" justifyContent="center" p={1}>
        <Button onClick={handleGetSBC}>Пополнить (100 000 SBC)</Button>
        {/* <Button>Вывести</Button> */}
      </Stack>
    </Paper>
  );
};
