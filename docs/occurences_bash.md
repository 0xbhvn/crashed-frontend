# Get occurrences

```bash
>....                                                                                                                      

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
100   287  100   287    0     0     64      0  0:00:04  0:00:04 --:--:--    64
{
  "status": "success",
  "data": {
    "min_value": 10.0,
    "by_time": false,
    "params": {
      "games": 100
    },
    "occurrences": {
      "count": 14,
      "total_games": 100,
      "percentage": 14.000000000000002,
      "first_game_time": "2025-03-26T16:34:52.967000+05:30",
      "last_game_time": "2025-03-26T17:24:11.721000+05:30"
    }
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   273  100   273    0     0     59      0  0:00:04  0:00:04 --:--:--    62
{
  "status": "success",
  "data": {
    "min_value": 10.0,
    "by_time": false,
    "params": {
      "games": 200
    },
    "occurrences": {
      "count": 23,
      "total_games": 200,
      "percentage": 11.5,
      "first_game_time": "2025-03-26T15:48:48.904000+05:30",
      "last_game_time": "2025-03-26T17:24:11.721000+05:30"
    }
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   273  100   273    0     0     57      0  0:00:04  0:00:04 --:--:--    76
{
  "status": "success",
  "data": {
    "min_value": 10.0,
    "by_time": true,
    "params": {
      "hours": 1
    },
    "occurrences": {
      "count": 16,
      "total_games": 123,
      "percentage": 13.008130081300814,
      "start_time": "2025-03-26T16:24:30.935043+05:30",
      "end_time": "2025-03-26T17:24:30.935043+05:30"
    }
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   273  100   273    0     0     59      0  0:00:04  0:00:04 --:--:--    59
{
  "status": "success",
  "data": {
    "min_value": 10.0,
    "by_time": true,
    "params": {
      "hours": 3
    },
    "occurrences": {
      "count": 40,
      "total_games": 377,
      "percentage": 10.610079575596817,
      "start_time": "2025-03-26T14:24:35.707498+05:30",
      "end_time": "2025-03-26T17:24:35.707498+05:30"
    }
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   272  100   272    0     0     58      0  0:00:04  0:00:04 --:--:--    61
{
  "status": "success",
  "data": {
    "max_value": 2.0,
    "by_time": false,
    "params": {
      "games": 100
    },
    "occurrences": {
      "count": 49,
      "total_games": 100,
      "percentage": 49.0,
      "first_game_time": "2025-03-26T16:35:05.332000+05:30",
      "last_game_time": "2025-03-26T17:24:31.596000+05:30"
    }
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   272  100   272    0     0     50      0  0:00:05  0:00:05 --:--:--    65
{
  "status": "success",
  "data": {
    "max_value": 2.0,
    "by_time": true,
    "params": {
      "hours": 1
    },
    "occurrences": {
      "count": 61,
      "total_games": 124,
      "percentage": 49.193548387096776,
      "start_time": "2025-03-26T16:24:44.970426+05:30",
      "end_time": "2025-03-26T17:24:44.970426+05:30"
    }
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   270  100   270    0     0     60      0  0:00:04  0:00:04 --:--:--    63
{
  "status": "success",
  "data": {
    "floor_value": 5,
    "by_time": false,
    "params": {
      "games": 100
    },
    "occurrences": {
      "count": 1,
      "total_games": 100,
      "percentage": 1.0,
      "first_game_time": "2025-03-26T16:35:05.332000+05:30",
      "last_game_time": "2025-03-26T17:24:31.596000+05:30"
    }
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   271  100   271    0     0     59      0  0:00:04  0:00:04 --:--:--    59
{
  "status": "success",
  "data": {
    "floor_value": 5,
    "by_time": true,
    "params": {
      "hours": 2
    },
    "occurrences": {
      "count": 4,
      "total_games": 253,
      "percentage": 1.5810276679841897,
      "start_time": "2025-03-26T15:24:54.780800+05:30",
      "end_time": "2025-03-26T17:24:54.780800+05:30"
    }
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1852  100  1754  100    98    366     20  0:00:04  0:00:04 --:--:--   382
{
  "status": "success",
  "data": {
    "values": [
      2.0,
      5.0,
      10.0,
      20.0
    ],
    "by_time": false,
    "params": {
      "games": 200
    },
    "comparison": true,
    "occurrences": {
      "2.0": {
        "count": 102,
        "total_games": 200,
        "percentage": 51.0,
        "first_game_time": "2025-03-26T15:49:31.890000+05:30",
        "last_game_time": "2025-03-26T17:24:31.596000+05:30",
        "comparison": {
          "count": 95,
          "total_games": 200,
          "percentage": 47.5,
          "first_game_time": "2025-03-26T14:11:11.134000+05:30",
          "last_game_time": "2025-03-26T15:48:48.904000+05:30",
          "count_change": 7,
          "percentage_change": 3.5
        }
      },
      "5.0": {
        "count": 38,
        "total_games": 200,
        "percentage": 19.0,
        "first_game_time": "2025-03-26T15:49:31.890000+05:30",
        "last_game_time": "2025-03-26T17:24:31.596000+05:30",
        "comparison": {
          "count": 43,
          "total_games": 200,
          "percentage": 21.5,
          "first_game_time": "2025-03-26T14:11:11.134000+05:30",
          "last_game_time": "2025-03-26T15:48:48.904000+05:30",
          "count_change": -5,
          "percentage_change": -2.5
        }
      },
      "10.0": {
        "count": 23,
        "total_games": 200,
        "percentage": 11.5,
        "first_game_time": "2025-03-26T15:49:31.890000+05:30",
        "last_game_time": "2025-03-26T17:24:31.596000+05:30",
        "comparison": {
          "count": 22,
          "total_games": 200,
          "percentage": 11.0,
          "first_game_time": "2025-03-26T14:11:11.134000+05:30",
          "last_game_time": "2025-03-26T15:48:48.904000+05:30",
          "count_change": 1,
          "percentage_change": 0.5
        }
      },
      "20.0": {
        "count": 9,
        "total_games": 200,
        "percentage": 4.5,
        "first_game_time": "2025-03-26T15:49:31.890000+05:30",
        "last_game_time": "2025-03-26T17:24:31.596000+05:30",
        "comparison": {
          "count": 14,
          "total_games": 200,
          "percentage": 7.000000000000001,
          "first_game_time": "2025-03-26T14:11:11.134000+05:30",
          "last_game_time": "2025-03-26T15:48:48.904000+05:30",
          "count_change": -5,
          "percentage_change": -2.500000000000001
        }
      }
    }
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1904  100  1809  100    95    370     19  0:00:05  0:00:04  0:00:01   491
{
  "status": "success",
  "data": {
    "values": [
      2.0,
      5.0,
      10.0,
      20.0
    ],
    "by_time": true,
    "params": {
      "hours": 3
    },
    "comparison": true,
    "occurrences": {
      "2.0": {
        "count": 185,
        "total_games": 377,
        "percentage": 49.07161803713528,
        "start_time": "2025-03-26T14:25:04.144513+05:30",
        "end_time": "2025-03-26T17:25:04.144513+05:30",
        "comparison": {
          "count": 195,
          "total_games": 348,
          "percentage": 56.03448275862068,
          "start_time": "2025-03-26T11:25:04.144513+05:30",
          "end_time": "2025-03-26T14:25:04.144513+05:30",
          "count_change": -10,
          "percentage_change": -6.962864721485403
        }
      },
      "5.0": {
        "count": 73,
        "total_games": 377,
        "percentage": 19.363395225464192,
        "start_time": "2025-03-26T14:25:04.144513+05:30",
        "end_time": "2025-03-26T17:25:04.144513+05:30",
        "comparison": {
          "count": 84,
          "total_games": 348,
          "percentage": 24.137931034482758,
          "start_time": "2025-03-26T11:25:04.144513+05:30",
          "end_time": "2025-03-26T14:25:04.144513+05:30",
          "count_change": -11,
          "percentage_change": -4.774535809018566
        }
      },
      "10.0": {
        "count": 40,
        "total_games": 377,
        "percentage": 10.610079575596817,
        "start_time": "2025-03-26T14:25:04.144513+05:30",
        "end_time": "2025-03-26T17:25:04.144513+05:30",
        "comparison": {
          "count": 45,
          "total_games": 348,
          "percentage": 12.931034482758621,
          "start_time": "2025-03-26T11:25:04.144513+05:30",
          "end_time": "2025-03-26T14:25:04.144513+05:30",
          "count_change": -5,
          "percentage_change": -2.320954907161804
        }
      },
      "20.0": {
        "count": 18,
        "total_games": 377,
        "percentage": 4.774535809018567,
        "start_time": "2025-03-26T14:25:04.144513+05:30",
        "end_time": "2025-03-26T17:25:04.144513+05:30",
        "comparison": {
          "count": 26,
          "total_games": 348,
          "percentage": 7.471264367816093,
          "start_time": "2025-03-26T11:25:04.144513+05:30",
          "end_time": "2025-03-26T14:25:04.144513+05:30",
          "count_change": -8,
          "percentage_change": -2.696728558797526
        }
      }
    }
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1778  100  1703  100    75    349     15  0:00:05  0:00:04  0:00:01   464
{
  "status": "success",
  "data": {
    "values": [
      1,
      2,
      5,
      10
    ],
    "by_time": false,
    "params": {
      "games": 200
    },
    "comparison": true,
    "occurrences": {
      "1": {
        "count": 98,
        "total_games": 200,
        "percentage": 49.0,
        "first_game_time": "2025-03-26T15:49:31.890000+05:30",
        "last_game_time": "2025-03-26T17:24:31.596000+05:30",
        "comparison": {
          "count": 105,
          "total_games": 200,
          "percentage": 52.5,
          "first_game_time": "2025-03-26T14:11:11.134000+05:30",
          "last_game_time": "2025-03-26T15:48:48.904000+05:30",
          "count_change": -7,
          "percentage_change": -3.5
        }
      },
      "2": {
        "count": 36,
        "total_games": 200,
        "percentage": 18.0,
        "first_game_time": "2025-03-26T15:49:31.890000+05:30",
        "last_game_time": "2025-03-26T17:24:31.596000+05:30",
        "comparison": {
          "count": 34,
          "total_games": 200,
          "percentage": 17.0,
          "first_game_time": "2025-03-26T14:11:11.134000+05:30",
          "last_game_time": "2025-03-26T15:48:48.904000+05:30",
          "count_change": 2,
          "percentage_change": 1.0
        }
      },
      "5": {
        "count": 4,
        "total_games": 200,
        "percentage": 2.0,
        "first_game_time": "2025-03-26T15:49:31.890000+05:30",
        "last_game_time": "2025-03-26T17:24:31.596000+05:30",
        "comparison": {
          "count": 5,
          "total_games": 200,
          "percentage": 2.5,
          "first_game_time": "2025-03-26T14:11:11.134000+05:30",
          "last_game_time": "2025-03-26T15:48:48.904000+05:30",
          "count_change": -1,
          "percentage_change": -0.5
        }
      },
      "10": {
        "count": 2,
        "total_games": 200,
        "percentage": 1.0,
        "first_game_time": "2025-03-26T15:49:31.890000+05:30",
        "last_game_time": "2025-03-26T17:24:31.596000+05:30",
        "comparison": {
          "count": 1,
          "total_games": 200,
          "percentage": 0.5,
          "first_game_time": "2025-03-26T14:11:11.134000+05:30",
          "last_game_time": "2025-03-26T15:48:48.904000+05:30",
          "count_change": 1,
          "percentage_change": 0.5
        }
      }
    }
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1399  100  1326  100    73    272     14  0:00:05  0:00:04  0:00:01   362
{
  "status": "success",
  "data": {
    "values": [
      1.5,
      2.0,
      5.0
    ],
    "by_time": false,
    "params": {
      "games": 200
    },
    "comparison": true,
    "occurrences": {
      "1.5": {
        "count": 64,
        "total_games": 200,
        "percentage": 32.0,
        "first_game_time": "2025-03-26T15:50:42.373000+05:30",
        "last_game_time": "2025-03-26T17:25:05.076000+05:30",
        "comparison": {
          "count": 63,
          "total_games": 200,
          "percentage": 31.5,
          "first_game_time": "2025-03-26T14:11:24.770000+05:30",
          "last_game_time": "2025-03-26T15:49:31.890000+05:30",
          "count_change": 1,
          "percentage_change": 0.5
        }
      },
      "2.0": {
        "count": 99,
        "total_games": 200,
        "percentage": 49.5,
        "first_game_time": "2025-03-26T15:50:42.373000+05:30",
        "last_game_time": "2025-03-26T17:25:05.076000+05:30",
        "comparison": {
          "count": 105,
          "total_games": 200,
          "percentage": 52.5,
          "first_game_time": "2025-03-26T14:11:24.770000+05:30",
          "last_game_time": "2025-03-26T15:49:31.890000+05:30",
          "count_change": -6,
          "percentage_change": -3.0
        }
      },
      "5.0": {
        "count": 163,
        "total_games": 200,
        "percentage": 81.5,
        "first_game_time": "2025-03-26T15:50:42.373000+05:30",
        "last_game_time": "2025-03-26T17:25:05.076000+05:30",
        "comparison": {
          "count": 156,
          "total_games": 200,
          "percentage": 78.0,
          "first_game_time": "2025-03-26T14:11:24.770000+05:30",
          "last_game_time": "2025-03-26T15:49:31.890000+05:30",
          "count_change": 7,
          "percentage_change": 3.5
        }
      }
    }
  }
}
```