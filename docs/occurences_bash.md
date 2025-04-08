# Get occurrences

```bash
# Get occurrences of floor value exactly 5 in the last 100 games
curl -X GET "https://crashed-backend-production.up.railway.app/api/analytics/occurrences/exact-floor/5" | jq .

# Get occurrences of floor value exactly 5 in the last 2 hours
curl -X GET "https://crashed-backend-production.up.railway.app/api/analytics/occurrences/exact-floor/5?by_time=true&hours=2" | jq .

# Get occurrences of multiple minimum crash points (batch)
curl -X POST "https://crashed-backend-production.up.railway.app/api/analytics/occurrences/min-crash-points/batch" \
  -H "Content-Type: application/json" \
  -d '{
    "values": [2, 5, 10, 20],
    "games": 200,
    "by_time": false,
    "comparison": true
  }' | jq .

# Get occurrences of multiple minimum crash points by time (batch)
curl -X POST "https://crashed-backend-production.up.railway.app/api/analytics/occurrences/min-crash-points/batch" \
  -H "Content-Type: application/json" \
  -d '{
    "values": [2, 5, 10, 20],
    "hours": 3,
    "by_time": true,
    "comparison": true
  }' | jq .

# Get occurrences of multiple floor values (batch)
curl -X POST "https://crashed-backend-production.up.railway.app/api/analytics/occurrences/exact-floors/batch" \
  -H "Content-Type: application/json" \
  -d '{
    "values": [1, 2, 5, 10],
    "games": 200,
    "comparison": true
  }' | jq .

# Get occurrences of multiple maximum crash points (batch)
curl -X POST "https://crashed-backend-production.up.railway.app/api/analytics/occurrences/max-crash-points/batch" \
  -H "Content-Type: application/json" \
  -d '{
    "values": [1.5, 2, 5],
    "games": 200,
    "comparison": true
  }' | jq .
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   328  100   328    0     0    529      0 --:--:-- --:--:-- --:--:--   529
{
  "status": "success",
  "data": {
    "floor_value": 5,
    "by_time": false,
    "params": {
      "games": 100
    },
    "occurrences": {
      "count": 7,
      "total_games": 100,
      "percentage": 7.000000000000001,
      "first_game_time": "2025-04-08T04:42:28.046000+05:30",
      "last_game_time": "2025-04-08T05:26:23.589000+05:30"
    }
  },
  "cached_at": 1744070191,
  "source": "redis"
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   315  100   315    0     0    327      0 --:--:-- --:--:-- --:--:--   327
{
  "status": "success",
  "data": {
    "floor_value": 5,
    "by_time": true,
    "params": {
      "hours": 2
    },
    "occurrences": {
      "count": 12,
      "total_games": 270,
      "percentage": 4.444444444444445,
      "start_time": "2025-04-08T03:26:32.861043+05:30",
      "end_time": "2025-04-08T05:26:32.861043+05:30"
    }
  },
  "cached_at": 1744070192,
  "source": "redis"
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   914  100   816  100    98   1312    157 --:--:-- --:--:-- --:--:--  1469
{
  "status": "success",
  "data": {
    "by_time": false,
    "params": {
      "games": 200
    },
    "results": {
      "2.0": {
        "count": 90,
        "total_games": 200,
        "percentage": 45.0,
        "first_game_time": "2025-04-08T03:58:34.637000+05:30",
        "last_game_time": "2025-04-08T05:26:23.589000+05:30"
      },
      "5.0": {
        "count": 33,
        "total_games": 200,
        "percentage": 16.5,
        "first_game_time": "2025-04-08T03:58:34.637000+05:30",
        "last_game_time": "2025-04-08T05:26:23.589000+05:30"
      },
      "10.0": {
        "count": 16,
        "total_games": 200,
        "percentage": 8.0,
        "first_game_time": "2025-04-08T03:58:34.637000+05:30",
        "last_game_time": "2025-04-08T05:26:23.589000+05:30"
      },
      "20.0": {
        "count": 10,
        "total_games": 200,
        "percentage": 5.0,
        "first_game_time": "2025-04-08T03:58:34.637000+05:30",
        "last_game_time": "2025-04-08T05:26:23.589000+05:30"
      }
    }
  },
  "cached_at": 1744070193,
  "source": "redis"
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   919  100   824  100    95    858     98 --:--:-- --:--:-- --:--:--   956
{
  "status": "success",
  "data": {
    "by_time": true,
    "params": {
      "hours": 3
    },
    "results": {
      "2.0": {
        "count": 185,
        "total_games": 394,
        "percentage": 46.954314720812185,
        "start_time": "2025-04-08T02:26:35.134220+05:30",
        "end_time": "2025-04-08T05:26:35.134220+05:30"
      },
      "5.0": {
        "count": 71,
        "total_games": 394,
        "percentage": 18.02030456852792,
        "start_time": "2025-04-08T02:26:35.197506+05:30",
        "end_time": "2025-04-08T05:26:35.197506+05:30"
      },
      "10.0": {
        "count": 35,
        "total_games": 394,
        "percentage": 8.883248730964468,
        "start_time": "2025-04-08T02:26:35.204155+05:30",
        "end_time": "2025-04-08T05:26:35.204155+05:30"
      },
      "20.0": {
        "count": 21,
        "total_games": 394,
        "percentage": 5.32994923857868,
        "start_time": "2025-04-08T02:26:35.212445+05:30",
        "end_time": "2025-04-08T05:26:35.212445+05:30"
      }
    }
  },
  "cached_at": 1744070195,
  "source": "redis"
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   895  100   820  100    75   1285    117 --:--:-- --:--:-- --:--:--  1400
{
  "status": "success",
  "data": {
    "by_time": false,
    "params": {
      "games": 200
    },
    "results": {
      "1": {
        "count": 110,
        "total_games": 200,
        "percentage": 55.00000000000001,
        "first_game_time": "2025-04-08T03:58:34.637000+05:30",
        "last_game_time": "2025-04-08T05:26:23.589000+05:30"
      },
      "2": {
        "count": 33,
        "total_games": 200,
        "percentage": 16.5,
        "first_game_time": "2025-04-08T03:58:34.637000+05:30",
        "last_game_time": "2025-04-08T05:26:23.589000+05:30"
      },
      "5": {
        "count": 10,
        "total_games": 200,
        "percentage": 5.0,
        "first_game_time": "2025-04-08T03:58:34.637000+05:30",
        "last_game_time": "2025-04-08T05:26:23.589000+05:30"
      },
      "10": {
        "count": 0,
        "total_games": 200,
        "percentage": 0.0,
        "first_game_time": "2025-04-08T03:58:34.637000+05:30",
        "last_game_time": "2025-04-08T05:26:23.589000+05:30"
      }
    }
  },
  "cached_at": 1744070196,
  "source": "redis"
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   733  100   660  100    73    658     72  0:00:01  0:00:01 --:--:--   732
{
  "status": "success",
  "data": {
    "by_time": false,
    "params": {
      "games": 200
    },
    "results": {
      "1.5": {
        "count": 75,
        "total_games": 200,
        "percentage": 37.5,
        "first_game_time": "2025-04-08T03:58:34.637000+05:30",
        "last_game_time": "2025-04-08T05:26:23.589000+05:30"
      },
      "2.0": {
        "count": 110,
        "total_games": 200,
        "percentage": 55.00000000000001,
        "first_game_time": "2025-04-08T03:58:34.637000+05:30",
        "last_game_time": "2025-04-08T05:26:23.589000+05:30"
      },
      "5.0": {
        "count": 167,
        "total_games": 200,
        "percentage": 83.5,
        "first_game_time": "2025-04-08T03:58:34.637000+05:30",
        "last_game_time": "2025-04-08T05:26:23.589000+05:30"
      }
    }
  },
  "cached_at": 1744070197,
  "source": "redis"
}
```
