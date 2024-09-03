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
} from "@mui/material";

interface Player {
  id: string;
  name: string;
  score: number;
}

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState<string>("");
  const [dealerId, setDealerId] = useState<string>("");

  const addPlayer = () => {
    if (playerName) {
      setPlayers([...players, { id: uuidv4(), name: playerName, score: 0 }]);
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
      return [dealer!, ...otherPlayers]; // Đẩy nhà cái lên đầu danh sách
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
    <Container style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        XÌ LÁC VÙNG NHƠN
      </Typography>

      <Grid container spacing={2} alignItems="center" marginBottom={1}>
        <Grid item xs={8}>
          <TextField
            label="Add vô sòng"
            variant="outlined"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={handleKeyDown}
            fullWidth
            InputProps={{
              style: { height: "56px" }, // Đặt chiều cao mong muốn
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={addPlayer}
            fullWidth
            style={{ height: "56px" }}
          >
            Vô sòng
          </Button>
        </Grid>
      </Grid>

      {dealerId && (
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Nhà Cái: {players.find((player) => player.id === dealerId)?.name}
        </Typography>
      )}
      <Grid container spacing={2}>
        {players.map((player) => (
          <Grid item xs={12} sm={6} md={4} key={player.id}>
            <Card
              variant="outlined"
              style={{
                backgroundColor: dealerId === player.id ? "#f0f0f0" : "#e0f7fa",
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  {player.name} (Điểm: {player.score})
                </Typography>
              </CardContent>
              <CardActions>
                {dealerId !== player.id ? (
                  <>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setDealer(player.id)}
                    >
                      Cho Làm Cái
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="success"
                      onClick={() => modifyScore(player.id, true, 1)}
                    >
                      Cộng tiền (1)
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => modifyScore(player.id, false, 1)}
                    >
                      Trừ tiền (1)
                    </Button>
                  </>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    (Nhà Cái)
                  </Typography>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
