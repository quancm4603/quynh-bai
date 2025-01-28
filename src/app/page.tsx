"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
} from "@mui/material";

interface Player {
  id: string;
  name: string;
  score: number;
  avatar: string;
}

const zodiacAvatars = [
  "https://cdn.xtmobile.vn/vnt_upload/news/04_2024/hinh-nen-12-con-giap-tuoi-ti-1-xtmobile.jpg", // Replace with actual Rat image URL
  "https://cdn.xtmobile.vn/vnt_upload/news/04_2024/hinh-nen-12-con-giap-tuoi-suu-3-xtmobile.jpg", // Replace with actual Ox image URL
  "https://cdn.xtmobile.vn/vnt_upload/news/04_2024/hinh-nen-12-con-giap-tuoi-dan-2-xtmobile.jpg", // Replace with actual Tiger image URL
  "https://cdn.xtmobile.vn/vnt_upload/news/04_2024/hinh-nen-12-con-giap-tuoi-mao-1-xtmobile.jpg", // Replace with actual Rabbit image URL
  "https://cdn.xtmobile.vn/vnt_upload/news/04_2024/hinh-nen-12-con-giap-tuoi-thin-1-xtmobile.jpg", // Replace with actual Dragon image URL
  "https://cdn.xtmobile.vn/vnt_upload/news/04_2024/hinh-nen-12-con-giap-tuoi-ty-2-xtmobile.jpg", // Replace with actual Snake image URL
  "https://cdn.xtmobile.vn/vnt_upload/news/04_2024/hinh-nen-12-con-giap-tuoi-ngo-4-xtmobile.jpg", // Replace with actual Horse image URL
  "https://cdn.xtmobile.vn/vnt_upload/news/04_2024/hinh-nen-12-con-giap-tuoi-mui-4-xtmobile.jpg", // Replace with actual Goat image URL
  "https://cdn.xtmobile.vn/vnt_upload/news/04_2024/hinh-nen-12-con-giap-tuoi-than-1-xtmobile.jpg", // Replace with actual Monkey image URL
  "https://cdn.xtmobile.vn/vnt_upload/news/04_2024/hinh-nen-12-con-giap-tuoi-dau-2-xtmobile.jpg", // Replace with actual Rooster image URL
  "https://cdn.xtmobile.vn/vnt_upload/news/04_2024/hinh-nen-12-con-giap-tuoi-tuat-3-xtmobile.jpg", // Replace with actual Dog image URL
  "https://cdn.xtmobile.vn/vnt_upload/news/04_2024/hinh-nen-12-con-giap-tuoi-hoi-1-xtmobile.jpg", // Replace with actual Pig image URL
];

// Variable to hold the background image link
const backgroundImageURL =
  "https://nguyencongpc.vn/media/news/2612_hinh-nen-tet-2025-3.jpg";

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState<string>("");
  const [dealerId, setDealerId] = useState<string>("");

  const addPlayer = () => {
    if (playerName) {
      const randomAvatar =
        zodiacAvatars[Math.floor(Math.random() * zodiacAvatars.length)];
      setPlayers([
        ...players,
        { id: uuidv4(), name: playerName, score: 0, avatar: randomAvatar },
      ]);
      setPlayerName("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      addPlayer();
    }
  };

  const setDealer = (id: string) => {
    setDealerId(id);
    setPlayers((prevPlayers) => {
      const dealer = prevPlayers.find((player) => player.id === id);
      const otherPlayers = prevPlayers.filter((player) => player.id !== id);
      return [dealer!, ...otherPlayers];
    });
  };

  const modifyScore = (playerId: string, isAdding: boolean, amount: number) => {
    setPlayers((prevPlayers) => {
      const dealer = prevPlayers.find((player) => player.id === dealerId);
      const playerToModify = prevPlayers.find(
        (player) => player.id === playerId
      );

      if (dealer && playerToModify) {
        const newDealerScore = isAdding
          ? dealer.score - amount
          : dealer.score + amount;
        const newPlayerScore = isAdding
          ? playerToModify.score + amount
          : playerToModify.score - amount;

        return prevPlayers.map((player) => {
          if (player.id === dealerId) {
            return { ...player, score: newDealerScore };
          } else if (player.id === playerId) {
            return { ...player, score: newPlayerScore };
          }
          return player;
        });
      }
      return prevPlayers;
    });
  };

  return (
    <Container
      style={{
        padding: "20px",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImageURL})`, // Dynamically load the background
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Background overlay with blur */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Overlay color
          backdropFilter: "blur(10px)", // Blur effect
          zIndex: 0,
        }}
      ></div>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            textAlign: "center",
            color: "#ffd700", // Màu vàng
            fontWeight: "bold",
            textShadow: "2px 2px 4px #000",
          }}
        >
          XÌ LÁC THỦ ĐÔ VÙNG NHƠN
        </Typography>

        <Grid container spacing={2} alignItems="center" marginBottom={1}>
          <Grid item xs={8}>
            <TextField
              label="Thêm người chơi"
              variant="outlined"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={handleKeyDown}
              fullWidth
              InputProps={{
                style: { height: "56px" },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={addPlayer}
              fullWidth
              style={{
                height: "56px",
                backgroundColor: "#d32f2f",
                color: "#fff",
              }}
            >
              Thêm
            </Button>
          </Grid>
        </Grid>

        {dealerId && (
          <Typography
            variant="h6"
            style={{
              marginTop: "20px",
              color: "#d84315",
              fontWeight: "bold",
              textShadow: "1px 1px 2px #000",
            }}
          >
            Nhà Cái: {players.find((player) => player.id === dealerId)?.name}
          </Typography>
        )}
        <Grid container spacing={2}>
          {players.map((player) => (
            <Grid item xs={12} sm={6} md={4} key={player.id}>
              <Card
                variant="outlined"
                style={{
                  backgroundColor:
                    dealerId === player.id ? "#fff59d" : "#e0f7fa",
                  border: "2px solid #d32f2f",
                }}
              >
                <CardContent>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Avatar
                        src={player.avatar}
                        alt={player.name}
                        style={{ width: 56, height: 56 }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">
                        {player.name} (Điểm: {player.score})
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  {dealerId !== player.id ? (
                    <>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setDealer(player.id)}
                      >
                        Làm Cái
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        onClick={() => modifyScore(player.id, true, 1)}
                      >
                        +1
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => modifyScore(player.id, false, 1)}
                      >
                        -1
                      </Button>
                    </>
                  ) : (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{ fontStyle: "italic" }}
                    >
                      (Nhà Cái)
                    </Typography>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
}
