# Get series

```bash
# Get series of games without crash points >= 10 in the last 1000 games
curl -X GET "https://crashed-backend-production.up.railway.app/api/analytics/series/without-min-crash-point/10" | jq .

# Get series of games without crash points >= 10 in the last 2000 games, sorted by series length
curl -X GET "https://crashed-backend-production.up.railway.app/api/analytics/series/without-min-crash-point/10?limit=2000&sort_by=length" | jq .

# Get series of games without crash points >= 10 in the last 24 hours
curl -X GET "https://crashed-backend-production.up.railway.app/api/analytics/series/without-min-crash-point/10/time" | jq .

# Get series of games without crash points >= 10 in the last 48 hours, sorted by series length
curl -X GET "https://crashed-backend-production.up.railway.app/api/analytics/series/without-min-crash-point/10/time?hours=48&sort_by=length" | jq .

# Get series with timezone conversion
curl -X GET "https://crashed-backend-production.up.railway.app/api/analytics/series/without-min-crash-point/10" -H "X-Timezone: America/New_York" | jq .
      {
        "start_game_id": "7980045",
        "start_time": "2025-03-26T13:23:10.062000+05:30",
        "end_game_id": "7980066",
        "end_time": "2025-03-26T13:31:34.463000+05:30",
        "length": 22,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980067",
              "crash_point": 15.74,
              "time": "2025-03-26T13:32:31.934000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975605",
        "start_time": "2025-03-25T02:31:04.826000+05:30",
        "end_game_id": "7975625",
        "end_time": "2025-03-25T02:38:29.625000+05:30",
        "length": 21,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975626",
              "crash_point": 401.51,
              "time": "2025-03-25T02:40:22.084000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975897",
        "start_time": "2025-03-25T04:50:08.955000+05:30",
        "end_game_id": "7975917",
        "end_time": "2025-03-25T04:57:43.313000+05:30",
        "length": 21,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975918",
              "crash_point": 16.58,
              "time": "2025-03-25T04:58:41.752000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976539",
        "start_time": "2025-03-25T09:58:15.108000+05:30",
        "end_game_id": "7976559",
        "end_time": "2025-03-25T10:06:23.925000+05:30",
        "length": 21,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976560",
              "crash_point": 15.94,
              "time": "2025-03-25T10:07:22.200000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977378",
        "start_time": "2025-03-25T16:23:59.526000+05:30",
        "end_game_id": "7977398",
        "end_time": "2025-03-25T16:33:06.063000+05:30",
        "length": 21,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7977399",
              "crash_point": 54.99,
              "time": "2025-03-25T16:34:24.972000+05:30"
            },
            {
              "game_id": "7977400",
              "crash_point": 15.59,
              "time": "2025-03-25T16:35:22.276000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978572",
        "start_time": "2025-03-26T01:42:26.035000+05:30",
        "end_game_id": "7978592",
        "end_time": "2025-03-26T01:51:44.008000+05:30",
        "length": 21,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978593",
              "crash_point": 38.99,
              "time": "2025-03-26T01:52:56.903000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980293",
        "start_time": "2025-03-26T15:26:11.380000+05:30",
        "end_game_id": "7980313",
        "end_time": "2025-03-26T15:33:31.981000+05:30",
        "length": 21,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7980314",
              "crash_point": 25.22,
              "time": "2025-03-26T15:34:38.286000+05:30"
            },
            {
              "game_id": "7980315",
              "crash_point": 290.49,
              "time": "2025-03-26T15:36:24.350000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976643",
        "start_time": "2025-03-25T10:47:22.884000+05:30",
        "end_game_id": "7976662",
        "end_time": "2025-03-25T10:55:21.959000+05:30",
        "length": 20,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7976663",
              "crash_point": 11.7,
              "time": "2025-03-25T10:56:14.587000+05:30"
            },
            {
              "game_id": "7976664",
              "crash_point": 2050.6,
              "time": "2025-03-25T10:58:33.430000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977822",
        "start_time": "2025-03-25T19:47:39.869000+05:30",
        "end_game_id": "7977841",
        "end_time": "2025-03-25T19:54:42.464000+05:30",
        "length": 20,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977842",
              "crash_point": 156.29,
              "time": "2025-03-25T19:56:18.587000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978727",
        "start_time": "2025-03-26T02:57:52.026000+05:30",
        "end_game_id": "7978746",
        "end_time": "2025-03-26T03:04:27.121000+05:30",
        "length": 20,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978747",
              "crash_point": 10.12,
              "time": "2025-03-26T03:05:17.523000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978814",
        "start_time": "2025-03-26T03:39:23.453000+05:30",
        "end_game_id": "7978833",
        "end_time": "2025-03-26T03:46:01.703000+05:30",
        "length": 20,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978834",
              "crash_point": 22.36,
              "time": "2025-03-26T03:47:05.115000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979092",
        "start_time": "2025-03-26T05:46:34.530000+05:30",
        "end_game_id": "7979111",
        "end_time": "2025-03-26T05:55:14.409000+05:30",
        "length": 20,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979112",
              "crash_point": 81.67,
              "time": "2025-03-26T05:56:39.493000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974466",
        "start_time": "2025-03-24T17:48:30.388000+05:30",
        "end_game_id": "7974484",
        "end_time": "2025-03-24T17:56:38.253000+05:30",
        "length": 19,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974485",
              "crash_point": 10.95,
              "time": "2025-03-24T17:57:30.781000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974858",
        "start_time": "2025-03-24T20:48:00.704000+05:30",
        "end_game_id": "7974876",
        "end_time": "2025-03-24T20:56:01.088000+05:30",
        "length": 19,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974877",
              "crash_point": 209.79,
              "time": "2025-03-24T20:57:41.923000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975721",
        "start_time": "2025-03-25T03:29:13.926000+05:30",
        "end_game_id": "7975739",
        "end_time": "2025-03-25T03:36:10.689000+05:30",
        "length": 19,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975740",
              "crash_point": 35.38,
              "time": "2025-03-25T03:37:21.631000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976516",
        "start_time": "2025-03-25T09:47:10.668000+05:30",
        "end_game_id": "7976534",
        "end_time": "2025-03-25T09:54:10.839000+05:30",
        "length": 19,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976535",
              "crash_point": 42.44,
              "time": "2025-03-25T09:55:24.676000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976792",
        "start_time": "2025-03-25T11:56:52.282000+05:30",
        "end_game_id": "7976810",
        "end_time": "2025-03-25T12:03:36.233000+05:30",
        "length": 19,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976811",
              "crash_point": 144.46,
              "time": "2025-03-25T12:05:10.496000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977588",
        "start_time": "2025-03-25T18:00:26.622000+05:30",
        "end_game_id": "7977606",
        "end_time": "2025-03-25T18:08:36.230000+05:30",
        "length": 19,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7977607",
              "crash_point": 146.66,
              "time": "2025-03-25T18:10:11.915000+05:30"
            },
            {
              "game_id": "7977608",
              "crash_point": 10.98,
              "time": "2025-03-25T18:11:03.601000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977911",
        "start_time": "2025-03-25T20:28:37.006000+05:30",
        "end_game_id": "7977929",
        "end_time": "2025-03-25T20:35:57.898000+05:30",
        "length": 19,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977930",
              "crash_point": 14.47,
              "time": "2025-03-25T20:36:54.941000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978763",
        "start_time": "2025-03-26T03:13:31.060000+05:30",
        "end_game_id": "7978781",
        "end_time": "2025-03-26T03:21:47.933000+05:30",
        "length": 19,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978782",
              "crash_point": 22.05,
              "time": "2025-03-26T03:22:51.204000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979526",
        "start_time": "2025-03-26T09:06:39.760000+05:30",
        "end_game_id": "7979544",
        "end_time": "2025-03-26T09:13:30.710000+05:30",
        "length": 19,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979545",
              "crash_point": 43.75,
              "time": "2025-03-26T09:14:45.201000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974600",
        "start_time": "2025-03-24T18:49:47.457000+05:30",
        "end_game_id": "7974617",
        "end_time": "2025-03-24T18:56:42.178000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974618",
              "crash_point": 30.99,
              "time": "2025-03-24T18:57:51.042000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974640",
        "start_time": "2025-03-24T19:08:02.775000+05:30",
        "end_game_id": "7974657",
        "end_time": "2025-03-24T19:15:05.894000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974658",
              "crash_point": 42.46,
              "time": "2025-03-24T19:16:20.965000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975238",
        "start_time": "2025-03-24T23:42:06.517000+05:30",
        "end_game_id": "7975255",
        "end_time": "2025-03-24T23:49:17.220000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975256",
              "crash_point": 173.59,
              "time": "2025-03-24T23:50:54.522000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975489",
        "start_time": "2025-03-25T01:35:18.027000+05:30",
        "end_game_id": "7975506",
        "end_time": "2025-03-25T01:42:00.074000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7975507",
              "crash_point": 10.77,
              "time": "2025-03-25T01:42:51.439000+05:30"
            },
            {
              "game_id": "7975508",
              "crash_point": 11.96,
              "time": "2025-03-25T01:43:44.423000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976624",
        "start_time": "2025-03-25T10:38:54.100000+05:30",
        "end_game_id": "7976641",
        "end_time": "2025-03-25T10:45:51.112000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976642",
              "crash_point": 24.28,
              "time": "2025-03-25T10:46:56.051000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976700",
        "start_time": "2025-03-25T11:14:16.111000+05:30",
        "end_game_id": "7976717",
        "end_time": "2025-03-25T11:19:58.754000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976718",
              "crash_point": 18.7,
              "time": "2025-03-25T11:20:59.680000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978795",
        "start_time": "2025-03-26T03:31:24.639000+05:30",
        "end_game_id": "7978812",
        "end_time": "2025-03-26T03:37:52.512000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978813",
              "crash_point": 57.89,
              "time": "2025-03-26T03:39:11.581000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978859",
        "start_time": "2025-03-26T03:57:55.039000+05:30",
        "end_game_id": "7978876",
        "end_time": "2025-03-26T04:03:55.211000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978877",
              "crash_point": 12.29,
              "time": "2025-03-26T04:04:49.082000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978981",
        "start_time": "2025-03-26T04:54:01.853000+05:30",
        "end_game_id": "7978998",
        "end_time": "2025-03-26T05:01:19.914000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978999",
              "crash_point": 50.19,
              "time": "2025-03-26T05:02:36.616000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979546",
        "start_time": "2025-03-26T09:15:01.447000+05:30",
        "end_game_id": "7979563",
        "end_time": "2025-03-26T09:20:32.171000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979564",
              "crash_point": 15.57,
              "time": "2025-03-26T09:21:29.968000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974719",
        "start_time": "2025-03-24T19:48:15.362000+05:30",
        "end_game_id": "7974735",
        "end_time": "2025-03-24T19:54:34.422000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974736",
              "crash_point": 17.05,
              "time": "2025-03-24T19:55:33.728000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975860",
        "start_time": "2025-03-25T04:33:09.542000+05:30",
        "end_game_id": "7975876",
        "end_time": "2025-03-25T04:40:16.672000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975877",
              "crash_point": 18.18,
              "time": "2025-03-25T04:41:16.426000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976063",
        "start_time": "2025-03-25T06:06:42.593000+05:30",
        "end_game_id": "7976079",
        "end_time": "2025-03-25T06:13:44.880000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976080",
              "crash_point": 18.18,
              "time": "2025-03-25T06:14:45.540000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976924",
        "start_time": "2025-03-25T12:54:39.303000+05:30",
        "end_game_id": "7976940",
        "end_time": "2025-03-25T13:01:03.927000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976941",
              "crash_point": 186.04,
              "time": "2025-03-25T13:02:43.396000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977116",
        "start_time": "2025-03-25T14:21:05.484000+05:30",
        "end_game_id": "7977132",
        "end_time": "2025-03-25T14:27:01.881000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977133",
              "crash_point": 96.44,
              "time": "2025-03-25T14:28:30.703000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977164",
        "start_time": "2025-03-25T14:42:20.591000+05:30",
        "end_game_id": "7977180",
        "end_time": "2025-03-25T14:48:41.568000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977181",
              "crash_point": 19.28,
              "time": "2025-03-25T14:49:42.493000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977277",
        "start_time": "2025-03-25T15:34:05.575000+05:30",
        "end_game_id": "7977293",
        "end_time": "2025-03-25T15:41:03.729000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977294",
              "crash_point": 25.42,
              "time": "2025-03-25T15:42:09.040000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977681",
        "start_time": "2025-03-25T18:45:43.521000+05:30",
        "end_game_id": "7977697",
        "end_time": "2025-03-25T18:50:41.820000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977698",
              "crash_point": 62.89,
              "time": "2025-03-25T18:52:02.391000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977951",
        "start_time": "2025-03-25T20:47:22.380000+05:30",
        "end_game_id": "7977967",
        "end_time": "2025-03-25T20:53:45.271000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977968",
              "crash_point": 21.82,
              "time": "2025-03-25T20:54:48.569000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978058",
        "start_time": "2025-03-25T21:33:32.103000+05:30",
        "end_game_id": "7978074",
        "end_time": "2025-03-25T21:40:41.669000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978075",
              "crash_point": 10.41,
              "time": "2025-03-25T21:41:33.613000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978121",
        "start_time": "2025-03-25T22:06:14.545000+05:30",
        "end_game_id": "7978137",
        "end_time": "2025-03-25T22:13:06.055000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978138",
              "crash_point": 64.43,
              "time": "2025-03-25T22:14:28.009000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978242",
        "start_time": "2025-03-25T23:06:23.206000+05:30",
        "end_game_id": "7978258",
        "end_time": "2025-03-25T23:12:11.550000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978259",
              "crash_point": 11.45,
              "time": "2025-03-25T23:13:05.057000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978344",
        "start_time": "2025-03-25T23:52:27.731000+05:30",
        "end_game_id": "7978360",
        "end_time": "2025-03-25T23:58:59.325000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978361",
              "crash_point": 23.65,
              "time": "2025-03-26T00:00:04.987000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978538",
        "start_time": "2025-03-26T01:27:18.884000+05:30",
        "end_game_id": "7978554",
        "end_time": "2025-03-26T01:33:15.177000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978555",
              "crash_point": 34.3,
              "time": "2025-03-26T01:34:26.191000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979309",
        "start_time": "2025-03-26T07:32:53.507000+05:30",
        "end_game_id": "7979325",
        "end_time": "2025-03-26T07:39:09.159000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7979326",
              "crash_point": 10.25,
              "time": "2025-03-26T07:39:59.909000+05:30"
            },
            {
              "game_id": "7979327",
              "crash_point": 41.17,
              "time": "2025-03-26T07:41:13.397000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979642",
        "start_time": "2025-03-26T10:00:12.918000+05:30",
        "end_game_id": "7979658",
        "end_time": "2025-03-26T10:06:59.321000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979659",
              "crash_point": 11.41,
              "time": "2025-03-26T10:07:52.148000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980014",
        "start_time": "2025-03-26T13:05:21.892000+05:30",
        "end_game_id": "7980030",
        "end_time": "2025-03-26T13:12:42.621000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980031",
              "crash_point": 609.9,
              "time": "2025-03-26T13:14:40.950000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980267",
        "start_time": "2025-03-26T15:13:40.393000+05:30",
        "end_game_id": "7980283",
        "end_time": "2025-03-26T15:21:21.885000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980284",
              "crash_point": 91.91,
              "time": "2025-03-26T15:22:49.796000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976683",
        "start_time": "2025-03-25T11:06:24.706000+05:30",
        "end_game_id": "7976698",
        "end_time": "2025-03-25T11:12:28.676000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976699",
              "crash_point": 21.14,
              "time": "2025-03-25T11:13:30.958000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977848",
        "start_time": "2025-03-25T19:59:11.102000+05:30",
        "end_game_id": "7977863",
        "end_time": "2025-03-25T20:05:27.495000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977864",
              "crash_point": 54.38,
              "time": "2025-03-25T20:06:45.628000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978594",
        "start_time": "2025-03-26T01:53:39.886000+05:30",
        "end_game_id": "7978609",
        "end_time": "2025-03-26T01:59:38.150000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978610",
              "crash_point": 70.06,
              "time": "2025-03-26T02:01:01.025000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978964",
        "start_time": "2025-03-26T04:46:35.358000+05:30",
        "end_game_id": "7978979",
        "end_time": "2025-03-26T04:52:50.521000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978980",
              "crash_point": 10.65,
              "time": "2025-03-26T04:53:41.527000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979594",
        "start_time": "2025-03-26T09:35:51.457000+05:30",
        "end_game_id": "7979609",
        "end_time": "2025-03-26T09:41:15.387000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979610",
              "crash_point": 119.03,
              "time": "2025-03-26T09:42:46.595000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979883",
        "start_time": "2025-03-26T11:57:35.206000+05:30",
        "end_game_id": "7979898",
        "end_time": "2025-03-26T12:04:24.275000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979899",
              "crash_point": 27.93,
              "time": "2025-03-26T12:05:31.312000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979904",
        "start_time": "2025-03-26T12:08:45.042000+05:30",
        "end_game_id": "7979919",
        "end_time": "2025-03-26T12:14:47.515000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979920",
              "crash_point": 27.41,
              "time": "2025-03-26T12:15:54.237000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975268",
        "start_time": "2025-03-24T23:57:26.729000+05:30",
        "end_game_id": "7975282",
        "end_time": "2025-03-25T00:02:58.960000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975283",
              "crash_point": 15.02,
              "time": "2025-03-25T00:03:55.608000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975957",
        "start_time": "2025-03-25T05:17:28.366000+05:30",
        "end_game_id": "7975971",
        "end_time": "2025-03-25T05:22:15.913000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975972",
              "crash_point": 21.64,
              "time": "2025-03-25T05:23:18.631000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976665",
        "start_time": "2025-03-25T10:58:56.419000+05:30",
        "end_game_id": "7976679",
        "end_time": "2025-03-25T11:03:59.694000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976680",
              "crash_point": 14.83,
              "time": "2025-03-25T11:04:57.231000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977182",
        "start_time": "2025-03-25T14:50:13.087000+05:30",
        "end_game_id": "7977196",
        "end_time": "2025-03-25T14:55:44.394000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977197",
              "crash_point": 11.56,
              "time": "2025-03-25T14:56:37.132000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977335",
        "start_time": "2025-03-25T16:01:24.684000+05:30",
        "end_game_id": "7977349",
        "end_time": "2025-03-25T16:07:40.974000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977350",
              "crash_point": 96.89,
              "time": "2025-03-25T16:09:09.782000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977796",
        "start_time": "2025-03-25T19:37:03.232000+05:30",
        "end_game_id": "7977810",
        "end_time": "2025-03-25T19:41:41.917000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977811",
              "crash_point": 22.21,
              "time": "2025-03-25T19:42:46.155000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978556",
        "start_time": "2025-03-26T01:35:02.005000+05:30",
        "end_game_id": "7978570",
        "end_time": "2025-03-26T01:40:43.281000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978571",
              "crash_point": 83.44,
              "time": "2025-03-26T01:42:08.714000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978838",
        "start_time": "2025-03-26T03:49:38.728000+05:30",
        "end_game_id": "7978852",
        "end_time": "2025-03-26T03:54:48.895000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978853",
              "crash_point": 13.01,
              "time": "2025-03-26T03:55:43.355000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979945",
        "start_time": "2025-03-26T12:30:26.035000+05:30",
        "end_game_id": "7979959",
        "end_time": "2025-03-26T12:35:37.800000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979960",
              "crash_point": 17.21,
              "time": "2025-03-26T12:36:38.428000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980316",
        "start_time": "2025-03-26T15:36:48.753000+05:30",
        "end_game_id": "7980330",
        "end_time": "2025-03-26T15:41:44.897000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980331",
              "crash_point": 13.64,
              "time": "2025-03-26T15:42:40.964000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974619",
        "start_time": "2025-03-24T18:58:11.707000+05:30",
        "end_game_id": "7974632",
        "end_time": "2025-03-24T19:03:40.536000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974633",
              "crash_point": 12.11,
              "time": "2025-03-24T19:04:33.550000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975665",
        "start_time": "2025-03-25T03:03:12.874000+05:30",
        "end_game_id": "7975678",
        "end_time": "2025-03-25T03:08:13.068000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975679",
              "crash_point": 13.21,
              "time": "2025-03-25T03:09:07.409000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975936",
        "start_time": "2025-03-25T05:08:07.853000+05:30",
        "end_game_id": "7975949",
        "end_time": "2025-03-25T05:13:01.847000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975950",
              "crash_point": 18.82,
              "time": "2025-03-25T05:14:02.861000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976180",
        "start_time": "2025-03-25T07:04:02.416000+05:30",
        "end_game_id": "7976193",
        "end_time": "2025-03-25T07:11:03.276000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976194",
              "crash_point": 13.46,
              "time": "2025-03-25T07:11:58.126000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976224",
        "start_time": "2025-03-25T07:27:05.022000+05:30",
        "end_game_id": "7976237",
        "end_time": "2025-03-25T07:32:03.506000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976238",
              "crash_point": 70.44,
              "time": "2025-03-25T07:33:26.033000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977149",
        "start_time": "2025-03-25T14:35:57.159000+05:30",
        "end_game_id": "7977162",
        "end_time": "2025-03-25T14:40:52.581000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977163",
              "crash_point": 14.27,
              "time": "2025-03-25T14:41:48.591000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977460",
        "start_time": "2025-03-25T16:59:43.985000+05:30",
        "end_game_id": "7977473",
        "end_time": "2025-03-25T17:04:52.121000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977474",
              "crash_point": 10.65,
              "time": "2025-03-25T17:05:43.843000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977627",
        "start_time": "2025-03-25T18:21:11.542000+05:30",
        "end_game_id": "7977640",
        "end_time": "2025-03-25T18:25:10.591000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977641",
              "crash_point": 13.34,
              "time": "2025-03-25T18:26:06.002000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979201",
        "start_time": "2025-03-26T06:41:29.702000+05:30",
        "end_game_id": "7979214",
        "end_time": "2025-03-26T06:46:19.664000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979215",
              "crash_point": 17.44,
              "time": "2025-03-26T06:47:19.823000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979794",
        "start_time": "2025-03-26T11:14:02.425000+05:30",
        "end_game_id": "7979807",
        "end_time": "2025-03-26T11:18:51.351000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979808",
              "crash_point": 19.4,
              "time": "2025-03-26T11:19:52.770000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979989",
        "start_time": "2025-03-26T12:52:51.529000+05:30",
        "end_game_id": "7980002",
        "end_time": "2025-03-26T12:58:53.177000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980003",
              "crash_point": 13.34,
              "time": "2025-03-26T12:59:47.824000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980081",
        "start_time": "2025-03-26T13:40:07.413000+05:30",
        "end_game_id": "7980094",
        "end_time": "2025-03-26T13:44:41.262000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980095",
              "crash_point": 544.06,
              "time": "2025-03-26T13:46:38.943000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980237",
        "start_time": "2025-03-26T14:59:54.099000+05:30",
        "end_game_id": "7980250",
        "end_time": "2025-03-26T15:05:09.633000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980251",
              "crash_point": 11.12,
              "time": "2025-03-26T15:06:02.757000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980252",
        "start_time": "2025-03-26T15:06:23.631000+05:30",
        "end_game_id": "7980265",
        "end_time": "2025-03-26T15:12:23.614000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980266",
              "crash_point": 21.58,
              "time": "2025-03-26T15:13:26.277000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980474",
        "start_time": "2025-03-26T16:51:26.986000+05:30",
        "end_game_id": "7980487",
        "end_time": "2025-03-26T16:56:12.218000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980488",
              "crash_point": 18.78,
              "time": "2025-03-26T16:57:12.678000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974444",
        "start_time": "2025-03-24T17:37:30.599000+05:30",
        "end_game_id": "7974456",
        "end_time": "2025-03-24T17:42:24.742000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974457",
              "crash_point": 13.15,
              "time": "2025-03-24T17:43:20.202000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975649",
        "start_time": "2025-03-25T02:54:21.314000+05:30",
        "end_game_id": "7975661",
        "end_time": "2025-03-25T02:59:57.852000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 3,
          "games": [
            {
              "game_id": "7975662",
              "crash_point": 10.0,
              "time": "2025-03-25T03:00:47.739000+05:30"
            },
            {
              "game_id": "7975663",
              "crash_point": 12.66,
              "time": "2025-03-25T03:01:41.711000+05:30"
            },
            {
              "game_id": "7975664",
              "crash_point": 23.41,
              "time": "2025-03-25T03:02:45.648000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975707",
        "start_time": "2025-03-25T03:23:01.924000+05:30",
        "end_game_id": "7975719",
        "end_time": "2025-03-25T03:27:52.536000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975720",
              "crash_point": 18.03,
              "time": "2025-03-25T03:28:53.028000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976008",
        "start_time": "2025-03-25T05:41:06.186000+05:30",
        "end_game_id": "7976020",
        "end_time": "2025-03-25T05:45:24.363000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7976021",
              "crash_point": 49.27,
              "time": "2025-03-25T05:46:40.671000+05:30"
            },
            {
              "game_id": "7976022",
              "crash_point": 21.39,
              "time": "2025-03-25T05:47:43.223000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977509",
        "start_time": "2025-03-25T17:22:03.181000+05:30",
        "end_game_id": "7977521",
        "end_time": "2025-03-25T17:27:06.912000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977522",
              "crash_point": 77.07,
              "time": "2025-03-25T17:28:32.082000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977574",
        "start_time": "2025-03-25T17:52:50.203000+05:30",
        "end_game_id": "7977586",
        "end_time": "2025-03-25T17:58:37.377000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977587",
              "crash_point": 84.54,
              "time": "2025-03-25T18:00:03.335000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978107",
        "start_time": "2025-03-25T21:59:46.591000+05:30",
        "end_game_id": "7978119",
        "end_time": "2025-03-25T22:04:03.032000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978120",
              "crash_point": 128.67,
              "time": "2025-03-25T22:05:36.359000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978471",
        "start_time": "2025-03-26T00:55:09.121000+05:30",
        "end_game_id": "7978483",
        "end_time": "2025-03-26T01:00:05.652000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978484",
              "crash_point": 29.15,
              "time": "2025-03-26T01:01:13.327000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978518",
        "start_time": "2025-03-26T01:17:43.360000+05:30",
        "end_game_id": "7978530",
        "end_time": "2025-03-26T01:22:30.690000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978531",
              "crash_point": 10.43,
              "time": "2025-03-26T01:23:22.117000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979113",
        "start_time": "2025-03-26T05:56:52.470000+05:30",
        "end_game_id": "7979125",
        "end_time": "2025-03-26T06:01:56.109000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979126",
              "crash_point": 16.08,
              "time": "2025-03-26T06:02:54.079000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979287",
        "start_time": "2025-03-26T07:21:53.198000+05:30",
        "end_game_id": "7979299",
        "end_time": "2025-03-26T07:27:01.579000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979300",
              "crash_point": 47.67,
              "time": "2025-03-26T07:28:17.772000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979611",
        "start_time": "2025-03-26T09:42:58.541000+05:30",
        "end_game_id": "7979623",
        "end_time": "2025-03-26T09:47:55.441000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979624",
              "crash_point": 139.97,
              "time": "2025-03-26T09:49:29.377000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979773",
        "start_time": "2025-03-26T11:04:10.701000+05:30",
        "end_game_id": "7979785",
        "end_time": "2025-03-26T11:08:58.875000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979786",
              "crash_point": 251.5,
              "time": "2025-03-26T11:10:43.013000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979855",
        "start_time": "2025-03-26T11:43:14.530000+05:30",
        "end_game_id": "7979867",
        "end_time": "2025-03-26T11:47:50.055000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979868",
              "crash_point": 26.02,
              "time": "2025-03-26T11:48:57.296000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974780",
        "start_time": "2025-03-24T20:15:11.903000+05:30",
        "end_game_id": "7974791",
        "end_time": "2025-03-24T20:20:08.841000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974792",
              "crash_point": 104.91,
              "time": "2025-03-24T20:21:38.529000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975549",
        "start_time": "2025-03-25T02:06:06.873000+05:30",
        "end_game_id": "7975560",
        "end_time": "2025-03-25T02:10:12.838000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975561",
              "crash_point": 12.15,
              "time": "2025-03-25T02:11:06.053000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975629",
        "start_time": "2025-03-25T02:41:41.014000+05:30",
        "end_game_id": "7975640",
        "end_time": "2025-03-25T02:46:27.404000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975641",
              "crash_point": 784.69,
              "time": "2025-03-25T02:48:29.818000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976145",
        "start_time": "2025-03-25T06:48:26.880000+05:30",
        "end_game_id": "7976156",
        "end_time": "2025-03-25T06:52:07.765000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976157",
              "crash_point": 10.23,
              "time": "2025-03-25T06:52:59.020000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976817",
        "start_time": "2025-03-25T12:08:08.874000+05:30",
        "end_game_id": "7976828",
        "end_time": "2025-03-25T12:12:28.042000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976829",
              "crash_point": 17.34,
              "time": "2025-03-25T12:13:28.111000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976964",
        "start_time": "2025-03-25T13:15:45.175000+05:30",
        "end_game_id": "7976975",
        "end_time": "2025-03-25T13:20:03.179000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7976976",
              "crash_point": 31.55,
              "time": "2025-03-25T13:21:12.127000+05:30"
            },
            {
              "game_id": "7976977",
              "crash_point": 19.11,
              "time": "2025-03-25T13:22:12.873000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977439",
        "start_time": "2025-03-25T16:50:04.630000+05:30",
        "end_game_id": "7977450",
        "end_time": "2025-03-25T16:54:09.227000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977451",
              "crash_point": 16.82,
              "time": "2025-03-25T16:55:07.767000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977873",
        "start_time": "2025-03-25T20:10:07.256000+05:30",
        "end_game_id": "7977884",
        "end_time": "2025-03-25T20:14:47.897000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977885",
              "crash_point": 46.94,
              "time": "2025-03-25T20:16:03.662000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977938",
        "start_time": "2025-03-25T20:41:44.308000+05:30",
        "end_game_id": "7977949",
        "end_time": "2025-03-25T20:45:40.041000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977950",
              "crash_point": 81.28,
              "time": "2025-03-25T20:47:05.597000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978036",
        "start_time": "2025-03-25T21:24:12.079000+05:30",
        "end_game_id": "7978047",
        "end_time": "2025-03-25T21:28:17.038000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978048",
              "crash_point": 33.15,
              "time": "2025-03-25T21:29:27.705000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978458",
        "start_time": "2025-03-26T00:49:48.678000+05:30",
        "end_game_id": "7978469",
        "end_time": "2025-03-26T00:54:02.170000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978470",
              "crash_point": 13.16,
              "time": "2025-03-26T00:54:56.650000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978485",
        "start_time": "2025-03-26T01:01:25.137000+05:30",
        "end_game_id": "7978496",
        "end_time": "2025-03-26T01:06:01.858000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978497",
              "crash_point": 16.77,
              "time": "2025-03-26T01:07:00.723000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979006",
        "start_time": "2025-03-26T05:05:35.440000+05:30",
        "end_game_id": "7979017",
        "end_time": "2025-03-26T05:10:42.588000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979018",
              "crash_point": 110.66,
              "time": "2025-03-26T05:12:12.692000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979387",
        "start_time": "2025-03-26T08:04:19.674000+05:30",
        "end_game_id": "7979398",
        "end_time": "2025-03-26T08:09:50.482000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979399",
              "crash_point": 45.66,
              "time": "2025-03-26T08:11:05.843000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979760",
        "start_time": "2025-03-26T10:57:19.558000+05:30",
        "end_game_id": "7979771",
        "end_time": "2025-03-26T11:02:39.400000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979772",
              "crash_point": 48.24,
              "time": "2025-03-26T11:03:55.527000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974415",
        "start_time": "2025-03-24T17:23:52.688000+05:30",
        "end_game_id": "7974425",
        "end_time": "2025-03-24T17:27:36.087000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974426",
              "crash_point": 15.95,
              "time": "2025-03-24T17:28:33.898000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974978",
        "start_time": "2025-03-24T21:44:48.615000+05:30",
        "end_game_id": "7974988",
        "end_time": "2025-03-24T21:48:53.574000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974989",
              "crash_point": 15.68,
              "time": "2025-03-24T21:49:51.525000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975822",
        "start_time": "2025-03-25T04:17:22.436000+05:30",
        "end_game_id": "7975832",
        "end_time": "2025-03-25T04:20:52.083000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975833",
              "crash_point": 15.77,
              "time": "2025-03-25T04:21:49.565000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975975",
        "start_time": "2025-03-25T05:25:19.594000+05:30",
        "end_game_id": "7975985",
        "end_time": "2025-03-25T05:28:30.269000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975986",
              "crash_point": 237.43,
              "time": "2025-03-25T05:30:13.164000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976083",
        "start_time": "2025-03-25T06:17:00.773000+05:30",
        "end_game_id": "7976093",
        "end_time": "2025-03-25T06:20:20.032000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976094",
              "crash_point": 16.08,
              "time": "2025-03-25T06:21:18.263000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977210",
        "start_time": "2025-03-25T15:02:30.743000+05:30",
        "end_game_id": "7977220",
        "end_time": "2025-03-25T15:06:35.139000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977221",
              "crash_point": 53.86,
              "time": "2025-03-25T15:07:53.041000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977482",
        "start_time": "2025-03-25T17:09:04.179000+05:30",
        "end_game_id": "7977492",
        "end_time": "2025-03-25T17:12:46.839000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977493",
              "crash_point": 13.57,
              "time": "2025-03-25T17:13:42.057000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977729",
        "start_time": "2025-03-25T19:05:55.527000+05:30",
        "end_game_id": "7977739",
        "end_time": "2025-03-25T19:10:02.092000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977740",
              "crash_point": 14.91,
              "time": "2025-03-25T19:10:58.627000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977779",
        "start_time": "2025-03-25T19:28:54.125000+05:30",
        "end_game_id": "7977789",
        "end_time": "2025-03-25T19:32:35.434000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977790",
              "crash_point": 11.39,
              "time": "2025-03-25T19:33:28.190000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978203",
        "start_time": "2025-03-25T22:45:40.033000+05:30",
        "end_game_id": "7978213",
        "end_time": "2025-03-25T22:50:08.576000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7978214",
              "crash_point": 16.53,
              "time": "2025-03-25T22:51:07.985000+05:30"
            },
            {
              "game_id": "7978215",
              "crash_point": 12.88,
              "time": "2025-03-25T22:52:02.293000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978402",
        "start_time": "2025-03-26T00:23:32.358000+05:30",
        "end_game_id": "7978412",
        "end_time": "2025-03-26T00:27:10.144000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978413",
              "crash_point": 14.79,
              "time": "2025-03-26T00:28:06.862000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978446",
        "start_time": "2025-03-26T00:44:08.647000+05:30",
        "end_game_id": "7978456",
        "end_time": "2025-03-26T00:48:28.670000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978457",
              "crash_point": 12.16,
              "time": "2025-03-26T00:49:22.175000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978903",
        "start_time": "2025-03-26T04:18:09.875000+05:30",
        "end_game_id": "7978913",
        "end_time": "2025-03-26T04:22:17.345000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978914",
              "crash_point": 60.79,
              "time": "2025-03-26T04:23:37.281000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978915",
        "start_time": "2025-03-26T04:24:11.285000+05:30",
        "end_game_id": "7978925",
        "end_time": "2025-03-26T04:27:14.512000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978926",
              "crash_point": 57.97,
              "time": "2025-03-26T04:28:34.491000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979328",
        "start_time": "2025-03-26T07:41:57.851000+05:30",
        "end_game_id": "7979338",
        "end_time": "2025-03-26T07:45:24.663000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979339",
              "crash_point": 10.37,
              "time": "2025-03-26T07:46:15.437000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979741",
        "start_time": "2025-03-26T10:46:43.772000+05:30",
        "end_game_id": "7979751",
        "end_time": "2025-03-26T10:50:10.532000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979752",
              "crash_point": 34.84,
              "time": "2025-03-26T10:51:21.954000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980183",
        "start_time": "2025-03-26T14:34:25.194000+05:30",
        "end_game_id": "7980193",
        "end_time": "2025-03-26T14:38:58.049000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980194",
              "crash_point": 16.79,
              "time": "2025-03-26T14:39:57.825000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980388",
        "start_time": "2025-03-26T16:10:59.090000+05:30",
        "end_game_id": "7980398",
        "end_time": "2025-03-26T16:14:32.505000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980399",
              "crash_point": 14.8,
              "time": "2025-03-26T16:15:29.255000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980442",
        "start_time": "2025-03-26T16:34:25.660000+05:30",
        "end_game_id": "7980452",
        "end_time": "2025-03-26T16:38:43.304000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980453",
              "crash_point": 18.01,
              "time": "2025-03-26T16:39:43.834000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980501",
        "start_time": "2025-03-26T17:04:10.122000+05:30",
        "end_game_id": "7980511",
        "end_time": "2025-03-26T17:08:26.675000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980512",
              "crash_point": 94.85,
              "time": "2025-03-26T17:09:53.989000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974494",
        "start_time": "2025-03-24T18:02:22.429000+05:30",
        "end_game_id": "7974503",
        "end_time": "2025-03-24T18:05:54.185000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974504",
              "crash_point": 14.05,
              "time": "2025-03-24T18:06:51.036000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974551",
        "start_time": "2025-03-24T18:28:28.770000+05:30",
        "end_game_id": "7974560",
        "end_time": "2025-03-24T18:32:21.374000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974561",
              "crash_point": 11.46,
              "time": "2025-03-24T18:33:14.344000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974684",
        "start_time": "2025-03-24T19:28:57.700000+05:30",
        "end_game_id": "7974693",
        "end_time": "2025-03-24T19:33:03.617000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974694",
              "crash_point": 154.22,
              "time": "2025-03-24T19:34:40.404000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974695",
        "start_time": "2025-03-24T19:35:06.427000+05:30",
        "end_game_id": "7974704",
        "end_time": "2025-03-24T19:38:38.388000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974705",
              "crash_point": 117.45,
              "time": "2025-03-24T19:40:09.440000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975158",
        "start_time": "2025-03-24T23:02:17.143000+05:30",
        "end_game_id": "7975167",
        "end_time": "2025-03-24T23:06:13.362000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975168",
              "crash_point": 14.08,
              "time": "2025-03-24T23:07:09.765000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975767",
        "start_time": "2025-03-25T03:50:06.875000+05:30",
        "end_game_id": "7975776",
        "end_time": "2025-03-25T03:54:16.980000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975777",
              "crash_point": 21.92,
              "time": "2025-03-25T03:55:20.080000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975811",
        "start_time": "2025-03-25T04:12:10.202000+05:30",
        "end_game_id": "7975820",
        "end_time": "2025-03-25T04:15:51.944000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975821",
              "crash_point": 28.55,
              "time": "2025-03-25T04:16:59.247000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976101",
        "start_time": "2025-03-25T06:24:27.596000+05:30",
        "end_game_id": "7976110",
        "end_time": "2025-03-25T06:28:19.935000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976111",
              "crash_point": 12.22,
              "time": "2025-03-25T06:29:12.972000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977250",
        "start_time": "2025-03-25T15:19:53.590000+05:30",
        "end_game_id": "7977259",
        "end_time": "2025-03-25T15:23:43.981000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977260",
              "crash_point": 10.52,
              "time": "2025-03-25T15:24:35.451000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977367",
        "start_time": "2025-03-25T16:18:13.988000+05:30",
        "end_game_id": "7977376",
        "end_time": "2025-03-25T16:22:13.817000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977377",
              "crash_point": 35.2,
              "time": "2025-03-25T16:23:25.144000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978189",
        "start_time": "2025-03-25T22:38:50.220000+05:30",
        "end_game_id": "7978198",
        "end_time": "2025-03-25T22:42:37.870000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978199",
              "crash_point": 10.53,
              "time": "2025-03-25T22:43:29.535000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978231",
        "start_time": "2025-03-25T23:00:20.704000+05:30",
        "end_game_id": "7978240",
        "end_time": "2025-03-25T23:05:03.365000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978241",
              "crash_point": 27.56,
              "time": "2025-03-25T23:06:11.317000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978422",
        "start_time": "2025-03-26T00:33:27.072000+05:30",
        "end_game_id": "7978431",
        "end_time": "2025-03-26T00:36:56.797000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978432",
              "crash_point": 12.35,
              "time": "2025-03-26T00:37:50.434000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978435",
        "start_time": "2025-03-26T00:39:28.822000+05:30",
        "end_game_id": "7978444",
        "end_time": "2025-03-26T00:42:50.860000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978445",
              "crash_point": 14.33,
              "time": "2025-03-26T00:43:46.742000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979019",
        "start_time": "2025-03-26T05:12:33.082000+05:30",
        "end_game_id": "7979028",
        "end_time": "2025-03-26T05:16:52.040000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7979029",
              "crash_point": 1126.4,
              "time": "2025-03-26T05:19:00.683000+05:30"
            },
            {
              "game_id": "7979030",
              "crash_point": 58.84,
              "time": "2025-03-26T05:20:20.127000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979427",
        "start_time": "2025-03-26T08:23:34.141000+05:30",
        "end_game_id": "7979436",
        "end_time": "2025-03-26T08:27:31.140000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979437",
              "crash_point": 79.23,
              "time": "2025-03-26T08:28:55.736000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979490",
        "start_time": "2025-03-26T08:51:15.264000+05:30",
        "end_game_id": "7979499",
        "end_time": "2025-03-26T08:54:52.617000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979500",
              "crash_point": 17.51,
              "time": "2025-03-26T08:55:51.760000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979934",
        "start_time": "2025-03-26T12:25:49.779000+05:30",
        "end_game_id": "7979943",
        "end_time": "2025-03-26T12:28:54.544000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979944",
              "crash_point": 12.63,
              "time": "2025-03-26T12:29:49.322000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980070",
        "start_time": "2025-03-26T13:34:27.200000+05:30",
        "end_game_id": "7980079",
        "end_time": "2025-03-26T13:38:21.835000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980080",
              "crash_point": 23.57,
              "time": "2025-03-26T13:39:26.652000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974590",
        "start_time": "2025-03-24T18:45:08.856000+05:30",
        "end_game_id": "7974598",
        "end_time": "2025-03-24T18:48:28.427000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974599",
              "crash_point": 17.14,
              "time": "2025-03-24T18:49:28.209000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975057",
        "start_time": "2025-03-24T22:17:22.148000+05:30",
        "end_game_id": "7975065",
        "end_time": "2025-03-24T22:20:57.711000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975066",
              "crash_point": 11.85,
              "time": "2025-03-24T22:21:50.998000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975119",
        "start_time": "2025-03-24T22:45:59.799000+05:30",
        "end_game_id": "7975127",
        "end_time": "2025-03-24T22:48:55.073000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975128",
              "crash_point": 19.91,
              "time": "2025-03-24T22:49:57.092000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975479",
        "start_time": "2025-03-25T01:30:09.105000+05:30",
        "end_game_id": "7975487",
        "end_time": "2025-03-25T01:34:04.392000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975488",
              "crash_point": 14.63,
              "time": "2025-03-25T01:35:00.668000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975878",
        "start_time": "2025-03-25T04:42:00.849000+05:30",
        "end_game_id": "7975886",
        "end_time": "2025-03-25T04:44:42.164000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975887",
              "crash_point": 15.58,
              "time": "2025-03-25T04:45:39.578000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976195",
        "start_time": "2025-03-25T07:12:09.915000+05:30",
        "end_game_id": "7976203",
        "end_time": "2025-03-25T07:15:34.403000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976204",
              "crash_point": 10.01,
              "time": "2025-03-25T07:16:24.412000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976306",
        "start_time": "2025-03-25T08:02:34.833000+05:30",
        "end_game_id": "7976314",
        "end_time": "2025-03-25T08:06:56.012000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976315",
              "crash_point": 11.41,
              "time": "2025-03-25T08:07:48.233000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976726",
        "start_time": "2025-03-25T11:25:24.486000+05:30",
        "end_game_id": "7976734",
        "end_time": "2025-03-25T11:28:40.376000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976735",
              "crash_point": 11.99,
              "time": "2025-03-25T11:29:34.369000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976742",
        "start_time": "2025-03-25T11:32:50.300000+05:30",
        "end_game_id": "7976750",
        "end_time": "2025-03-25T11:36:01.277000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976751",
              "crash_point": 16.05,
              "time": "2025-03-25T11:36:59.326000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976778",
        "start_time": "2025-03-25T11:49:01.082000+05:30",
        "end_game_id": "7976786",
        "end_time": "2025-03-25T11:51:52.741000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976787",
              "crash_point": 669.61,
              "time": "2025-03-25T11:53:52.781000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976953",
        "start_time": "2025-03-25T13:10:29.327000+05:30",
        "end_game_id": "7976961",
        "end_time": "2025-03-25T13:13:11.610000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7976962",
              "crash_point": 10.99,
              "time": "2025-03-25T13:14:04.212000+05:30"
            },
            {
              "game_id": "7976963",
              "crash_point": 13.44,
              "time": "2025-03-25T13:14:58.986000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977267",
        "start_time": "2025-03-25T15:29:18.097000+05:30",
        "end_game_id": "7977275",
        "end_time": "2025-03-25T15:32:55.702000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977276",
              "crash_point": 12.03,
              "time": "2025-03-25T15:33:49.683000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977699",
        "start_time": "2025-03-25T18:52:14.162000+05:30",
        "end_game_id": "7977707",
        "end_time": "2025-03-25T18:55:18.647000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977708",
              "crash_point": 35.01,
              "time": "2025-03-25T18:56:30.217000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977709",
        "start_time": "2025-03-25T18:56:42.089000+05:30",
        "end_game_id": "7977717",
        "end_time": "2025-03-25T18:59:57.606000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977718",
              "crash_point": 17.72,
              "time": "2025-03-25T19:00:57.142000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977719",
        "start_time": "2025-03-25T19:01:10.150000+05:30",
        "end_game_id": "7977727",
        "end_time": "2025-03-25T19:04:34.739000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977728",
              "crash_point": 23.52,
              "time": "2025-03-25T19:05:39.308000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978014",
        "start_time": "2025-03-25T21:15:34.610000+05:30",
        "end_game_id": "7978022",
        "end_time": "2025-03-25T21:17:54.753000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978023",
              "crash_point": 10.39,
              "time": "2025-03-25T21:18:47.238000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978289",
        "start_time": "2025-03-25T23:25:25.811000+05:30",
        "end_game_id": "7978297",
        "end_time": "2025-03-25T23:28:08.688000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978298",
              "crash_point": 75.25,
              "time": "2025-03-25T23:29:33.448000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978373",
        "start_time": "2025-03-26T00:07:03.333000+05:30",
        "end_game_id": "7978381",
        "end_time": "2025-03-26T00:11:03.518000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978382",
              "crash_point": 13.33,
              "time": "2025-03-26T00:11:58.296000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978952",
        "start_time": "2025-03-26T04:40:57.930000+05:30",
        "end_game_id": "7978960",
        "end_time": "2025-03-26T04:44:07.234000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978961",
              "crash_point": 10.27,
              "time": "2025-03-26T04:44:58.179000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979162",
        "start_time": "2025-03-26T06:17:08.317000+05:30",
        "end_game_id": "7979170",
        "end_time": "2025-03-26T06:20:49.453000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979171",
              "crash_point": 181.22,
              "time": "2025-03-26T06:22:27.577000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979277",
        "start_time": "2025-03-26T07:16:50.137000+05:30",
        "end_game_id": "7979285",
        "end_time": "2025-03-26T07:20:33.609000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979286",
              "crash_point": 11.0,
              "time": "2025-03-26T07:21:25.286000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979479",
        "start_time": "2025-03-26T08:45:54.979000+05:30",
        "end_game_id": "7979487",
        "end_time": "2025-03-26T08:48:44.297000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7979488",
              "crash_point": 45.74,
              "time": "2025-03-26T08:49:59.667000+05:30"
            },
            {
              "game_id": "7979489",
              "crash_point": 14.52,
              "time": "2025-03-26T08:50:55.852000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979625",
        "start_time": "2025-03-26T09:49:54.610000+05:30",
        "end_game_id": "7979633",
        "end_time": "2025-03-26T09:53:34.100000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7979634",
              "crash_point": 10.81,
              "time": "2025-03-26T09:54:25.774000+05:30"
            },
            {
              "game_id": "7979635",
              "crash_point": 46.9,
              "time": "2025-03-26T09:55:41.648000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979664",
        "start_time": "2025-03-26T10:10:45.062000+05:30",
        "end_game_id": "7979672",
        "end_time": "2025-03-26T10:13:49.579000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979673",
              "crash_point": 63.93,
              "time": "2025-03-26T10:15:10.409000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980004",
        "start_time": "2025-03-26T13:00:25.558000+05:30",
        "end_game_id": "7980012",
        "end_time": "2025-03-26T13:04:03.140000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980013",
              "crash_point": 12.94,
              "time": "2025-03-26T13:04:57.540000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980124",
        "start_time": "2025-03-26T14:00:44.264000+05:30",
        "end_game_id": "7980132",
        "end_time": "2025-03-26T14:03:50.598000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980133",
              "crash_point": 337.65,
              "time": "2025-03-26T14:05:39.335000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980140",
        "start_time": "2025-03-26T14:09:13.098000+05:30",
        "end_game_id": "7980148",
        "end_time": "2025-03-26T14:12:43.132000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980149",
              "crash_point": 22.66,
              "time": "2025-03-26T14:13:47.684000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980523",
        "start_time": "2025-03-26T17:16:25.633000+05:30",
        "end_game_id": "7980531",
        "end_time": "2025-03-26T17:19:11.446000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980532",
              "crash_point": 15.47,
              "time": "2025-03-26T17:20:08.438000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980533",
        "start_time": "2025-03-26T17:20:40.969000+05:30",
        "end_game_id": "7980541",
        "end_time": "2025-03-26T17:23:39.995000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "7975182",
        "start_time": "2025-03-24T23:14:47.401000+05:30",
        "end_game_id": "7975189",
        "end_time": "2025-03-24T23:18:11.746000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975190",
              "crash_point": 112.91,
              "time": "2025-03-24T23:19:42.063000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975524",
        "start_time": "2025-03-25T01:52:42.366000+05:30",
        "end_game_id": "7975531",
        "end_time": "2025-03-25T01:55:35.164000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975532",
              "crash_point": 38.79,
              "time": "2025-03-25T01:56:47.629000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975888",
        "start_time": "2025-03-25T04:46:05.747000+05:30",
        "end_game_id": "7975895",
        "end_time": "2025-03-25T04:48:29.116000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975896",
              "crash_point": 70.77,
              "time": "2025-03-25T04:49:51.769000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975992",
        "start_time": "2025-03-25T05:33:07.564000+05:30",
        "end_game_id": "7975999",
        "end_time": "2025-03-25T05:35:51.543000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976000",
              "crash_point": 65.23,
              "time": "2025-03-25T05:37:13.141000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976171",
        "start_time": "2025-03-25T07:00:25.855000+05:30",
        "end_game_id": "7976178",
        "end_time": "2025-03-25T07:02:44.963000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976179",
              "crash_point": 13.12,
              "time": "2025-03-25T07:03:39.916000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976318",
        "start_time": "2025-03-25T08:09:53.813000+05:30",
        "end_game_id": "7976325",
        "end_time": "2025-03-25T08:12:42.231000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7976326",
              "crash_point": 76.93,
              "time": "2025-03-25T08:14:06.709000+05:30"
            },
            {
              "game_id": "7976327",
              "crash_point": 18.65,
              "time": "2025-03-25T08:15:06.890000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976612",
        "start_time": "2025-03-25T10:32:42.234000+05:30",
        "end_game_id": "7976619",
        "end_time": "2025-03-25T10:35:26.510000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976620",
              "crash_point": 24.63,
              "time": "2025-03-25T10:36:32.502000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977032",
        "start_time": "2025-03-25T13:45:19.314000+05:30",
        "end_game_id": "7977039",
        "end_time": "2025-03-25T13:48:46.581000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977040",
              "crash_point": 13.99,
              "time": "2025-03-25T13:49:42.774000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977969",
        "start_time": "2025-03-25T20:55:02.121000+05:30",
        "end_game_id": "7977976",
        "end_time": "2025-03-25T20:57:28.026000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977977",
              "crash_point": 12.48,
              "time": "2025-03-25T20:58:22.711000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978027",
        "start_time": "2025-03-25T21:20:25.124000+05:30",
        "end_game_id": "7978034",
        "end_time": "2025-03-25T21:22:42.347000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978035",
              "crash_point": 12.62,
              "time": "2025-03-25T21:23:37.243000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978049",
        "start_time": "2025-03-25T21:29:58.689000+05:30",
        "end_game_id": "7978056",
        "end_time": "2025-03-25T21:32:07.299000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978057",
              "crash_point": 25.91,
              "time": "2025-03-25T21:33:13.830000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978096",
        "start_time": "2025-03-25T21:52:55.278000+05:30",
        "end_game_id": "7978103",
        "end_time": "2025-03-25T21:56:02.242000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978104",
              "crash_point": 52.58,
              "time": "2025-03-25T21:57:19.910000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978178",
        "start_time": "2025-03-25T22:31:24.550000+05:30",
        "end_game_id": "7978185",
        "end_time": "2025-03-25T22:34:43.269000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978186",
              "crash_point": 34.96,
              "time": "2025-03-25T22:35:54.847000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978881",
        "start_time": "2025-03-26T04:06:43.383000+05:30",
        "end_game_id": "7978888",
        "end_time": "2025-03-26T04:09:21.701000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978889",
              "crash_point": 41.59,
              "time": "2025-03-26T04:10:35.782000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979174",
        "start_time": "2025-03-26T06:23:52.581000+05:30",
        "end_game_id": "7979181",
        "end_time": "2025-03-26T06:27:23.801000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 3,
          "games": [
            {
              "game_id": "7979182",
              "crash_point": 11.55,
              "time": "2025-03-26T06:28:16.192000+05:30"
            },
            {
              "game_id": "7979183",
              "crash_point": 152.83,
              "time": "2025-03-26T06:29:51.721000+05:30"
            },
            {
              "game_id": "7979184",
              "crash_point": 21.8,
              "time": "2025-03-26T06:30:54.953000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979565",
        "start_time": "2025-03-26T09:21:44.349000+05:30",
        "end_game_id": "7979572",
        "end_time": "2025-03-26T09:24:21.357000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979573",
              "crash_point": 13.22,
              "time": "2025-03-26T09:25:15.864000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979961",
        "start_time": "2025-03-26T12:36:53.629000+05:30",
        "end_game_id": "7979968",
        "end_time": "2025-03-26T12:40:07.885000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979969",
              "crash_point": 18.7,
              "time": "2025-03-26T12:41:08.234000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980168",
        "start_time": "2025-03-26T14:26:01.163000+05:30",
        "end_game_id": "7980175",
        "end_time": "2025-03-26T14:28:42.708000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980176",
              "crash_point": 34.28,
              "time": "2025-03-26T14:29:54.349000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980195",
        "start_time": "2025-03-26T14:40:22.243000+05:30",
        "end_game_id": "7980202",
        "end_time": "2025-03-26T14:43:25.727000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980203",
              "crash_point": 13.07,
              "time": "2025-03-26T14:44:20.874000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980337",
        "start_time": "2025-03-26T15:46:21.787000+05:30",
        "end_game_id": "7980344",
        "end_time": "2025-03-26T15:49:31.890000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980345",
              "crash_point": 34.0,
              "time": "2025-03-26T15:50:42.373000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980492",
        "start_time": "2025-03-26T16:59:31.866000+05:30",
        "end_game_id": "7980499",
        "end_time": "2025-03-26T17:02:07.550000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980500",
              "crash_point": 44.13,
              "time": "2025-03-26T17:03:23.486000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974434",
        "start_time": "2025-03-24T17:32:19.394000+05:30",
        "end_game_id": "7974440",
        "end_time": "2025-03-24T17:34:32.702000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974441",
              "crash_point": 11.2,
              "time": "2025-03-24T17:35:24.461000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974486",
        "start_time": "2025-03-24T17:57:44.319000+05:30",
        "end_game_id": "7974492",
        "end_time": "2025-03-24T18:00:57.106000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974493",
              "crash_point": 22.38,
              "time": "2025-03-24T18:02:00.422000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974659",
        "start_time": "2025-03-24T19:16:47.007000+05:30",
        "end_game_id": "7974665",
        "end_time": "2025-03-24T19:18:53.706000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974666",
              "crash_point": 42.23,
              "time": "2025-03-24T19:20:08.663000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974845",
        "start_time": "2025-03-24T20:42:03.937000+05:30",
        "end_game_id": "7974851",
        "end_time": "2025-03-24T20:44:23.811000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974852",
              "crash_point": 15.99,
              "time": "2025-03-24T20:45:22.572000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974897",
        "start_time": "2025-03-24T21:09:19+05:30",
        "end_game_id": "7974903",
        "end_time": "2025-03-24T21:12:16.185000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974904",
              "crash_point": 22.4,
              "time": "2025-03-24T21:13:19.742000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975259",
        "start_time": "2025-03-24T23:52:36.798000+05:30",
        "end_game_id": "7975265",
        "end_time": "2025-03-24T23:55:06.360000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7975266",
              "crash_point": 49.07,
              "time": "2025-03-24T23:56:22.764000+05:30"
            },
            {
              "game_id": "7975267",
              "crash_point": 10.6,
              "time": "2025-03-24T23:57:13.764000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975330",
        "start_time": "2025-03-25T00:25:51.761000+05:30",
        "end_game_id": "7975336",
        "end_time": "2025-03-25T00:29:01.977000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975337",
              "crash_point": 10.96,
              "time": "2025-03-25T00:29:53.232000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975750",
        "start_time": "2025-03-25T03:42:42.064000+05:30",
        "end_game_id": "7975756",
        "end_time": "2025-03-25T03:44:38.422000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975757",
              "crash_point": 10.58,
              "time": "2025-03-25T03:45:29.678000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976123",
        "start_time": "2025-03-25T06:35:29.915000+05:30",
        "end_game_id": "7976129",
        "end_time": "2025-03-25T06:38:25.671000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976130",
              "crash_point": 32.99,
              "time": "2025-03-25T06:39:35.512000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976210",
        "start_time": "2025-03-25T07:20:20.997000+05:30",
        "end_game_id": "7976216",
        "end_time": "2025-03-25T07:22:47.704000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976217",
              "crash_point": 26.56,
              "time": "2025-03-25T07:23:54.037000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976394",
        "start_time": "2025-03-25T08:46:01.150000+05:30",
        "end_game_id": "7976400",
        "end_time": "2025-03-25T08:48:43.695000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976401",
              "crash_point": 11.66,
              "time": "2025-03-25T08:49:36.393000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976437",
        "start_time": "2025-03-25T09:08:46.316000+05:30",
        "end_game_id": "7976443",
        "end_time": "2025-03-25T09:11:16.996000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976444",
              "crash_point": 641.33,
              "time": "2025-03-25T09:13:16.296000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977134",
        "start_time": "2025-03-25T14:28:46.479000+05:30",
        "end_game_id": "7977140",
        "end_time": "2025-03-25T14:30:52.068000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977141",
              "crash_point": 17.4,
              "time": "2025-03-25T14:31:52.286000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977198",
        "start_time": "2025-03-25T14:56:57.414000+05:30",
        "end_game_id": "7977204",
        "end_time": "2025-03-25T14:59:18.371000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977205",
              "crash_point": 11.75,
              "time": "2025-03-25T15:00:11.615000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977351",
        "start_time": "2025-03-25T16:09:27.721000+05:30",
        "end_game_id": "7977357",
        "end_time": "2025-03-25T16:11:49.225000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977358",
              "crash_point": 12.14,
              "time": "2025-03-25T16:12:43.090000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977359",
        "start_time": "2025-03-25T16:13:04.054000+05:30",
        "end_game_id": "7977365",
        "end_time": "2025-03-25T16:15:32.740000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977366",
              "crash_point": 1951.75,
              "time": "2025-03-25T16:17:50.884000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977452",
        "start_time": "2025-03-25T16:55:43.486000+05:30",
        "end_game_id": "7977458",
        "end_time": "2025-03-25T16:58:05.500000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977459",
              "crash_point": 74.93,
              "time": "2025-03-25T16:59:28.915000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977615",
        "start_time": "2025-03-25T18:14:11.888000+05:30",
        "end_game_id": "7977621",
        "end_time": "2025-03-25T18:16:26.271000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977622",
              "crash_point": 115.27,
              "time": "2025-03-25T18:17:56.927000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977814",
        "start_time": "2025-03-25T19:44:14.845000+05:30",
        "end_game_id": "7977820",
        "end_time": "2025-03-25T19:46:08.263000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977821",
              "crash_point": 36.98,
              "time": "2025-03-25T19:47:20.147000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977865",
        "start_time": "2025-03-25T20:06:57.410000+05:30",
        "end_game_id": "7977871",
        "end_time": "2025-03-25T20:08:54.758000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977872",
              "crash_point": 13.73,
              "time": "2025-03-25T20:09:50.923000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978216",
        "start_time": "2025-03-25T22:52:20.683000+05:30",
        "end_game_id": "7978222",
        "end_time": "2025-03-25T22:54:58.397000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978223",
              "crash_point": 173.03,
              "time": "2025-03-25T22:56:35.890000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978336",
        "start_time": "2025-03-25T23:47:59.808000+05:30",
        "end_game_id": "7978342",
        "end_time": "2025-03-25T23:50:45.743000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978343",
              "crash_point": 21.17,
              "time": "2025-03-25T23:51:48.256000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978414",
        "start_time": "2025-03-26T00:28:23.130000+05:30",
        "end_game_id": "7978420",
        "end_time": "2025-03-26T00:31:36.642000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978421",
              "crash_point": 26.54,
              "time": "2025-03-26T00:32:42.898000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978503",
        "start_time": "2025-03-26T01:09:58.822000+05:30",
        "end_game_id": "7978509",
        "end_time": "2025-03-26T01:12:09.847000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978510",
              "crash_point": 20.94,
              "time": "2025-03-26T01:13:12.189000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978755",
        "start_time": "2025-03-26T03:09:28.094000+05:30",
        "end_game_id": "7978761",
        "end_time": "2025-03-26T03:12:05.881000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978762",
              "crash_point": 40.55,
              "time": "2025-03-26T03:13:19.115000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979574",
        "start_time": "2025-03-26T09:25:47.760000+05:30",
        "end_game_id": "7979580",
        "end_time": "2025-03-26T09:28:07.033000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979581",
              "crash_point": 18.58,
              "time": "2025-03-26T09:29:07.881000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979692",
        "start_time": "2025-03-26T10:25:50.605000+05:30",
        "end_game_id": "7979698",
        "end_time": "2025-03-26T10:28:24.956000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979699",
              "crash_point": 12.97,
              "time": "2025-03-26T10:29:20.158000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980285",
        "start_time": "2025-03-26T15:23:12.411000+05:30",
        "end_game_id": "7980291",
        "end_time": "2025-03-26T15:25:03.851000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980292",
              "crash_point": 10.39,
              "time": "2025-03-26T15:25:55.700000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974427",
        "start_time": "2025-03-24T17:28:57.490000+05:30",
        "end_game_id": "7974432",
        "end_time": "2025-03-24T17:31:08.397000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974433",
              "crash_point": 12.36,
              "time": "2025-03-24T17:32:02.182000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974458",
        "start_time": "2025-03-24T17:43:31.835000+05:30",
        "end_game_id": "7974463",
        "end_time": "2025-03-24T17:45:48.195000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7974464",
              "crash_point": 17.92,
              "time": "2025-03-24T17:46:48.273000+05:30"
            },
            {
              "game_id": "7974465",
              "crash_point": 24.95,
              "time": "2025-03-24T17:47:53.447000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974505",
        "start_time": "2025-03-24T18:07:33.082000+05:30",
        "end_game_id": "7974510",
        "end_time": "2025-03-24T18:09:22.298000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974511",
              "crash_point": 10.69,
              "time": "2025-03-24T18:10:13.207000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974672",
        "start_time": "2025-03-24T19:23:16.984000+05:30",
        "end_game_id": "7974677",
        "end_time": "2025-03-24T19:24:51.412000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974678",
              "crash_point": 14.52,
              "time": "2025-03-24T19:25:48.833000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974710",
        "start_time": "2025-03-24T19:42:45.803000+05:30",
        "end_game_id": "7974715",
        "end_time": "2025-03-24T19:44:28.240000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974716",
              "crash_point": 15.2,
              "time": "2025-03-24T19:45:26.041000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975106",
        "start_time": "2025-03-24T22:39:09.246000+05:30",
        "end_game_id": "7975111",
        "end_time": "2025-03-24T22:40:52.444000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975112",
              "crash_point": 721.06,
              "time": "2025-03-24T22:42:53.963000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975231",
        "start_time": "2025-03-24T23:38:39.568000+05:30",
        "end_game_id": "7975236",
        "end_time": "2025-03-24T23:40:38.817000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975237",
              "crash_point": 21.37,
              "time": "2025-03-24T23:41:41.879000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975929",
        "start_time": "2025-03-25T05:05:15.802000+05:30",
        "end_game_id": "7975934",
        "end_time": "2025-03-25T05:06:45.320000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975935",
              "crash_point": 26.69,
              "time": "2025-03-25T05:07:51.979000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976158",
        "start_time": "2025-03-25T06:53:11.753000+05:30",
        "end_game_id": "7976163",
        "end_time": "2025-03-25T06:55:37.028000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976164",
              "crash_point": 20.22,
              "time": "2025-03-25T06:56:38.625000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976295",
        "start_time": "2025-03-25T07:56:47.366000+05:30",
        "end_game_id": "7976300",
        "end_time": "2025-03-25T07:58:56.428000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976301",
              "crash_point": 18.3,
              "time": "2025-03-25T07:59:56.329000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976719",
        "start_time": "2025-03-25T11:21:27.622000+05:30",
        "end_game_id": "7976724",
        "end_time": "2025-03-25T11:23:48.467000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976725",
              "crash_point": 32.41,
              "time": "2025-03-25T11:24:57.944000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977142",
        "start_time": "2025-03-25T14:32:08.967000+05:30",
        "end_game_id": "7977147",
        "end_time": "2025-03-25T14:34:51.124000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977148",
              "crash_point": 10.72,
              "time": "2025-03-25T14:35:42.158000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977475",
        "start_time": "2025-03-25T17:06:03.178000+05:30",
        "end_game_id": "7977480",
        "end_time": "2025-03-25T17:07:57.760000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977481",
              "crash_point": 10.14,
              "time": "2025-03-25T17:08:48.478000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977494",
        "start_time": "2025-03-25T17:14:23.740000+05:30",
        "end_game_id": "7977499",
        "end_time": "2025-03-25T17:16:34.946000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977500",
              "crash_point": 16.46,
              "time": "2025-03-25T17:17:33.254000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977501",
        "start_time": "2025-03-25T17:17:51.997000+05:30",
        "end_game_id": "7977506",
        "end_time": "2025-03-25T17:19:52.213000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7977507",
              "crash_point": 21.05,
              "time": "2025-03-25T17:20:55.987000+05:30"
            },
            {
              "game_id": "7977508",
              "crash_point": 12.03,
              "time": "2025-03-25T17:21:49.123000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977978",
        "start_time": "2025-03-25T20:58:48.727000+05:30",
        "end_game_id": "7977983",
        "end_time": "2025-03-25T21:00:25.915000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977984",
              "crash_point": 12.68,
              "time": "2025-03-25T21:01:20.380000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978076",
        "start_time": "2025-03-25T21:42:12.475000+05:30",
        "end_game_id": "7978081",
        "end_time": "2025-03-25T21:43:56.111000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7978082",
              "crash_point": 91.66,
              "time": "2025-03-25T21:45:22.912000+05:30"
            },
            {
              "game_id": "7978083",
              "crash_point": 18.61,
              "time": "2025-03-25T21:46:23.194000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978088",
        "start_time": "2025-03-25T21:48:29.014000+05:30",
        "end_game_id": "7978093",
        "end_time": "2025-03-25T21:50:26.257000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7978094",
              "crash_point": 10.26,
              "time": "2025-03-25T21:51:17.873000+05:30"
            },
            {
              "game_id": "7978095",
              "crash_point": 72.01,
              "time": "2025-03-25T21:52:40.562000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978224",
        "start_time": "2025-03-25T22:56:49.465000+05:30",
        "end_game_id": "7978229",
        "end_time": "2025-03-25T22:58:55.687000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978230",
              "crash_point": 38.04,
              "time": "2025-03-25T23:00:08.299000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978511",
        "start_time": "2025-03-26T01:13:56.717000+05:30",
        "end_game_id": "7978516",
        "end_time": "2025-03-26T01:15:36.739000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978517",
              "crash_point": 247.23,
              "time": "2025-03-26T01:17:20.355000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978654",
        "start_time": "2025-03-26T02:22:30.517000+05:30",
        "end_game_id": "7978659",
        "end_time": "2025-03-26T02:24:31.562000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978660",
              "crash_point": 13.28,
              "time": "2025-03-26T02:25:26.239000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978748",
        "start_time": "2025-03-26T03:06:00.479000+05:30",
        "end_game_id": "7978753",
        "end_time": "2025-03-26T03:08:01.775000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978754",
              "crash_point": 22.52,
              "time": "2025-03-26T03:09:05.254000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978896",
        "start_time": "2025-03-26T04:14:15.039000+05:30",
        "end_game_id": "7978901",
        "end_time": "2025-03-26T04:16:33.059000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978902",
              "crash_point": 33.01,
              "time": "2025-03-26T04:17:43.169000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978939",
        "start_time": "2025-03-26T04:35:04.044000+05:30",
        "end_game_id": "7978944",
        "end_time": "2025-03-26T04:36:48.649000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978945",
              "crash_point": 13.71,
              "time": "2025-03-26T04:37:44.186000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979677",
        "start_time": "2025-03-26T10:17:52.404000+05:30",
        "end_game_id": "7979682",
        "end_time": "2025-03-26T10:19:50.346000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979683",
              "crash_point": 10.28,
              "time": "2025-03-26T10:20:41.711000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979787",
        "start_time": "2025-03-26T11:11:00.057000+05:30",
        "end_game_id": "7979792",
        "end_time": "2025-03-26T11:12:26.426000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979793",
              "crash_point": 32.67,
              "time": "2025-03-26T11:13:37.183000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979869",
        "start_time": "2025-03-26T11:49:39.546000+05:30",
        "end_game_id": "7979874",
        "end_time": "2025-03-26T11:51:44.459000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979875",
              "crash_point": 23.61,
              "time": "2025-03-26T11:52:48.767000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979975",
        "start_time": "2025-03-26T12:44:19.285000+05:30",
        "end_game_id": "7979980",
        "end_time": "2025-03-26T12:46:29.656000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979981",
              "crash_point": 27.26,
              "time": "2025-03-26T12:47:36.228000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980032",
        "start_time": "2025-03-26T13:15:08.789000+05:30",
        "end_game_id": "7980037",
        "end_time": "2025-03-26T13:16:55.156000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980038",
              "crash_point": 18.8,
              "time": "2025-03-26T13:17:55.380000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980150",
        "start_time": "2025-03-26T14:14:10.410000+05:30",
        "end_game_id": "7980155",
        "end_time": "2025-03-26T14:16:30.225000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980156",
              "crash_point": 217.32,
              "time": "2025-03-26T14:18:11.542000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974634",
        "start_time": "2025-03-24T19:04:45.978000+05:30",
        "end_game_id": "7974638",
        "end_time": "2025-03-24T19:06:33.523000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974639",
              "crash_point": 14.97,
              "time": "2025-03-24T19:07:30.140000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975113",
        "start_time": "2025-03-24T22:43:08.076000+05:30",
        "end_game_id": "7975117",
        "end_time": "2025-03-24T22:44:24.551000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975118",
              "crash_point": 22.33,
              "time": "2025-03-24T22:45:27.797000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975318",
        "start_time": "2025-03-25T00:20:23.016000+05:30",
        "end_game_id": "7975322",
        "end_time": "2025-03-25T00:21:52.685000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975323",
              "crash_point": 17.55,
              "time": "2025-03-25T00:22:52.131000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975324",
        "start_time": "2025-03-25T00:23:05.877000+05:30",
        "end_game_id": "7975328",
        "end_time": "2025-03-25T00:24:13.834000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975329",
              "crash_point": 11.82,
              "time": "2025-03-25T00:25:07.108000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975538",
        "start_time": "2025-03-25T02:01:12.251000+05:30",
        "end_game_id": "7975542",
        "end_time": "2025-03-25T02:02:26.435000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975543",
              "crash_point": 12.06,
              "time": "2025-03-25T02:03:19.793000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975761",
        "start_time": "2025-03-25T03:47:21.309000+05:30",
        "end_game_id": "7975765",
        "end_time": "2025-03-25T03:48:41.420000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975766",
              "crash_point": 36.81,
              "time": "2025-03-25T03:49:53.113000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975782",
        "start_time": "2025-03-25T03:57:56.302000+05:30",
        "end_game_id": "7975786",
        "end_time": "2025-03-25T03:59:49.078000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975787",
              "crash_point": 13.53,
              "time": "2025-03-25T04:00:44.765000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975951",
        "start_time": "2025-03-25T05:14:33.244000+05:30",
        "end_game_id": "7975955",
        "end_time": "2025-03-25T05:16:18.292000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975956",
              "crash_point": 15.93,
              "time": "2025-03-25T05:17:16.065000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976056",
        "start_time": "2025-03-25T06:02:53.482000+05:30",
        "end_game_id": "7976060",
        "end_time": "2025-03-25T06:03:59.606000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7976061",
              "crash_point": 15.35,
              "time": "2025-03-25T06:04:57.240000+05:30"
            },
            {
              "game_id": "7976062",
              "crash_point": 79.25,
              "time": "2025-03-25T06:06:21.811000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976095",
        "start_time": "2025-03-25T06:21:36.722000+05:30",
        "end_game_id": "7976099",
        "end_time": "2025-03-25T06:23:21.142000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976100",
              "crash_point": 12.92,
              "time": "2025-03-25T06:24:15.620000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976115",
        "start_time": "2025-03-25T06:31:18.575000+05:30",
        "end_game_id": "7976119",
        "end_time": "2025-03-25T06:32:55.667000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976120",
              "crash_point": 10.81,
              "time": "2025-03-25T06:33:47.227000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976138",
        "start_time": "2025-03-25T06:43:45.108000+05:30",
        "end_game_id": "7976142",
        "end_time": "2025-03-25T06:45:33.713000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7976143",
              "crash_point": 35.44,
              "time": "2025-03-25T06:46:44.795000+05:30"
            },
            {
              "game_id": "7976144",
              "crash_point": 25.22,
              "time": "2025-03-25T06:47:50.166000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976165",
        "start_time": "2025-03-25T06:57:24.588000+05:30",
        "end_game_id": "7976169",
        "end_time": "2025-03-25T06:59:14.853000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976170",
              "crash_point": 17.34,
              "time": "2025-03-25T07:00:13.909000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976218",
        "start_time": "2025-03-25T07:24:10.595000+05:30",
        "end_game_id": "7976222",
        "end_time": "2025-03-25T07:25:35.994000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976223",
              "crash_point": 45.53,
              "time": "2025-03-25T07:26:51.603000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976402",
        "start_time": "2025-03-25T08:50:11.325000+05:30",
        "end_game_id": "7976406",
        "end_time": "2025-03-25T08:52:21.039000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976407",
              "crash_point": 17.51,
              "time": "2025-03-25T08:53:20.635000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976736",
        "start_time": "2025-03-25T11:29:58.032000+05:30",
        "end_game_id": "7976740",
        "end_time": "2025-03-25T11:31:21.073000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976741",
              "crash_point": 19.8,
              "time": "2025-03-25T11:32:22.934000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976947",
        "start_time": "2025-03-25T13:06:08.584000+05:30",
        "end_game_id": "7976951",
        "end_time": "2025-03-25T13:08:09.659000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976952",
              "crash_point": 431.83,
              "time": "2025-03-25T13:10:02.650000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977261",
        "start_time": "2025-03-25T15:25:10.299000+05:30",
        "end_game_id": "7977265",
        "end_time": "2025-03-25T15:27:28.772000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977266",
              "crash_point": 78.73,
              "time": "2025-03-25T15:28:53.259000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977609",
        "start_time": "2025-03-25T18:11:22.734000+05:30",
        "end_game_id": "7977613",
        "end_time": "2025-03-25T18:13:08.188000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977614",
              "crash_point": 10.46,
              "time": "2025-03-25T18:13:59.879000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978139",
        "start_time": "2025-03-25T22:14:47.887000+05:30",
        "end_game_id": "7978143",
        "end_time": "2025-03-25T22:16:22.076000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978144",
              "crash_point": 13.42,
              "time": "2025-03-25T22:17:18.402000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978362",
        "start_time": "2025-03-26T00:00:34.963000+05:30",
        "end_game_id": "7978366",
        "end_time": "2025-03-26T00:02:43.991000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978367",
              "crash_point": 27.54,
              "time": "2025-03-26T00:03:50.980000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978616",
        "start_time": "2025-03-26T02:03:50.279000+05:30",
        "end_game_id": "7978620",
        "end_time": "2025-03-26T02:05:20.033000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978621",
              "crash_point": 11.18,
              "time": "2025-03-26T02:06:11.836000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978698",
        "start_time": "2025-03-26T02:42:59.007000+05:30",
        "end_game_id": "7978702",
        "end_time": "2025-03-26T02:44:09.158000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978703",
              "crash_point": 31.43,
              "time": "2025-03-26T02:45:18.669000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978715",
        "start_time": "2025-03-26T02:51:50.620000+05:30",
        "end_game_id": "7978719",
        "end_time": "2025-03-26T02:53:13.874000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978720",
              "crash_point": 61.42,
              "time": "2025-03-26T02:54:34.240000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978721",
        "start_time": "2025-03-26T02:54:47.104000+05:30",
        "end_game_id": "7978725",
        "end_time": "2025-03-26T02:56:03.529000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978726",
              "crash_point": 112.16,
              "time": "2025-03-26T02:57:33.755000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978783",
        "start_time": "2025-03-26T03:23:08.406000+05:30",
        "end_game_id": "7978787",
        "end_time": "2025-03-26T03:24:55.402000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978788",
              "crash_point": 41.61,
              "time": "2025-03-26T03:26:09.240000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978890",
        "start_time": "2025-03-26T04:11:10.895000+05:30",
        "end_game_id": "7978894",
        "end_time": "2025-03-26T04:12:40.340000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978895",
              "crash_point": 13.51,
              "time": "2025-03-26T04:13:35.261000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978946",
        "start_time": "2025-03-26T04:37:56.450000+05:30",
        "end_game_id": "7978950",
        "end_time": "2025-03-26T04:39:20.825000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978951",
              "crash_point": 12.98,
              "time": "2025-03-26T04:40:15.064000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979000",
        "start_time": "2025-03-26T05:02:50.007000+05:30",
        "end_game_id": "7979004",
        "end_time": "2025-03-26T05:04:26.048000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979005",
              "crash_point": 13.47,
              "time": "2025-03-26T05:05:21.246000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979190",
        "start_time": "2025-03-26T06:34:16.732000+05:30",
        "end_game_id": "7979194",
        "end_time": "2025-03-26T06:36:19.692000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979195",
              "crash_point": 11.9,
              "time": "2025-03-26T06:37:12.898000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979243",
        "start_time": "2025-03-26T06:59:56.610000+05:30",
        "end_game_id": "7979247",
        "end_time": "2025-03-26T07:01:36.229000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979248",
              "crash_point": 49.03,
              "time": "2025-03-26T07:02:52.536000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979438",
        "start_time": "2025-03-26T08:29:07.617000+05:30",
        "end_game_id": "7979442",
        "end_time": "2025-03-26T08:30:10.048000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979443",
              "crash_point": 11.37,
              "time": "2025-03-26T08:31:02.510000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980134",
        "start_time": "2025-03-26T14:05:51.972000+05:30",
        "end_game_id": "7980138",
        "end_time": "2025-03-26T14:07:50.434000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980139",
              "crash_point": 35.72,
              "time": "2025-03-26T14:09:01.567000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980177",
        "start_time": "2025-03-26T14:30:23.351000+05:30",
        "end_game_id": "7980181",
        "end_time": "2025-03-26T14:31:53.815000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980182",
              "crash_point": 450.29,
              "time": "2025-03-26T14:33:47.872000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974679",
        "start_time": "2025-03-24T19:26:26.485000+05:30",
        "end_game_id": "7974682",
        "end_time": "2025-03-24T19:27:44.774000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974683",
              "crash_point": 13.93,
              "time": "2025-03-24T19:28:41.585000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974853",
        "start_time": "2025-03-24T20:45:41.201000+05:30",
        "end_game_id": "7974856",
        "end_time": "2025-03-24T20:46:48.007000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974857",
              "crash_point": 18.78,
              "time": "2025-03-24T20:47:48.343000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974881",
        "start_time": "2025-03-24T21:00:21.560000+05:30",
        "end_game_id": "7974884",
        "end_time": "2025-03-24T21:01:40.450000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7974885",
              "crash_point": 46.38,
              "time": "2025-03-24T21:02:56.002000+05:30"
            },
            {
              "game_id": "7974886",
              "crash_point": 13.72,
              "time": "2025-03-24T21:03:51.074000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974887",
        "start_time": "2025-03-24T21:04:17.533000+05:30",
        "end_game_id": "7974890",
        "end_time": "2025-03-24T21:05:38.875000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974891",
              "crash_point": 13.33,
              "time": "2025-03-24T21:06:33.570000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974892",
        "start_time": "2025-03-24T21:06:52.954000+05:30",
        "end_game_id": "7974895",
        "end_time": "2025-03-24T21:07:59.807000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974896",
              "crash_point": 15.77,
              "time": "2025-03-24T21:08:57.243000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975175",
        "start_time": "2025-03-24T23:11:18.270000+05:30",
        "end_game_id": "7975178",
        "end_time": "2025-03-24T23:12:19.324000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975179",
              "crash_point": 25.32,
              "time": "2025-03-24T23:13:25.129000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975513",
        "start_time": "2025-03-25T01:46:23.248000+05:30",
        "end_game_id": "7975516",
        "end_time": "2025-03-25T01:47:39.225000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975517",
              "crash_point": 11.33,
              "time": "2025-03-25T01:48:31.487000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975544",
        "start_time": "2025-03-25T02:03:35.635000+05:30",
        "end_game_id": "7975547",
        "end_time": "2025-03-25T02:04:45.452000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975548",
              "crash_point": 31.87,
              "time": "2025-03-25T02:05:54.828000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975922",
        "start_time": "2025-03-25T05:01:31.799000+05:30",
        "end_game_id": "7975925",
        "end_time": "2025-03-25T05:02:26.441000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975926",
              "crash_point": 18.65,
              "time": "2025-03-25T05:03:27.237000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975987",
        "start_time": "2025-03-25T05:30:24.853000+05:30",
        "end_game_id": "7975990",
        "end_time": "2025-03-25T05:31:31.265000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975991",
              "crash_point": 74.81,
              "time": "2025-03-25T05:32:54.713000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976511",
        "start_time": "2025-03-25T09:44:08.051000+05:30",
        "end_game_id": "7976514",
        "end_time": "2025-03-25T09:45:28.922000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976515",
              "crash_point": 30.5,
              "time": "2025-03-25T09:46:37.454000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976602",
        "start_time": "2025-03-25T10:25:39.939000+05:30",
        "end_game_id": "7976605",
        "end_time": "2025-03-25T10:26:40.933000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976606",
              "crash_point": 127.0,
              "time": "2025-03-25T10:28:13.223000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976812",
        "start_time": "2025-03-25T12:05:29.178000+05:30",
        "end_game_id": "7976815",
        "end_time": "2025-03-25T12:06:22.328000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976816",
              "crash_point": 21.45,
              "time": "2025-03-25T12:07:25.721000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977330",
        "start_time": "2025-03-25T15:59:10.651000+05:30",
        "end_game_id": "7977333",
        "end_time": "2025-03-25T16:00:04.980000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977334",
              "crash_point": 15.77,
              "time": "2025-03-25T16:01:03.244000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977770",
        "start_time": "2025-03-25T19:24:18.462000+05:30",
        "end_game_id": "7977773",
        "end_time": "2025-03-25T19:25:35.150000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977774",
              "crash_point": 15.02,
              "time": "2025-03-25T19:26:32.667000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977791",
        "start_time": "2025-03-25T19:34:10.826000+05:30",
        "end_game_id": "7977794",
        "end_time": "2025-03-25T19:35:04.554000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977795",
              "crash_point": 144.52,
              "time": "2025-03-25T19:36:39.646000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977843",
        "start_time": "2025-03-25T19:56:39.511000+05:30",
        "end_game_id": "7977846",
        "end_time": "2025-03-25T19:57:57.636000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977847",
              "crash_point": 12.57,
              "time": "2025-03-25T19:58:51.476000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978009",
        "start_time": "2025-03-25T21:12:26.510000+05:30",
        "end_game_id": "7978012",
        "end_time": "2025-03-25T21:13:45.067000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978013",
              "crash_point": 21.58,
              "time": "2025-03-25T21:14:48.679000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978331",
        "start_time": "2025-03-25T23:45:49.486000+05:30",
        "end_game_id": "7978334",
        "end_time": "2025-03-25T23:46:42.011000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978335",
              "crash_point": 24.57,
              "time": "2025-03-25T23:47:47.468000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978368",
        "start_time": "2025-03-26T00:04:03.892000+05:30",
        "end_game_id": "7978371",
        "end_time": "2025-03-26T00:05:04.127000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978372",
              "crash_point": 195.69,
              "time": "2025-03-26T00:06:43.885000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978498",
        "start_time": "2025-03-26T01:07:21.791000+05:30",
        "end_game_id": "7978501",
        "end_time": "2025-03-26T01:08:30.508000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978502",
              "crash_point": 12.52,
              "time": "2025-03-26T01:09:24.104000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978532",
        "start_time": "2025-03-26T01:23:55.476000+05:30",
        "end_game_id": "7978535",
        "end_time": "2025-03-26T01:25:02.208000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7978536",
              "crash_point": 11.68,
              "time": "2025-03-26T01:25:55.024000+05:30"
            },
            {
              "game_id": "7978537",
              "crash_point": 26.33,
              "time": "2025-03-26T01:27:01.351000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978611",
        "start_time": "2025-03-26T02:01:37.687000+05:30",
        "end_game_id": "7978614",
        "end_time": "2025-03-26T02:02:35.305000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978615",
              "crash_point": 11.62,
              "time": "2025-03-26T02:03:27.660000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978622",
        "start_time": "2025-03-26T02:06:41.197000+05:30",
        "end_game_id": "7978625",
        "end_time": "2025-03-26T02:08:13.015000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978626",
              "crash_point": 88.68,
              "time": "2025-03-26T02:09:39.214000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978661",
        "start_time": "2025-03-26T02:25:54.092000+05:30",
        "end_game_id": "7978664",
        "end_time": "2025-03-26T02:26:43.096000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7978665",
              "crash_point": 91.61,
              "time": "2025-03-26T02:28:10.441000+05:30"
            },
            {
              "game_id": "7978666",
              "crash_point": 23.74,
              "time": "2025-03-26T02:29:14.693000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978854",
        "start_time": "2025-03-26T03:56:01.629000+05:30",
        "end_game_id": "7978857",
        "end_time": "2025-03-26T03:56:46.223000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978858",
              "crash_point": 11.29,
              "time": "2025-03-26T03:57:38.393000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978927",
        "start_time": "2025-03-26T04:28:52.297000+05:30",
        "end_game_id": "7978930",
        "end_time": "2025-03-26T04:30:16.464000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978931",
              "crash_point": 37.43,
              "time": "2025-03-26T04:31:28.934000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979301",
        "start_time": "2025-03-26T07:29:01.686000+05:30",
        "end_game_id": "7979304",
        "end_time": "2025-03-26T07:30:02.162000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979305",
              "crash_point": 10.35,
              "time": "2025-03-26T07:30:52.550000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979970",
        "start_time": "2025-03-26T12:41:30.534000+05:30",
        "end_game_id": "7979973",
        "end_time": "2025-03-26T12:42:52.804000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979974",
              "crash_point": 10.76,
              "time": "2025-03-26T12:43:44.007000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979982",
        "start_time": "2025-03-26T12:47:54.649000+05:30",
        "end_game_id": "7979985",
        "end_time": "2025-03-26T12:49:23.760000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979986",
              "crash_point": 30.44,
              "time": "2025-03-26T12:50:32.811000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980162",
        "start_time": "2025-03-26T14:21:47.443000+05:30",
        "end_game_id": "7980165",
        "end_time": "2025-03-26T14:23:01.400000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7980166",
              "crash_point": 89.0,
              "time": "2025-03-26T14:24:29.114000+05:30"
            },
            {
              "game_id": "7980167",
              "crash_point": 38.47,
              "time": "2025-03-26T14:25:41.535000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980464",
        "start_time": "2025-03-26T16:46:13.754000+05:30",
        "end_game_id": "7980467",
        "end_time": "2025-03-26T16:47:29.400000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980468",
              "crash_point": 11.01,
              "time": "2025-03-26T16:48:21.212000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980469",
        "start_time": "2025-03-26T16:48:45.828000+05:30",
        "end_game_id": "7980472",
        "end_time": "2025-03-26T16:49:44.332000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980473",
              "crash_point": 74.67,
              "time": "2025-03-26T16:51:07.682000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980518",
        "start_time": "2025-03-26T17:13:24.755000+05:30",
        "end_game_id": "7980521",
        "end_time": "2025-03-26T17:14:47.362000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980522",
              "crash_point": 67.42,
              "time": "2025-03-26T17:16:08.991000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974667",
        "start_time": "2025-03-24T19:20:38.688000+05:30",
        "end_game_id": "7974669",
        "end_time": "2025-03-24T19:21:09.750000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7974670",
              "crash_point": 15.55,
              "time": "2025-03-24T19:22:08.566000+05:30"
            },
            {
              "game_id": "7974671",
              "crash_point": 13.44,
              "time": "2025-03-24T19:23:03.384000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974706",
        "start_time": "2025-03-24T19:40:29.638000+05:30",
        "end_game_id": "7974708",
        "end_time": "2025-03-24T19:41:14.521000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974709",
              "crash_point": 14.93,
              "time": "2025-03-24T19:42:11.153000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975509",
        "start_time": "2025-03-25T01:44:26.464000+05:30",
        "end_game_id": "7975511",
        "end_time": "2025-03-25T01:44:56.026000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975512",
              "crash_point": 10.27,
              "time": "2025-03-25T01:45:46.794000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975520",
        "start_time": "2025-03-25T01:50:29.205000+05:30",
        "end_game_id": "7975522",
        "end_time": "2025-03-25T01:51:00.088000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975523",
              "crash_point": 18.14,
              "time": "2025-03-25T01:52:00.340000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975533",
        "start_time": "2025-03-25T01:57:25.061000+05:30",
        "end_game_id": "7975535",
        "end_time": "2025-03-25T01:58:18.180000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7975536",
              "crash_point": 41.52,
              "time": "2025-03-25T01:59:32.381000+05:30"
            },
            {
              "game_id": "7975537",
              "crash_point": 24.52,
              "time": "2025-03-25T02:00:37.083000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975645",
        "start_time": "2025-03-25T02:51:39.237000+05:30",
        "end_game_id": "7975647",
        "end_time": "2025-03-25T02:52:34.572000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975648",
              "crash_point": 74.09,
              "time": "2025-03-25T02:53:58.325000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975744",
        "start_time": "2025-03-25T03:39:24.359000+05:30",
        "end_game_id": "7975746",
        "end_time": "2025-03-25T03:40:06.865000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975747",
              "crash_point": 19.51,
              "time": "2025-03-25T03:41:08.324000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975778",
        "start_time": "2025-03-25T03:55:32.035000+05:30",
        "end_game_id": "7975780",
        "end_time": "2025-03-25T03:56:23.980000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975781",
              "crash_point": 11.27,
              "time": "2025-03-25T03:57:15.915000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976001",
        "start_time": "2025-03-25T05:37:32.563000+05:30",
        "end_game_id": "7976003",
        "end_time": "2025-03-25T05:37:59.658000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976004",
              "crash_point": 12.5,
              "time": "2025-03-25T05:38:53.710000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976131",
        "start_time": "2025-03-25T06:40:02.656000+05:30",
        "end_game_id": "7976133",
        "end_time": "2025-03-25T06:40:46.799000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976134",
              "crash_point": 10.8,
              "time": "2025-03-25T06:41:38.359000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976205",
        "start_time": "2025-03-25T07:16:41.542000+05:30",
        "end_game_id": "7976207",
        "end_time": "2025-03-25T07:17:55.639000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7976208",
              "crash_point": 10.05,
              "time": "2025-03-25T07:18:45.650000+05:30"
            },
            {
              "game_id": "7976209",
              "crash_point": 75.73,
              "time": "2025-03-25T07:20:09.262000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976302",
        "start_time": "2025-03-25T08:00:18.615000+05:30",
        "end_game_id": "7976304",
        "end_time": "2025-03-25T08:01:07.841000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976305",
              "crash_point": 14.03,
              "time": "2025-03-25T08:02:03.613000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976390",
        "start_time": "2025-03-25T08:43:48.247000+05:30",
        "end_game_id": "7976392",
        "end_time": "2025-03-25T08:44:35.651000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976393",
              "crash_point": 30.41,
              "time": "2025-03-25T08:45:44.141000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976607",
        "start_time": "2025-03-25T10:28:46.771000+05:30",
        "end_game_id": "7976609",
        "end_time": "2025-03-25T10:29:31.833000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7976610",
              "crash_point": 97.66,
              "time": "2025-03-25T10:31:00.230000+05:30"
            },
            {
              "game_id": "7976611",
              "crash_point": 108.33,
              "time": "2025-03-25T10:32:29.653000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976788",
        "start_time": "2025-03-25T11:54:20.737000+05:30",
        "end_game_id": "7976790",
        "end_time": "2025-03-25T11:55:27.237000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976791",
              "crash_point": 16.5,
              "time": "2025-03-25T11:56:26.542000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977206",
        "start_time": "2025-03-25T15:00:29.640000+05:30",
        "end_game_id": "7977208",
        "end_time": "2025-03-25T15:00:59.934000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977209",
              "crash_point": 15.83,
              "time": "2025-03-25T15:01:58.655000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977322",
        "start_time": "2025-03-25T15:54:39.817000+05:30",
        "end_game_id": "7977324",
        "end_time": "2025-03-25T15:55:35.091000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977325",
              "crash_point": 28.89,
              "time": "2025-03-25T15:56:42.929000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977326",
        "start_time": "2025-03-25T15:57:02.087000+05:30",
        "end_game_id": "7977328",
        "end_time": "2025-03-25T15:57:51.147000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977329",
              "crash_point": 12.36,
              "time": "2025-03-25T15:58:45.008000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977623",
        "start_time": "2025-03-25T18:18:16.962000+05:30",
        "end_game_id": "7977625",
        "end_time": "2025-03-25T18:19:09.046000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977626",
              "crash_point": 213.42,
              "time": "2025-03-25T18:20:50.120000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977674",
        "start_time": "2025-03-25T18:41:28.661000+05:30",
        "end_game_id": "7977676",
        "end_time": "2025-03-25T18:42:07.766000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977677",
              "crash_point": 16.48,
              "time": "2025-03-25T18:43:06.882000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977775",
        "start_time": "2025-03-25T19:26:57.589000+05:30",
        "end_game_id": "7977777",
        "end_time": "2025-03-25T19:27:38.692000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977778",
              "crash_point": 19.92,
              "time": "2025-03-25T19:28:39.948000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977931",
        "start_time": "2025-03-25T20:37:32.339000+05:30",
        "end_game_id": "7977933",
        "end_time": "2025-03-25T20:38:26.299000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977934",
              "crash_point": 51.1,
              "time": "2025-03-25T20:39:44.134000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978084",
        "start_time": "2025-03-25T21:46:36.130000+05:30",
        "end_game_id": "7978086",
        "end_time": "2025-03-25T21:47:14.020000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978087",
              "crash_point": 14.4,
              "time": "2025-03-25T21:48:11.201000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978386",
        "start_time": "2025-03-26T00:13:41.477000+05:30",
        "end_game_id": "7978388",
        "end_time": "2025-03-26T00:14:22.602000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978389",
              "crash_point": 26.88,
              "time": "2025-03-26T00:15:29+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978393",
        "start_time": "2025-03-26T00:18:10.931000+05:30",
        "end_game_id": "7978395",
        "end_time": "2025-03-26T00:18:51.954000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7978396",
              "crash_point": 16.56,
              "time": "2025-03-26T00:19:51.721000+05:30"
            },
            {
              "game_id": "7978397",
              "crash_point": 12.03,
              "time": "2025-03-26T00:20:44.919000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978398",
        "start_time": "2025-03-26T00:21:22.203000+05:30",
        "end_game_id": "7978400",
        "end_time": "2025-03-26T00:22:18.371000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978401",
              "crash_point": 10.72,
              "time": "2025-03-26T00:23:10.320000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978704",
        "start_time": "2025-03-26T02:45:40.887000+05:30",
        "end_game_id": "7978706",
        "end_time": "2025-03-26T02:46:32.362000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978707",
              "crash_point": 54.98,
              "time": "2025-03-26T02:47:50.563000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978708",
        "start_time": "2025-03-26T02:48:05.612000+05:30",
        "end_game_id": "7978710",
        "end_time": "2025-03-26T02:48:49.959000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978711",
              "crash_point": 32.83,
              "time": "2025-03-26T02:49:59.839000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978789",
        "start_time": "2025-03-26T03:26:23.510000+05:30",
        "end_game_id": "7978791",
        "end_time": "2025-03-26T03:27:03.621000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 3,
          "games": [
            {
              "game_id": "7978792",
              "crash_point": 430.35,
              "time": "2025-03-26T03:28:56.720000+05:30"
            },
            {
              "game_id": "7978793",
              "crash_point": 12.79,
              "time": "2025-03-26T03:29:50.968000+05:30"
            },
            {
              "game_id": "7978794",
              "crash_point": 11.18,
              "time": "2025-03-26T03:30:42.871000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978935",
        "start_time": "2025-03-26T04:33:12.813000+05:30",
        "end_game_id": "7978937",
        "end_time": "2025-03-26T04:33:59.368000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978938",
              "crash_point": 11.24,
              "time": "2025-03-26T04:34:51.491000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979060",
        "start_time": "2025-03-26T05:32:06.545000+05:30",
        "end_game_id": "7979062",
        "end_time": "2025-03-26T05:32:55.341000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979063",
              "crash_point": 13.12,
              "time": "2025-03-26T05:33:50.484000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979249",
        "start_time": "2025-03-26T07:03:04.429000+05:30",
        "end_game_id": "7979251",
        "end_time": "2025-03-26T07:03:53.384000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979252",
              "crash_point": 29.89,
              "time": "2025-03-26T07:05:01.618000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979423",
        "start_time": "2025-03-26T08:21:29.416000+05:30",
        "end_game_id": "7979425",
        "end_time": "2025-03-26T08:21:59.962000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979426",
              "crash_point": 14.39,
              "time": "2025-03-26T08:22:56.925000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979582",
        "start_time": "2025-03-26T09:29:25.909000+05:30",
        "end_game_id": "7979584",
        "end_time": "2025-03-26T09:30:18.632000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979585",
              "crash_point": 39.79,
              "time": "2025-03-26T09:31:31.618000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979586",
        "start_time": "2025-03-26T09:32:02.242000+05:30",
        "end_game_id": "7979588",
        "end_time": "2025-03-26T09:32:49.562000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979589",
              "crash_point": 16.84,
              "time": "2025-03-26T09:33:48.946000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979590",
        "start_time": "2025-03-26T09:34:04.014000+05:30",
        "end_game_id": "7979592",
        "end_time": "2025-03-26T09:34:36.656000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979593",
              "crash_point": 12.8,
              "time": "2025-03-26T09:35:31.763000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979636",
        "start_time": "2025-03-26T09:56:08.423000+05:30",
        "end_game_id": "7979638",
        "end_time": "2025-03-26T09:56:58.379000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979639",
              "crash_point": 140.5,
              "time": "2025-03-26T09:58:32.131000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979660",
        "start_time": "2025-03-26T10:08:37.396000+05:30",
        "end_game_id": "7979662",
        "end_time": "2025-03-26T10:09:23.045000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979663",
              "crash_point": 26.76,
              "time": "2025-03-26T10:10:30.516000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979684",
        "start_time": "2025-03-26T10:21:15.244000+05:30",
        "end_game_id": "7979686",
        "end_time": "2025-03-26T10:22:06.306000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979687",
              "crash_point": 75.01,
              "time": "2025-03-26T10:23:29.893000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979688",
        "start_time": "2025-03-26T10:24:00.591000+05:30",
        "end_game_id": "7979690",
        "end_time": "2025-03-26T10:24:36.652000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979691",
              "crash_point": 11.5,
              "time": "2025-03-26T10:25:29.872000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979809",
        "start_time": "2025-03-26T11:20:34.359000+05:30",
        "end_game_id": "7979811",
        "end_time": "2025-03-26T11:21:22.022000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979812",
              "crash_point": 183.62,
              "time": "2025-03-26T11:23:00.794000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979900",
        "start_time": "2025-03-26T12:05:42.953000+05:30",
        "end_game_id": "7979902",
        "end_time": "2025-03-26T12:06:38.843000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979903",
              "crash_point": 164.8,
              "time": "2025-03-26T12:08:15.498000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979921",
        "start_time": "2025-03-26T12:16:22.029000+05:30",
        "end_game_id": "7979923",
        "end_time": "2025-03-26T12:17:39.575000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7979924",
              "crash_point": 11.83,
              "time": "2025-03-26T12:18:32.329000+05:30"
            },
            {
              "game_id": "7979925",
              "crash_point": 31.18,
              "time": "2025-03-26T12:19:41.351000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980157",
        "start_time": "2025-03-26T14:18:52.748000+05:30",
        "end_game_id": "7980159",
        "end_time": "2025-03-26T14:19:18.769000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7980160",
              "crash_point": 22.23,
              "time": "2025-03-26T14:20:23.459000+05:30"
            },
            {
              "game_id": "7980161",
              "crash_point": 20.91,
              "time": "2025-03-26T14:21:25.612000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980207",
        "start_time": "2025-03-26T14:46:37.915000+05:30",
        "end_game_id": "7980209",
        "end_time": "2025-03-26T14:47:12.087000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980210",
              "crash_point": 127.3,
              "time": "2025-03-26T14:48:45.392000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980332",
        "start_time": "2025-03-26T15:42:57.076000+05:30",
        "end_game_id": "7980334",
        "end_time": "2025-03-26T15:43:51.463000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7980335",
              "crash_point": 11.5,
              "time": "2025-03-26T15:44:43.635000+05:30"
            },
            {
              "game_id": "7980336",
              "crash_point": 58.08,
              "time": "2025-03-26T15:46:02.687000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980454",
        "start_time": "2025-03-26T16:40:03.339000+05:30",
        "end_game_id": "7980456",
        "end_time": "2025-03-26T16:40:44.940000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980457",
              "crash_point": 57.02,
              "time": "2025-03-26T16:42:04.378000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980458",
        "start_time": "2025-03-26T16:42:21.579000+05:30",
        "end_game_id": "7980460",
        "end_time": "2025-03-26T16:43:10.385000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980461",
              "crash_point": 16.06,
              "time": "2025-03-26T16:44:08.824000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980513",
        "start_time": "2025-03-26T17:10:11.047000+05:30",
        "end_game_id": "7980515",
        "end_time": "2025-03-26T17:11:01.392000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7980516",
              "crash_point": 11.54,
              "time": "2025-03-26T17:11:54.163000+05:30"
            },
            {
              "game_id": "7980517",
              "crash_point": 15.58,
              "time": "2025-03-26T17:12:51.518000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974512",
        "start_time": "2025-03-24T18:10:32.875000+05:30",
        "end_game_id": "7974513",
        "end_time": "2025-03-24T18:11:01.601000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974514",
              "crash_point": 12.8,
              "time": "2025-03-24T18:11:55.492000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974548",
        "start_time": "2025-03-24T18:26:47.963000+05:30",
        "end_game_id": "7974549",
        "end_time": "2025-03-24T18:27:23.216000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974550",
              "crash_point": 11.97,
              "time": "2025-03-24T18:28:16.320000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974737",
        "start_time": "2025-03-24T19:56:09.417000+05:30",
        "end_game_id": "7974738",
        "end_time": "2025-03-24T19:56:33.335000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974739",
              "crash_point": 31.62,
              "time": "2025-03-24T19:57:42.492000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974878",
        "start_time": "2025-03-24T20:58:03.036000+05:30",
        "end_game_id": "7974879",
        "end_time": "2025-03-24T20:58:16.461000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974880",
              "crash_point": 197.37,
              "time": "2025-03-24T20:59:56.836000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975155",
        "start_time": "2025-03-24T23:00:16.116000+05:30",
        "end_game_id": "7975156",
        "end_time": "2025-03-24T23:00:29.261000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975157",
              "crash_point": 50.7,
              "time": "2025-03-24T23:01:47.111000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975169",
        "start_time": "2025-03-24T23:07:23.801000+05:30",
        "end_game_id": "7975170",
        "end_time": "2025-03-24T23:07:38.421000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975171",
              "crash_point": 45.26,
              "time": "2025-03-24T23:08:54.568000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975172",
        "start_time": "2025-03-24T23:09:16.759000+05:30",
        "end_game_id": "7975173",
        "end_time": "2025-03-24T23:09:52.199000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975174",
              "crash_point": 13.64,
              "time": "2025-03-24T23:10:47.408000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975741",
        "start_time": "2025-03-25T03:37:41.328000+05:30",
        "end_game_id": "7975742",
        "end_time": "2025-03-25T03:37:56.269000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975743",
              "crash_point": 19.82,
              "time": "2025-03-25T03:38:57.679000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975758",
        "start_time": "2025-03-25T03:45:46.294000+05:30",
        "end_game_id": "7975759",
        "end_time": "2025-03-25T03:46:03.037000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975760",
              "crash_point": 12.44,
              "time": "2025-03-25T03:46:57.242000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975919",
        "start_time": "2025-03-25T04:59:30.437000+05:30",
        "end_game_id": "7975920",
        "end_time": "2025-03-25T04:59:59.160000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975921",
              "crash_point": 14.2,
              "time": "2025-03-25T05:00:54.931000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976005",
        "start_time": "2025-03-25T05:39:29.330000+05:30",
        "end_game_id": "7976006",
        "end_time": "2025-03-25T05:39:45.179000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976007",
              "crash_point": 14.27,
              "time": "2025-03-25T05:40:41.651000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976112",
        "start_time": "2025-03-25T06:29:24.693000+05:30",
        "end_game_id": "7976113",
        "end_time": "2025-03-25T06:30:05.120000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976114",
              "crash_point": 20.16,
              "time": "2025-03-25T06:31:06.701000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976135",
        "start_time": "2025-03-25T06:42:08.441000+05:30",
        "end_game_id": "7976136",
        "end_time": "2025-03-25T06:42:21.012000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976137",
              "crash_point": 15.06,
              "time": "2025-03-25T06:43:18.407000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976385",
        "start_time": "2025-03-25T08:40:45.746000+05:30",
        "end_game_id": "7976386",
        "end_time": "2025-03-25T08:41:13.814000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976387",
              "crash_point": 13.4,
              "time": "2025-03-25T08:42:08.697000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976434",
        "start_time": "2025-03-25T09:04:31.361000+05:30",
        "end_game_id": "7976435",
        "end_time": "2025-03-25T09:04:49+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976436",
              "crash_point": 219658.3,
              "time": "2025-03-25T09:08:26.004000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976449",
        "start_time": "2025-03-25T09:15:49.838000+05:30",
        "end_game_id": "7976450",
        "end_time": "2025-03-25T09:16:04.114000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 3,
          "games": [
            {
              "game_id": "7976451",
              "crash_point": 21.02,
              "time": "2025-03-25T09:17:06.871000+05:30"
            },
            {
              "game_id": "7976452",
              "crash_point": 14.79,
              "time": "2025-03-25T09:18:03.492000+05:30"
            },
            {
              "game_id": "7976453",
              "crash_point": 18.63,
              "time": "2025-03-25T09:19:03.798000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976536",
        "start_time": "2025-03-25T09:56:07.579000+05:30",
        "end_game_id": "7976537",
        "end_time": "2025-03-25T09:56:43.503000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976538",
              "crash_point": 31.38,
              "time": "2025-03-25T09:57:52.546000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976621",
        "start_time": "2025-03-25T10:36:45.411000+05:30",
        "end_game_id": "7976622",
        "end_time": "2025-03-25T10:37:08.227000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976623",
              "crash_point": 24.35,
              "time": "2025-03-25T10:38:13.937000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976921",
        "start_time": "2025-03-25T12:53:12.406000+05:30",
        "end_game_id": "7976922",
        "end_time": "2025-03-25T12:53:26.610000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976923",
              "crash_point": 15.75,
              "time": "2025-03-25T12:54:25.211000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976944",
        "start_time": "2025-03-25T13:04:14.833000+05:30",
        "end_game_id": "7976945",
        "end_time": "2025-03-25T13:04:27.878000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976946",
              "crash_point": 22.18,
              "time": "2025-03-25T13:05:32.259000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977113",
        "start_time": "2025-03-25T14:18:59.070000+05:30",
        "end_game_id": "7977114",
        "end_time": "2025-03-25T14:19:22.953000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977115",
              "crash_point": 12.14,
              "time": "2025-03-25T14:20:16.062000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977295",
        "start_time": "2025-03-25T15:42:21.509000+05:30",
        "end_game_id": "7977296",
        "end_time": "2025-03-25T15:43:02.354000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977297",
              "crash_point": 14.52,
              "time": "2025-03-25T15:43:58.630000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977567",
        "start_time": "2025-03-25T17:47:55.869000+05:30",
        "end_game_id": "7977568",
        "end_time": "2025-03-25T17:48:37.656000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977569",
              "crash_point": 26.62,
              "time": "2025-03-25T17:49:43.976000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977570",
        "start_time": "2025-03-25T17:49:56.004000+05:30",
        "end_game_id": "7977571",
        "end_time": "2025-03-25T17:50:15.846000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7977572",
              "crash_point": 17.51,
              "time": "2025-03-25T17:51:15.835000+05:30"
            },
            {
              "game_id": "7977573",
              "crash_point": 16.06,
              "time": "2025-03-25T17:52:13.801000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977642",
        "start_time": "2025-03-25T18:26:48.440000+05:30",
        "end_game_id": "7977643",
        "end_time": "2025-03-25T18:27:10.360000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977644",
              "crash_point": 30.16,
              "time": "2025-03-25T18:28:19.055000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977935",
        "start_time": "2025-03-25T20:39:58.117000+05:30",
        "end_game_id": "7977936",
        "end_time": "2025-03-25T20:40:31.600000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977937",
              "crash_point": 10.17,
              "time": "2025-03-25T20:41:21.757000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978024",
        "start_time": "2025-03-25T21:19:03.098000+05:30",
        "end_game_id": "7978025",
        "end_time": "2025-03-25T21:19:17.992000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978026",
              "crash_point": 11.25,
              "time": "2025-03-25T21:20:10.798000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978200",
        "start_time": "2025-03-25T22:43:51.453000+05:30",
        "end_game_id": "7978201",
        "end_time": "2025-03-25T22:44:05.436000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978202",
              "crash_point": 21.55,
              "time": "2025-03-25T22:45:08.763000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978383",
        "start_time": "2025-03-26T00:12:13.983000+05:30",
        "end_game_id": "7978384",
        "end_time": "2025-03-26T00:12:33.389000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978385",
              "crash_point": 12.5,
              "time": "2025-03-26T00:13:27.723000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978390",
        "start_time": "2025-03-26T00:16:07.624000+05:30",
        "end_game_id": "7978391",
        "end_time": "2025-03-26T00:16:27.281000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978392",
              "crash_point": 47.06,
              "time": "2025-03-26T00:17:43.688000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978712",
        "start_time": "2025-03-26T02:50:11.823000+05:30",
        "end_game_id": "7978713",
        "end_time": "2025-03-26T02:50:26.046000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978714",
              "crash_point": 15.1,
              "time": "2025-03-26T02:51:23.006000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978835",
        "start_time": "2025-03-26T03:47:42.448000+05:30",
        "end_game_id": "7978836",
        "end_time": "2025-03-26T03:47:58.598000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978837",
              "crash_point": 88.81,
              "time": "2025-03-26T03:49:25.002000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978878",
        "start_time": "2025-03-26T04:05:04.951000+05:30",
        "end_game_id": "7978879",
        "end_time": "2025-03-26T04:05:27.147000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978880",
              "crash_point": 12.64,
              "time": "2025-03-26T04:06:21.658000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978932",
        "start_time": "2025-03-26T04:31:40.936000+05:30",
        "end_game_id": "7978933",
        "end_time": "2025-03-26T04:32:01.810000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978934",
              "crash_point": 12.63,
              "time": "2025-03-26T04:32:56.162000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979185",
        "start_time": "2025-03-26T06:31:11.838000+05:30",
        "end_game_id": "7979186",
        "end_time": "2025-03-26T06:31:34.776000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979187",
              "crash_point": 31.19,
              "time": "2025-03-26T06:32:44.228000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979196",
        "start_time": "2025-03-26T06:37:37.749000+05:30",
        "end_game_id": "7979197",
        "end_time": "2025-03-26T06:38:15.606000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979198",
              "crash_point": 20.79,
              "time": "2025-03-26T06:39:17.909000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979306",
        "start_time": "2025-03-26T07:31:09.811000+05:30",
        "end_game_id": "7979307",
        "end_time": "2025-03-26T07:31:33.828000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979308",
              "crash_point": 13.64,
              "time": "2025-03-26T07:32:29.995000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979674",
        "start_time": "2025-03-26T10:15:45.349000+05:30",
        "end_game_id": "7979675",
        "end_time": "2025-03-26T10:15:57.919000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979676",
              "crash_point": 25.79,
              "time": "2025-03-26T10:17:03.974000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979753",
        "start_time": "2025-03-26T10:51:44.730000+05:30",
        "end_game_id": "7979754",
        "end_time": "2025-03-26T10:51:56.760000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979755",
              "crash_point": 61.23,
              "time": "2025-03-26T10:53:17.459000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979878",
        "start_time": "2025-03-26T11:54:26.592000+05:30",
        "end_game_id": "7979879",
        "end_time": "2025-03-26T11:54:51.374000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979880",
              "crash_point": 12.42,
              "time": "2025-03-26T11:55:44.982000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980121",
        "start_time": "2025-03-26T13:58:58.671000+05:30",
        "end_game_id": "7980122",
        "end_time": "2025-03-26T13:59:37.529000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980123",
              "crash_point": 12.28,
              "time": "2025-03-26T14:00:30.934000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980204",
        "start_time": "2025-03-26T14:44:36.020000+05:30",
        "end_game_id": "7980205",
        "end_time": "2025-03-26T14:45:12.278000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980206",
              "crash_point": 15.8,
              "time": "2025-03-26T14:46:09.946000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980439",
        "start_time": "2025-03-26T16:32:36.333000+05:30",
        "end_game_id": "7980440",
        "end_time": "2025-03-26T16:33:14.080000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980441",
              "crash_point": 11.19,
              "time": "2025-03-26T16:34:05.988000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980489",
        "start_time": "2025-03-26T16:57:30.078000+05:30",
        "end_game_id": "7980490",
        "end_time": "2025-03-26T16:58:00.248000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980491",
              "crash_point": 19.24,
              "time": "2025-03-26T16:59:01.017000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974442",
        "start_time": "2025-03-24T17:35:47.523000+05:30",
        "end_game_id": "7974442",
        "end_time": "2025-03-24T17:35:47.523000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974443",
              "crash_point": 54.08,
              "time": "2025-03-24T17:37:05.993000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7974717",
        "start_time": "2025-03-24T19:46:12.942000+05:30",
        "end_game_id": "7974717",
        "end_time": "2025-03-24T19:46:12.942000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7974718",
              "crash_point": 78.91,
              "time": "2025-03-24T19:47:37.232000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975180",
        "start_time": "2025-03-24T23:13:39.064000+05:30",
        "end_game_id": "7975180",
        "end_time": "2025-03-24T23:13:39.064000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975181",
              "crash_point": 12.91,
              "time": "2025-03-24T23:14:33.920000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975257",
        "start_time": "2025-03-24T23:51:20.005000+05:30",
        "end_game_id": "7975257",
        "end_time": "2025-03-24T23:51:20.005000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975258",
              "crash_point": 16.29,
              "time": "2025-03-24T23:52:18.065000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975316",
        "start_time": "2025-03-25T00:18:45.133000+05:30",
        "end_game_id": "7975316",
        "end_time": "2025-03-25T00:18:45.133000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975317",
              "crash_point": 21.6,
              "time": "2025-03-25T00:19:48.213000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975518",
        "start_time": "2025-03-25T01:48:45.841000+05:30",
        "end_game_id": "7975518",
        "end_time": "2025-03-25T01:48:45.841000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975519",
              "crash_point": 12.41,
              "time": "2025-03-25T01:49:39.844000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975603",
        "start_time": "2025-03-25T02:29:33.633000+05:30",
        "end_game_id": "7975603",
        "end_time": "2025-03-25T02:29:33.633000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975604",
              "crash_point": 23.83,
              "time": "2025-03-25T02:30:38.340000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975627",
        "start_time": "2025-03-25T02:40:34.726000+05:30",
        "end_game_id": "7975627",
        "end_time": "2025-03-25T02:40:34.726000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975628",
              "crash_point": 12.48,
              "time": "2025-03-25T02:41:28.791000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975642",
        "start_time": "2025-03-25T02:48:46.075000+05:30",
        "end_game_id": "7975642",
        "end_time": "2025-03-25T02:48:46.075000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7975643",
              "crash_point": 16.33,
              "time": "2025-03-25T02:49:44.182000+05:30"
            },
            {
              "game_id": "7975644",
              "crash_point": 42.42,
              "time": "2025-03-25T02:50:58.090000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975680",
        "start_time": "2025-03-25T03:09:24.690000+05:30",
        "end_game_id": "7975680",
        "end_time": "2025-03-25T03:09:24.690000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975681",
              "crash_point": 67.08,
              "time": "2025-03-25T03:10:46.580000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975748",
        "start_time": "2025-03-25T03:41:30.897000+05:30",
        "end_game_id": "7975748",
        "end_time": "2025-03-25T03:41:30.897000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975749",
              "crash_point": 13.61,
              "time": "2025-03-25T03:42:26.408000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975927",
        "start_time": "2025-03-25T05:03:43.484000+05:30",
        "end_game_id": "7975927",
        "end_time": "2025-03-25T05:03:43.484000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975928",
              "crash_point": 10.77,
              "time": "2025-03-25T05:04:35.420000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7975973",
        "start_time": "2025-03-25T05:23:31.208000+05:30",
        "end_game_id": "7975973",
        "end_time": "2025-03-25T05:23:31.208000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7975974",
              "crash_point": 63.67,
              "time": "2025-03-25T05:24:52.128000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976081",
        "start_time": "2025-03-25T06:15:18.017000+05:30",
        "end_game_id": "7976081",
        "end_time": "2025-03-25T06:15:18.017000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976082",
              "crash_point": 13.74,
              "time": "2025-03-25T06:16:13.066000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976121",
        "start_time": "2025-03-25T06:34:00.701000+05:30",
        "end_game_id": "7976121",
        "end_time": "2025-03-25T06:34:00.701000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976122",
              "crash_point": 12.11,
              "time": "2025-03-25T06:34:54.038000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976316",
        "start_time": "2025-03-25T08:08:11.189000+05:30",
        "end_game_id": "7976316",
        "end_time": "2025-03-25T08:08:11.189000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976317",
              "crash_point": 17.93,
              "time": "2025-03-25T08:09:11.286000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976388",
        "start_time": "2025-03-25T08:42:21.117000+05:30",
        "end_game_id": "7976388",
        "end_time": "2025-03-25T08:42:21.117000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976389",
              "crash_point": 18.15,
              "time": "2025-03-25T08:43:21.426000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976445",
        "start_time": "2025-03-25T09:13:30.668000+05:30",
        "end_game_id": "7976445",
        "end_time": "2025-03-25T09:13:30.668000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976446",
              "crash_point": 10.11,
              "time": "2025-03-25T09:14:21.699000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976447",
        "start_time": "2025-03-25T09:14:37.053000+05:30",
        "end_game_id": "7976447",
        "end_time": "2025-03-25T09:14:37.053000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976448",
              "crash_point": 16.65,
              "time": "2025-03-25T09:15:36.514000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976454",
        "start_time": "2025-03-25T09:19:16.335000+05:30",
        "end_game_id": "7976454",
        "end_time": "2025-03-25T09:19:16.335000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976455",
              "crash_point": 26.75,
              "time": "2025-03-25T09:20:23.497000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976561",
        "start_time": "2025-03-25T10:07:37.734000+05:30",
        "end_game_id": "7976561",
        "end_time": "2025-03-25T10:07:37.734000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976562",
              "crash_point": 10.3,
              "time": "2025-03-25T10:08:28.580000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976681",
        "start_time": "2025-03-25T11:05:11.714000+05:30",
        "end_game_id": "7976681",
        "end_time": "2025-03-25T11:05:11.714000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976682",
              "crash_point": 10.46,
              "time": "2025-03-25T11:06:02.991000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7976942",
        "start_time": "2025-03-25T13:02:57.722000+05:30",
        "end_game_id": "7976942",
        "end_time": "2025-03-25T13:02:57.722000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7976943",
              "crash_point": 11.61,
              "time": "2025-03-25T13:03:50.946000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977004",
        "start_time": "2025-03-25T13:32:37.840000+05:30",
        "end_game_id": "7977004",
        "end_time": "2025-03-25T13:32:37.840000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977005",
              "crash_point": 29.68,
              "time": "2025-03-25T13:33:46.633000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977111",
        "start_time": "2025-03-25T14:17:48.367000+05:30",
        "end_game_id": "7977111",
        "end_time": "2025-03-25T14:17:48.367000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977112",
              "crash_point": 11.81,
              "time": "2025-03-25T14:18:41.057000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977678",
        "start_time": "2025-03-25T18:43:24.620000+05:30",
        "end_game_id": "7977678",
        "end_time": "2025-03-25T18:43:24.620000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7977679",
              "crash_point": 19.42,
              "time": "2025-03-25T18:44:26.074000+05:30"
            },
            {
              "game_id": "7977680",
              "crash_point": 15.19,
              "time": "2025-03-25T18:45:22.854000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7977812",
        "start_time": "2025-03-25T19:43:02.480000+05:30",
        "end_game_id": "7977812",
        "end_time": "2025-03-25T19:43:02.480000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7977813",
              "crash_point": 12.7,
              "time": "2025-03-25T19:43:57.323000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978105",
        "start_time": "2025-03-25T21:58:02.434000+05:30",
        "end_game_id": "7978105",
        "end_time": "2025-03-25T21:58:02.434000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978106",
              "crash_point": 74.21,
              "time": "2025-03-25T21:59:25.554000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978187",
        "start_time": "2025-03-25T22:36:43.559000+05:30",
        "end_game_id": "7978187",
        "end_time": "2025-03-25T22:36:43.559000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978188",
              "crash_point": 162.74,
              "time": "2025-03-25T22:38:20.306000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978433",
        "start_time": "2025-03-26T00:38:11.709000+05:30",
        "end_game_id": "7978433",
        "end_time": "2025-03-26T00:38:11.709000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978434",
              "crash_point": 15.9,
              "time": "2025-03-26T00:39:09.921000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7978962",
        "start_time": "2025-03-26T04:45:22.606000+05:30",
        "end_game_id": "7978962",
        "end_time": "2025-03-26T04:45:22.606000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7978963",
              "crash_point": 17.85,
              "time": "2025-03-26T04:46:21.973000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979172",
        "start_time": "2025-03-26T06:22:46.903000+05:30",
        "end_game_id": "7979172",
        "end_time": "2025-03-26T06:22:46.903000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979173",
              "crash_point": 10.02,
              "time": "2025-03-26T06:23:37.367000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979188",
        "start_time": "2025-03-26T06:33:00.258000+05:30",
        "end_game_id": "7979188",
        "end_time": "2025-03-26T06:33:00.258000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979189",
              "crash_point": 18.23,
              "time": "2025-03-26T06:34:00.915000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979199",
        "start_time": "2025-03-26T06:39:40.762000+05:30",
        "end_game_id": "7979199",
        "end_time": "2025-03-26T06:39:40.762000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979200",
              "crash_point": 61.12,
              "time": "2025-03-26T06:41:01.972000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979640",
        "start_time": "2025-03-26T09:58:44.221000+05:30",
        "end_game_id": "7979640",
        "end_time": "2025-03-26T09:58:44.221000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979641",
              "crash_point": 34.44,
              "time": "2025-03-26T09:59:55.524000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979756",
        "start_time": "2025-03-26T10:53:45.588000+05:30",
        "end_game_id": "7979756",
        "end_time": "2025-03-26T10:53:45.588000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979757",
              "crash_point": 10.37,
              "time": "2025-03-26T10:54:36.051000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979758",
        "start_time": "2025-03-26T10:54:55.995000+05:30",
        "end_game_id": "7979758",
        "end_time": "2025-03-26T10:54:55.995000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979759",
              "crash_point": 261.35,
              "time": "2025-03-26T10:56:40.755000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979876",
        "start_time": "2025-03-26T11:53:15.308000+05:30",
        "end_game_id": "7979876",
        "end_time": "2025-03-26T11:53:15.308000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979877",
              "crash_point": 17.1,
              "time": "2025-03-26T11:54:14.338000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979881",
        "start_time": "2025-03-26T11:55:58.095000+05:30",
        "end_game_id": "7979881",
        "end_time": "2025-03-26T11:55:58.095000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979882",
              "crash_point": 45.25,
              "time": "2025-03-26T11:57:13.811000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979926",
        "start_time": "2025-03-26T12:20:10.011000+05:30",
        "end_game_id": "7979926",
        "end_time": "2025-03-26T12:20:10.011000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979927",
              "crash_point": 32.93,
              "time": "2025-03-26T12:21:20.030000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979928",
        "start_time": "2025-03-26T12:21:45.652000+05:30",
        "end_game_id": "7979928",
        "end_time": "2025-03-26T12:21:45.652000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979929",
              "crash_point": 11.67,
              "time": "2025-03-26T12:22:38.027000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979930",
        "start_time": "2025-03-26T12:22:59.062000+05:30",
        "end_game_id": "7979930",
        "end_time": "2025-03-26T12:22:59.062000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979931",
              "crash_point": 11.25,
              "time": "2025-03-26T12:23:51.928000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979932",
        "start_time": "2025-03-26T12:24:06.697000+05:30",
        "end_game_id": "7979932",
        "end_time": "2025-03-26T12:24:06.697000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979933",
              "crash_point": 56.9,
              "time": "2025-03-26T12:25:26.500000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7979987",
        "start_time": "2025-03-26T12:51:06.671000+05:30",
        "end_game_id": "7979987",
        "end_time": "2025-03-26T12:51:06.671000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979988",
              "crash_point": 51.05,
              "time": "2025-03-26T12:52:23.694000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980039",
        "start_time": "2025-03-26T13:18:18.465000+05:30",
        "end_game_id": "7980039",
        "end_time": "2025-03-26T13:18:18.465000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 5,
          "games": [
            {
              "game_id": "7980040",
              "crash_point": 10.8,
              "time": "2025-03-26T13:19:10.948000+05:30"
            },
            {
              "game_id": "7980041",
              "crash_point": 10.56,
              "time": "2025-03-26T13:20:01.846000+05:30"
            },
            {
              "game_id": "7980042",
              "crash_point": 11.61,
              "time": "2025-03-26T13:20:54.294000+05:30"
            },
            {
              "game_id": "7980043",
              "crash_point": 23.0,
              "time": "2025-03-26T13:21:58.167000+05:30"
            },
            {
              "game_id": "7980044",
              "crash_point": 17.32,
              "time": "2025-03-26T13:22:57.130000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980068",
        "start_time": "2025-03-26T13:32:46.933000+05:30",
        "end_game_id": "7980068",
        "end_time": "2025-03-26T13:32:46.933000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980069",
              "crash_point": 54.96,
              "time": "2025-03-26T13:34:06.451000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980381",
        "start_time": "2025-03-26T16:06:15.600000+05:30",
        "end_game_id": "7980381",
        "end_time": "2025-03-26T16:06:15.600000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980382",
              "crash_point": 11.42,
              "time": "2025-03-26T16:07:07.757000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980383",
        "start_time": "2025-03-26T16:07:23.332000+05:30",
        "end_game_id": "7980383",
        "end_time": "2025-03-26T16:07:23.332000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7980384",
              "crash_point": 46.35,
              "time": "2025-03-26T16:08:39.499000+05:30"
            },
            {
              "game_id": "7980385",
              "crash_point": 10.95,
              "time": "2025-03-26T16:09:30.789000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980386",
        "start_time": "2025-03-26T16:09:52.331000+05:30",
        "end_game_id": "7980386",
        "end_time": "2025-03-26T16:09:52.331000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980387",
              "crash_point": 12.13,
              "time": "2025-03-26T16:10:46.161000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "7980462",
        "start_time": "2025-03-26T16:44:38.258000+05:30",
        "end_game_id": "7980462",
        "end_time": "2025-03-26T16:44:38.258000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980463",
              "crash_point": 43.89,
              "time": "2025-03-26T16:45:52.841000+05:30"
            }
          ]
        }
      }
    ]
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 32316  100 32316    0     0   6456      0  0:00:05  0:00:05 --:--:--  6733
{
  "status": "success",
  "data": {
    "min_value": 10.0,
    "limit": 1000,
    "sort_by": "time",
    "count": 104,
    "series": [
      {
        "start_game_id": "7980533",
        "start_time": "2025-03-26T07:50:40.969000-04:00",
        "end_game_id": "7980541",
        "end_time": "2025-03-26T07:53:39.995000-04:00",
        "length": 9,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "7980523",
        "start_time": "2025-03-26T07:46:25.633000-04:00",
        "end_game_id": "7980531",
        "end_time": "2025-03-26T07:49:11.446000-04:00",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980532",
              "crash_point": 15.47,
              "time": "2025-03-26T07:50:08.438000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980518",
        "start_time": "2025-03-26T07:43:24.755000-04:00",
        "end_game_id": "7980521",
        "end_time": "2025-03-26T07:44:47.362000-04:00",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980522",
              "crash_point": 67.42,
              "time": "2025-03-26T07:46:08.991000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980513",
        "start_time": "2025-03-26T07:40:11.047000-04:00",
        "end_game_id": "7980515",
        "end_time": "2025-03-26T07:41:01.392000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7980516",
              "crash_point": 11.54,
              "time": "2025-03-26T07:41:54.163000-04:00"
            },
            {
              "game_id": "7980517",
              "crash_point": 15.58,
              "time": "2025-03-26T07:42:51.518000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980501",
        "start_time": "2025-03-26T07:34:10.122000-04:00",
        "end_game_id": "7980511",
        "end_time": "2025-03-26T07:38:26.675000-04:00",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980512",
              "crash_point": 94.85,
              "time": "2025-03-26T07:39:53.989000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980492",
        "start_time": "2025-03-26T07:29:31.866000-04:00",
        "end_game_id": "7980499",
        "end_time": "2025-03-26T07:32:07.550000-04:00",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980500",
              "crash_point": 44.13,
              "time": "2025-03-26T07:33:23.486000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980489",
        "start_time": "2025-03-26T07:27:30.078000-04:00",
        "end_game_id": "7980490",
        "end_time": "2025-03-26T07:28:00.248000-04:00",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980491",
              "crash_point": 19.24,
              "time": "2025-03-26T07:29:01.017000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980474",
        "start_time": "2025-03-26T07:21:26.986000-04:00",
        "end_game_id": "7980487",
        "end_time": "2025-03-26T07:26:12.218000-04:00",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980488",
              "crash_point": 18.78,
              "time": "2025-03-26T07:27:12.678000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980469",
        "start_time": "2025-03-26T07:18:45.828000-04:00",
        "end_game_id": "7980472",
        "end_time": "2025-03-26T07:19:44.332000-04:00",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980473",
              "crash_point": 74.67,
              "time": "2025-03-26T07:21:07.682000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980464",
        "start_time": "2025-03-26T07:16:13.754000-04:00",
        "end_game_id": "7980467",
        "end_time": "2025-03-26T07:17:29.400000-04:00",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980468",
              "crash_point": 11.01,
              "time": "2025-03-26T07:18:21.212000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980462",
        "start_time": "2025-03-26T07:14:38.258000-04:00",
        "end_game_id": "7980462",
        "end_time": "2025-03-26T07:14:38.258000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980463",
              "crash_point": 43.89,
              "time": "2025-03-26T07:15:52.841000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980458",
        "start_time": "2025-03-26T07:12:21.579000-04:00",
        "end_game_id": "7980460",
        "end_time": "2025-03-26T07:13:10.385000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980461",
              "crash_point": 16.06,
              "time": "2025-03-26T07:14:08.824000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980454",
        "start_time": "2025-03-26T07:10:03.339000-04:00",
        "end_game_id": "7980456",
        "end_time": "2025-03-26T07:10:44.940000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980457",
              "crash_point": 57.02,
              "time": "2025-03-26T07:12:04.378000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980442",
        "start_time": "2025-03-26T07:04:25.660000-04:00",
        "end_game_id": "7980452",
        "end_time": "2025-03-26T07:08:43.304000-04:00",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980453",
              "crash_point": 18.01,
              "time": "2025-03-26T07:09:43.834000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980439",
        "start_time": "2025-03-26T07:02:36.333000-04:00",
        "end_game_id": "7980440",
        "end_time": "2025-03-26T07:03:14.080000-04:00",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980441",
              "crash_point": 11.19,
              "time": "2025-03-26T07:04:05.988000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980400",
        "start_time": "2025-03-26T06:45:48.569000-04:00",
        "end_game_id": "7980437",
        "end_time": "2025-03-26T07:01:29.515000-04:00",
        "length": 38,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980438",
              "crash_point": 10.48,
              "time": "2025-03-26T07:02:21.585000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980388",
        "start_time": "2025-03-26T06:40:59.090000-04:00",
        "end_game_id": "7980398",
        "end_time": "2025-03-26T06:44:32.505000-04:00",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980399",
              "crash_point": 14.8,
              "time": "2025-03-26T06:45:29.255000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980386",
        "start_time": "2025-03-26T06:39:52.331000-04:00",
        "end_game_id": "7980386",
        "end_time": "2025-03-26T06:39:52.331000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980387",
              "crash_point": 12.13,
              "time": "2025-03-26T06:40:46.161000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980383",
        "start_time": "2025-03-26T06:37:23.332000-04:00",
        "end_game_id": "7980383",
        "end_time": "2025-03-26T06:37:23.332000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7980384",
              "crash_point": 46.35,
              "time": "2025-03-26T06:38:39.499000-04:00"
            },
            {
              "game_id": "7980385",
              "crash_point": 10.95,
              "time": "2025-03-26T06:39:30.789000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980381",
        "start_time": "2025-03-26T06:36:15.600000-04:00",
        "end_game_id": "7980381",
        "end_time": "2025-03-26T06:36:15.600000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980382",
              "crash_point": 11.42,
              "time": "2025-03-26T06:37:07.757000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980346",
        "start_time": "2025-03-26T06:21:26.892000-04:00",
        "end_game_id": "7980379",
        "end_time": "2025-03-26T06:34:27.759000-04:00",
        "length": 34,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980380",
              "crash_point": 59.44,
              "time": "2025-03-26T06:35:47.423000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980337",
        "start_time": "2025-03-26T06:16:21.787000-04:00",
        "end_game_id": "7980344",
        "end_time": "2025-03-26T06:19:31.890000-04:00",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980345",
              "crash_point": 34.0,
              "time": "2025-03-26T06:20:42.373000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980332",
        "start_time": "2025-03-26T06:12:57.076000-04:00",
        "end_game_id": "7980334",
        "end_time": "2025-03-26T06:13:51.463000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7980335",
              "crash_point": 11.5,
              "time": "2025-03-26T06:14:43.635000-04:00"
            },
            {
              "game_id": "7980336",
              "crash_point": 58.08,
              "time": "2025-03-26T06:16:02.687000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980316",
        "start_time": "2025-03-26T06:06:48.753000-04:00",
        "end_game_id": "7980330",
        "end_time": "2025-03-26T06:11:44.897000-04:00",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980331",
              "crash_point": 13.64,
              "time": "2025-03-26T06:12:40.964000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980293",
        "start_time": "2025-03-26T05:56:11.380000-04:00",
        "end_game_id": "7980313",
        "end_time": "2025-03-26T06:03:31.981000-04:00",
        "length": 21,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7980314",
              "crash_point": 25.22,
              "time": "2025-03-26T06:04:38.286000-04:00"
            },
            {
              "game_id": "7980315",
              "crash_point": 290.49,
              "time": "2025-03-26T06:06:24.350000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980285",
        "start_time": "2025-03-26T05:53:12.411000-04:00",
        "end_game_id": "7980291",
        "end_time": "2025-03-26T05:55:03.851000-04:00",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980292",
              "crash_point": 10.39,
              "time": "2025-03-26T05:55:55.700000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980267",
        "start_time": "2025-03-26T05:43:40.393000-04:00",
        "end_game_id": "7980283",
        "end_time": "2025-03-26T05:51:21.885000-04:00",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980284",
              "crash_point": 91.91,
              "time": "2025-03-26T05:52:49.796000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980252",
        "start_time": "2025-03-26T05:36:23.631000-04:00",
        "end_game_id": "7980265",
        "end_time": "2025-03-26T05:42:23.614000-04:00",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980266",
              "crash_point": 21.58,
              "time": "2025-03-26T05:43:26.277000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980237",
        "start_time": "2025-03-26T05:29:54.099000-04:00",
        "end_game_id": "7980250",
        "end_time": "2025-03-26T05:35:09.633000-04:00",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980251",
              "crash_point": 11.12,
              "time": "2025-03-26T05:36:02.757000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980211",
        "start_time": "2025-03-26T05:19:02.503000-04:00",
        "end_game_id": "7980235",
        "end_time": "2025-03-26T05:28:48.797000-04:00",
        "length": 25,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980236",
              "crash_point": 12.35,
              "time": "2025-03-26T05:29:42.373000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980207",
        "start_time": "2025-03-26T05:16:37.915000-04:00",
        "end_game_id": "7980209",
        "end_time": "2025-03-26T05:17:12.087000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980210",
              "crash_point": 127.3,
              "time": "2025-03-26T05:18:45.392000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980204",
        "start_time": "2025-03-26T05:14:36.020000-04:00",
        "end_game_id": "7980205",
        "end_time": "2025-03-26T05:15:12.278000-04:00",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980206",
              "crash_point": 15.8,
              "time": "2025-03-26T05:16:09.946000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980195",
        "start_time": "2025-03-26T05:10:22.243000-04:00",
        "end_game_id": "7980202",
        "end_time": "2025-03-26T05:13:25.727000-04:00",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980203",
              "crash_point": 13.07,
              "time": "2025-03-26T05:14:20.874000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980183",
        "start_time": "2025-03-26T05:04:25.194000-04:00",
        "end_game_id": "7980193",
        "end_time": "2025-03-26T05:08:58.049000-04:00",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980194",
              "crash_point": 16.79,
              "time": "2025-03-26T05:09:57.825000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980177",
        "start_time": "2025-03-26T05:00:23.351000-04:00",
        "end_game_id": "7980181",
        "end_time": "2025-03-26T05:01:53.815000-04:00",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980182",
              "crash_point": 450.29,
              "time": "2025-03-26T05:03:47.872000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980168",
        "start_time": "2025-03-26T04:56:01.163000-04:00",
        "end_game_id": "7980175",
        "end_time": "2025-03-26T04:58:42.708000-04:00",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980176",
              "crash_point": 34.28,
              "time": "2025-03-26T04:59:54.349000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980162",
        "start_time": "2025-03-26T04:51:47.443000-04:00",
        "end_game_id": "7980165",
        "end_time": "2025-03-26T04:53:01.400000-04:00",
        "length": 4,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7980166",
              "crash_point": 89.0,
              "time": "2025-03-26T04:54:29.114000-04:00"
            },
            {
              "game_id": "7980167",
              "crash_point": 38.47,
              "time": "2025-03-26T04:55:41.535000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980157",
        "start_time": "2025-03-26T04:48:52.748000-04:00",
        "end_game_id": "7980159",
        "end_time": "2025-03-26T04:49:18.769000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7980160",
              "crash_point": 22.23,
              "time": "2025-03-26T04:50:23.459000-04:00"
            },
            {
              "game_id": "7980161",
              "crash_point": 20.91,
              "time": "2025-03-26T04:51:25.612000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980150",
        "start_time": "2025-03-26T04:44:10.410000-04:00",
        "end_game_id": "7980155",
        "end_time": "2025-03-26T04:46:30.225000-04:00",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980156",
              "crash_point": 217.32,
              "time": "2025-03-26T04:48:11.542000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980140",
        "start_time": "2025-03-26T04:39:13.098000-04:00",
        "end_game_id": "7980148",
        "end_time": "2025-03-26T04:42:43.132000-04:00",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980149",
              "crash_point": 22.66,
              "time": "2025-03-26T04:43:47.684000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980134",
        "start_time": "2025-03-26T04:35:51.972000-04:00",
        "end_game_id": "7980138",
        "end_time": "2025-03-26T04:37:50.434000-04:00",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980139",
              "crash_point": 35.72,
              "time": "2025-03-26T04:39:01.567000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980124",
        "start_time": "2025-03-26T04:30:44.264000-04:00",
        "end_game_id": "7980132",
        "end_time": "2025-03-26T04:33:50.598000-04:00",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980133",
              "crash_point": 337.65,
              "time": "2025-03-26T04:35:39.335000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980121",
        "start_time": "2025-03-26T04:28:58.671000-04:00",
        "end_game_id": "7980122",
        "end_time": "2025-03-26T04:29:37.529000-04:00",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980123",
              "crash_point": 12.28,
              "time": "2025-03-26T04:30:30.934000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980096",
        "start_time": "2025-03-26T04:17:08.166000-04:00",
        "end_game_id": "7980118",
        "end_time": "2025-03-26T04:26:16.587000-04:00",
        "length": 23,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7980119",
              "crash_point": 15.97,
              "time": "2025-03-26T04:27:14.762000-04:00"
            },
            {
              "game_id": "7980120",
              "crash_point": 48.21,
              "time": "2025-03-26T04:28:30.881000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980081",
        "start_time": "2025-03-26T04:10:07.413000-04:00",
        "end_game_id": "7980094",
        "end_time": "2025-03-26T04:14:41.262000-04:00",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980095",
              "crash_point": 544.06,
              "time": "2025-03-26T04:16:38.943000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980070",
        "start_time": "2025-03-26T04:04:27.200000-04:00",
        "end_game_id": "7980079",
        "end_time": "2025-03-26T04:08:21.835000-04:00",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980080",
              "crash_point": 23.57,
              "time": "2025-03-26T04:09:26.652000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980068",
        "start_time": "2025-03-26T04:02:46.933000-04:00",
        "end_game_id": "7980068",
        "end_time": "2025-03-26T04:02:46.933000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980069",
              "crash_point": 54.96,
              "time": "2025-03-26T04:04:06.451000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980045",
        "start_time": "2025-03-26T03:53:10.062000-04:00",
        "end_game_id": "7980066",
        "end_time": "2025-03-26T04:01:34.463000-04:00",
        "length": 22,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980067",
              "crash_point": 15.74,
              "time": "2025-03-26T04:02:31.934000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980039",
        "start_time": "2025-03-26T03:48:18.465000-04:00",
        "end_game_id": "7980039",
        "end_time": "2025-03-26T03:48:18.465000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 5,
          "games": [
            {
              "game_id": "7980040",
              "crash_point": 10.8,
              "time": "2025-03-26T03:49:10.948000-04:00"
            },
            {
              "game_id": "7980041",
              "crash_point": 10.56,
              "time": "2025-03-26T03:50:01.846000-04:00"
            },
            {
              "game_id": "7980042",
              "crash_point": 11.61,
              "time": "2025-03-26T03:50:54.294000-04:00"
            },
            {
              "game_id": "7980043",
              "crash_point": 23.0,
              "time": "2025-03-26T03:51:58.167000-04:00"
            },
            {
              "game_id": "7980044",
              "crash_point": 17.32,
              "time": "2025-03-26T03:52:57.130000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980032",
        "start_time": "2025-03-26T03:45:08.789000-04:00",
        "end_game_id": "7980037",
        "end_time": "2025-03-26T03:46:55.156000-04:00",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980038",
              "crash_point": 18.8,
              "time": "2025-03-26T03:47:55.380000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980014",
        "start_time": "2025-03-26T03:35:21.892000-04:00",
        "end_game_id": "7980030",
        "end_time": "2025-03-26T03:42:42.621000-04:00",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980031",
              "crash_point": 609.9,
              "time": "2025-03-26T03:44:40.950000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7980004",
        "start_time": "2025-03-26T03:30:25.558000-04:00",
        "end_game_id": "7980012",
        "end_time": "2025-03-26T03:34:03.140000-04:00",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980013",
              "crash_point": 12.94,
              "time": "2025-03-26T03:34:57.540000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979989",
        "start_time": "2025-03-26T03:22:51.529000-04:00",
        "end_game_id": "7980002",
        "end_time": "2025-03-26T03:28:53.177000-04:00",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7980003",
              "crash_point": 13.34,
              "time": "2025-03-26T03:29:47.824000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979987",
        "start_time": "2025-03-26T03:21:06.671000-04:00",
        "end_game_id": "7979987",
        "end_time": "2025-03-26T03:21:06.671000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979988",
              "crash_point": 51.05,
              "time": "2025-03-26T03:22:23.694000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979982",
        "start_time": "2025-03-26T03:17:54.649000-04:00",
        "end_game_id": "7979985",
        "end_time": "2025-03-26T03:19:23.760000-04:00",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979986",
              "crash_point": 30.44,
              "time": "2025-03-26T03:20:32.811000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979975",
        "start_time": "2025-03-26T03:14:19.285000-04:00",
        "end_game_id": "7979980",
        "end_time": "2025-03-26T03:16:29.656000-04:00",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979981",
              "crash_point": 27.26,
              "time": "2025-03-26T03:17:36.228000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979970",
        "start_time": "2025-03-26T03:11:30.534000-04:00",
        "end_game_id": "7979973",
        "end_time": "2025-03-26T03:12:52.804000-04:00",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979974",
              "crash_point": 10.76,
              "time": "2025-03-26T03:13:44.007000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979961",
        "start_time": "2025-03-26T03:06:53.629000-04:00",
        "end_game_id": "7979968",
        "end_time": "2025-03-26T03:10:07.885000-04:00",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979969",
              "crash_point": 18.7,
              "time": "2025-03-26T03:11:08.234000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979945",
        "start_time": "2025-03-26T03:00:26.035000-04:00",
        "end_game_id": "7979959",
        "end_time": "2025-03-26T03:05:37.800000-04:00",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979960",
              "crash_point": 17.21,
              "time": "2025-03-26T03:06:38.428000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979934",
        "start_time": "2025-03-26T02:55:49.779000-04:00",
        "end_game_id": "7979943",
        "end_time": "2025-03-26T02:58:54.544000-04:00",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979944",
              "crash_point": 12.63,
              "time": "2025-03-26T02:59:49.322000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979932",
        "start_time": "2025-03-26T02:54:06.697000-04:00",
        "end_game_id": "7979932",
        "end_time": "2025-03-26T02:54:06.697000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979933",
              "crash_point": 56.9,
              "time": "2025-03-26T02:55:26.500000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979930",
        "start_time": "2025-03-26T02:52:59.062000-04:00",
        "end_game_id": "7979930",
        "end_time": "2025-03-26T02:52:59.062000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979931",
              "crash_point": 11.25,
              "time": "2025-03-26T02:53:51.928000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979928",
        "start_time": "2025-03-26T02:51:45.652000-04:00",
        "end_game_id": "7979928",
        "end_time": "2025-03-26T02:51:45.652000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979929",
              "crash_point": 11.67,
              "time": "2025-03-26T02:52:38.027000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979926",
        "start_time": "2025-03-26T02:50:10.011000-04:00",
        "end_game_id": "7979926",
        "end_time": "2025-03-26T02:50:10.011000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979927",
              "crash_point": 32.93,
              "time": "2025-03-26T02:51:20.030000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979921",
        "start_time": "2025-03-26T02:46:22.029000-04:00",
        "end_game_id": "7979923",
        "end_time": "2025-03-26T02:47:39.575000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7979924",
              "crash_point": 11.83,
              "time": "2025-03-26T02:48:32.329000-04:00"
            },
            {
              "game_id": "7979925",
              "crash_point": 31.18,
              "time": "2025-03-26T02:49:41.351000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979904",
        "start_time": "2025-03-26T02:38:45.042000-04:00",
        "end_game_id": "7979919",
        "end_time": "2025-03-26T02:44:47.515000-04:00",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979920",
              "crash_point": 27.41,
              "time": "2025-03-26T02:45:54.237000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979900",
        "start_time": "2025-03-26T02:35:42.953000-04:00",
        "end_game_id": "7979902",
        "end_time": "2025-03-26T02:36:38.843000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979903",
              "crash_point": 164.8,
              "time": "2025-03-26T02:38:15.498000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979883",
        "start_time": "2025-03-26T02:27:35.206000-04:00",
        "end_game_id": "7979898",
        "end_time": "2025-03-26T02:34:24.275000-04:00",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979899",
              "crash_point": 27.93,
              "time": "2025-03-26T02:35:31.312000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979881",
        "start_time": "2025-03-26T02:25:58.095000-04:00",
        "end_game_id": "7979881",
        "end_time": "2025-03-26T02:25:58.095000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979882",
              "crash_point": 45.25,
              "time": "2025-03-26T02:27:13.811000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979878",
        "start_time": "2025-03-26T02:24:26.592000-04:00",
        "end_game_id": "7979879",
        "end_time": "2025-03-26T02:24:51.374000-04:00",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979880",
              "crash_point": 12.42,
              "time": "2025-03-26T02:25:44.982000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979876",
        "start_time": "2025-03-26T02:23:15.308000-04:00",
        "end_game_id": "7979876",
        "end_time": "2025-03-26T02:23:15.308000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979877",
              "crash_point": 17.1,
              "time": "2025-03-26T02:24:14.338000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979869",
        "start_time": "2025-03-26T02:19:39.546000-04:00",
        "end_game_id": "7979874",
        "end_time": "2025-03-26T02:21:44.459000-04:00",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979875",
              "crash_point": 23.61,
              "time": "2025-03-26T02:22:48.767000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979855",
        "start_time": "2025-03-26T02:13:14.530000-04:00",
        "end_game_id": "7979867",
        "end_time": "2025-03-26T02:17:50.055000-04:00",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979868",
              "crash_point": 26.02,
              "time": "2025-03-26T02:18:57.296000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979813",
        "start_time": "2025-03-26T01:53:14.124000-04:00",
        "end_game_id": "7979853",
        "end_time": "2025-03-26T02:11:46.864000-04:00",
        "length": 41,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979854",
              "crash_point": 24.65,
              "time": "2025-03-26T02:12:52.019000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979809",
        "start_time": "2025-03-26T01:50:34.359000-04:00",
        "end_game_id": "7979811",
        "end_time": "2025-03-26T01:51:22.022000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979812",
              "crash_point": 183.62,
              "time": "2025-03-26T01:53:00.794000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979794",
        "start_time": "2025-03-26T01:44:02.425000-04:00",
        "end_game_id": "7979807",
        "end_time": "2025-03-26T01:48:51.351000-04:00",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979808",
              "crash_point": 19.4,
              "time": "2025-03-26T01:49:52.770000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979787",
        "start_time": "2025-03-26T01:41:00.057000-04:00",
        "end_game_id": "7979792",
        "end_time": "2025-03-26T01:42:26.426000-04:00",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979793",
              "crash_point": 32.67,
              "time": "2025-03-26T01:43:37.183000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979773",
        "start_time": "2025-03-26T01:34:10.701000-04:00",
        "end_game_id": "7979785",
        "end_time": "2025-03-26T01:38:58.875000-04:00",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979786",
              "crash_point": 251.5,
              "time": "2025-03-26T01:40:43.013000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979760",
        "start_time": "2025-03-26T01:27:19.558000-04:00",
        "end_game_id": "7979771",
        "end_time": "2025-03-26T01:32:39.400000-04:00",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979772",
              "crash_point": 48.24,
              "time": "2025-03-26T01:33:55.527000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979758",
        "start_time": "2025-03-26T01:24:55.995000-04:00",
        "end_game_id": "7979758",
        "end_time": "2025-03-26T01:24:55.995000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979759",
              "crash_point": 261.35,
              "time": "2025-03-26T01:26:40.755000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979756",
        "start_time": "2025-03-26T01:23:45.588000-04:00",
        "end_game_id": "7979756",
        "end_time": "2025-03-26T01:23:45.588000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979757",
              "crash_point": 10.37,
              "time": "2025-03-26T01:24:36.051000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979753",
        "start_time": "2025-03-26T01:21:44.730000-04:00",
        "end_game_id": "7979754",
        "end_time": "2025-03-26T01:21:56.760000-04:00",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979755",
              "crash_point": 61.23,
              "time": "2025-03-26T01:23:17.459000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979741",
        "start_time": "2025-03-26T01:16:43.772000-04:00",
        "end_game_id": "7979751",
        "end_time": "2025-03-26T01:20:10.532000-04:00",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979752",
              "crash_point": 34.84,
              "time": "2025-03-26T01:21:21.954000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979700",
        "start_time": "2025-03-26T00:59:58.313000-04:00",
        "end_game_id": "7979739",
        "end_time": "2025-03-26T01:15:08.535000-04:00",
        "length": 40,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979740",
              "crash_point": 10.53,
              "time": "2025-03-26T01:16:00.207000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979692",
        "start_time": "2025-03-26T00:55:50.605000-04:00",
        "end_game_id": "7979698",
        "end_time": "2025-03-26T00:58:24.956000-04:00",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979699",
              "crash_point": 12.97,
              "time": "2025-03-26T00:59:20.158000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979688",
        "start_time": "2025-03-26T00:54:00.591000-04:00",
        "end_game_id": "7979690",
        "end_time": "2025-03-26T00:54:36.652000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979691",
              "crash_point": 11.5,
              "time": "2025-03-26T00:55:29.872000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979684",
        "start_time": "2025-03-26T00:51:15.244000-04:00",
        "end_game_id": "7979686",
        "end_time": "2025-03-26T00:52:06.306000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979687",
              "crash_point": 75.01,
              "time": "2025-03-26T00:53:29.893000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979677",
        "start_time": "2025-03-26T00:47:52.404000-04:00",
        "end_game_id": "7979682",
        "end_time": "2025-03-26T00:49:50.346000-04:00",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979683",
              "crash_point": 10.28,
              "time": "2025-03-26T00:50:41.711000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979674",
        "start_time": "2025-03-26T00:45:45.349000-04:00",
        "end_game_id": "7979675",
        "end_time": "2025-03-26T00:45:57.919000-04:00",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979676",
              "crash_point": 25.79,
              "time": "2025-03-26T00:47:03.974000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979664",
        "start_time": "2025-03-26T00:40:45.062000-04:00",
        "end_game_id": "7979672",
        "end_time": "2025-03-26T00:43:49.579000-04:00",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979673",
              "crash_point": 63.93,
              "time": "2025-03-26T00:45:10.409000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979660",
        "start_time": "2025-03-26T00:38:37.396000-04:00",
        "end_game_id": "7979662",
        "end_time": "2025-03-26T00:39:23.045000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979663",
              "crash_point": 26.76,
              "time": "2025-03-26T00:40:30.516000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979642",
        "start_time": "2025-03-26T00:30:12.918000-04:00",
        "end_game_id": "7979658",
        "end_time": "2025-03-26T00:36:59.321000-04:00",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979659",
              "crash_point": 11.41,
              "time": "2025-03-26T00:37:52.148000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979640",
        "start_time": "2025-03-26T00:28:44.221000-04:00",
        "end_game_id": "7979640",
        "end_time": "2025-03-26T00:28:44.221000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979641",
              "crash_point": 34.44,
              "time": "2025-03-26T00:29:55.524000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979636",
        "start_time": "2025-03-26T00:26:08.423000-04:00",
        "end_game_id": "7979638",
        "end_time": "2025-03-26T00:26:58.379000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979639",
              "crash_point": 140.5,
              "time": "2025-03-26T00:28:32.131000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979625",
        "start_time": "2025-03-26T00:19:54.610000-04:00",
        "end_game_id": "7979633",
        "end_time": "2025-03-26T00:23:34.100000-04:00",
        "length": 9,
        "follow_streak": {
          "count": 2,
          "games": [
            {
              "game_id": "7979634",
              "crash_point": 10.81,
              "time": "2025-03-26T00:24:25.774000-04:00"
            },
            {
              "game_id": "7979635",
              "crash_point": 46.9,
              "time": "2025-03-26T00:25:41.648000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979611",
        "start_time": "2025-03-26T00:12:58.541000-04:00",
        "end_game_id": "7979623",
        "end_time": "2025-03-26T00:17:55.441000-04:00",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979624",
              "crash_point": 139.97,
              "time": "2025-03-26T00:19:29.377000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979594",
        "start_time": "2025-03-26T00:05:51.457000-04:00",
        "end_game_id": "7979609",
        "end_time": "2025-03-26T00:11:15.387000-04:00",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979610",
              "crash_point": 119.03,
              "time": "2025-03-26T00:12:46.595000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979590",
        "start_time": "2025-03-26T00:04:04.014000-04:00",
        "end_game_id": "7979592",
        "end_time": "2025-03-26T00:04:36.656000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979593",
              "crash_point": 12.8,
              "time": "2025-03-26T00:05:31.763000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979586",
        "start_time": "2025-03-26T00:02:02.242000-04:00",
        "end_game_id": "7979588",
        "end_time": "2025-03-26T00:02:49.562000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979589",
              "crash_point": 16.84,
              "time": "2025-03-26T00:03:48.946000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979582",
        "start_time": "2025-03-25T23:59:25.909000-04:00",
        "end_game_id": "7979584",
        "end_time": "2025-03-26T00:00:18.632000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979585",
              "crash_point": 39.79,
              "time": "2025-03-26T00:01:31.618000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979574",
        "start_time": "2025-03-25T23:55:47.760000-04:00",
        "end_game_id": "7979580",
        "end_time": "2025-03-25T23:58:07.033000-04:00",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979581",
              "crash_point": 18.58,
              "time": "2025-03-25T23:59:07.881000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979565",
        "start_time": "2025-03-25T23:51:44.349000-04:00",
        "end_game_id": "7979572",
        "end_time": "2025-03-25T23:54:21.357000-04:00",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979573",
              "crash_point": 13.22,
              "time": "2025-03-25T23:55:15.864000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979546",
        "start_time": "2025-03-25T23:45:01.447000-04:00",
        "end_game_id": "7979563",
        "end_time": "2025-03-25T23:50:32.171000-04:00",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979564",
              "crash_point": 15.57,
              "time": "2025-03-25T23:51:29.968000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "7979542",
        "start_time": "2025-03-25T23:42:44.306000-04:00",
        "end_game_id": "7979544",
        "end_time": "2025-03-25T23:43:30.710000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "7979545",
              "crash_point": 43.75,
              "time": "2025-03-25T23:44:45.201000-04:00"
            }
          ]
        }
      }
    ]
  }
}
```