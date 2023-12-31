"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Modal,
} from "@mui/material";

import { TrackingInfo } from "@/components/tracking-info";

const Map = dynamic(
  () => import("@/components/map").then((module) => module.Map),
  { ssr: false }
);

export default function HomePage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [delivery, setDelivery] = useState<any>();
  const [error, setError] = useState<any>(false);
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (event.currentTarget.trackingCode.value == 696969) {
      setOpenModal(true);

      return;
    }

    setTrackingCode(event.currentTarget.trackingCode.value);
  };

  const getTracking = useCallback(async () => {
    const response = await fetch(`api/tracking?trackingCode=${trackingCode}`);
    const { data, hasError } = await response.json();

    setError(hasError);
    setDelivery(data);
  }, [trackingCode]);

  useEffect(() => {
    getTracking();
  }, [getTracking]);

  function renderDelivery() {
    if (!delivery) return;

    return <TrackingInfo trackingInfo={delivery} />;
  }

  function renderError() {
    if (error) {
      return (
        <Typography variant="h5">Código de rastreio não encontrado</Typography>
      );
    }
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />

      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "80px",
          height: "100vh",
        }}
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "350px",
            margin: "20px 0",
          }}
        >
          <Typography component="h1" variant="h5">
            Olá! <br /> Acompanhe a entrega do seu pedido. 😃
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="trackingCode"
              label="Código de rastreamento"
              name="trackingCode"
              autoFocus
            />

            <Button type="submit" variant="contained">
              Acompanhar pedido
            </Button>
          </Box>
        </Box>

        {renderError()}
        {renderDelivery()}
      </Grid>

      <Grid
        item
        xs={false}
        sx={{ height: "100vh", overflow: "hidden" }}
        sm={4}
        md={7}
      >
        <Map
          sender={delivery?.sender?.address}
          receiver={delivery?.receiver?.address}
        />
      </Grid>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 4,
          }}
        >
          <Image
            src="/nig.png"
            alt="acompanhar entrega"
            width={1110}
            height={762}
          />
        </Box>
      </Modal>
    </Grid>
  );
}
