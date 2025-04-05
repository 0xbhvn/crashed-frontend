# Get series

```bash
# Get series of games without crash points >= 10 in the last 1000 games
curl -X GET "http://localhost:8000/api/analytics/series/without-min-crash-point/10" | jq .

# Get series of games without crash points >= 10 in the last 2000 games, sorted by series length
curl -X GET "http://localhost:8000/api/analytics/series/without-min-crash-point/10?limit=2000&sort_by=length" | jq .

# Get series of games without crash points >= 10 in the last 24 hours
curl -X GET "http://localhost:8000/api/analytics/series/without-min-crash-point/10/time" | jq .

# Get series of games without crash points >= 10 in the last 48 hours, sorted by series length
curl -X GET "http://localhost:8000/api/analytics/series/without-min-crash-point/10/time?hours=48&sort_by=length" | jq .

# Get series with timezone conversion
curl -X GET "http://localhost:8000/api/analytics/series/without-min-crash-point/10" -H "X-Timezone: America/New_York" | jq .
          ]
        }
      },
      {
        "start_game_id": "8008424",
        "start_time": "2025-04-04T21:01:52.907000+05:30",
        "end_game_id": "8008442",
        "end_time": "2025-04-04T21:09:48.186000+05:30",
        "length": 19,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008442",
              "crash_point": 20.9,
              "time": "2025-04-04T21:09:48.186000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008625",
        "start_time": "2025-04-04T22:36:41.281000+05:30",
        "end_game_id": "8008643",
        "end_time": "2025-04-04T22:45:03.130000+05:30",
        "length": 19,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008643",
              "crash_point": 11.62,
              "time": "2025-04-04T22:45:03.130000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009192",
        "start_time": "2025-04-05T03:05:39.008000+05:30",
        "end_game_id": "8009210",
        "end_time": "2025-04-05T03:12:24.833000+05:30",
        "length": 19,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009210",
              "crash_point": 26.48,
              "time": "2025-04-05T03:12:24.833000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009584",
        "start_time": "2025-04-05T06:06:08.826000+05:30",
        "end_game_id": "8009602",
        "end_time": "2025-04-05T06:13:20.506000+05:30",
        "length": 19,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009602",
              "crash_point": 12.8,
              "time": "2025-04-05T06:13:20.506000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009986",
        "start_time": "2025-04-05T09:03:58.251000+05:30",
        "end_game_id": "8010004",
        "end_time": "2025-04-05T09:12:17.108000+05:30",
        "length": 19,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010004",
              "crash_point": 24.18,
              "time": "2025-04-05T09:12:17.108000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011893",
        "start_time": "2025-04-06T00:13:33.300000+05:30",
        "end_game_id": "8011911",
        "end_time": "2025-04-06T00:21:06.858000+05:30",
        "length": 19,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011911",
              "crash_point": 10.25,
              "time": "2025-04-06T00:21:06.858000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006858",
        "start_time": "2025-04-04T08:46:22.587000+05:30",
        "end_game_id": "8006875",
        "end_time": "2025-04-04T08:53:15.264000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006875",
              "crash_point": 19.19,
              "time": "2025-04-04T08:53:15.264000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007665",
        "start_time": "2025-04-04T15:05:23.935000+05:30",
        "end_game_id": "8007682",
        "end_time": "2025-04-04T15:12:24.725000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007682",
              "crash_point": 30.14,
              "time": "2025-04-04T15:12:24.725000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008547",
        "start_time": "2025-04-04T21:59:00.287000+05:30",
        "end_game_id": "8008564",
        "end_time": "2025-04-04T22:06:29.700000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008564",
              "crash_point": 43.43,
              "time": "2025-04-04T22:06:29.700000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009383",
        "start_time": "2025-04-05T04:31:18.887000+05:30",
        "end_game_id": "8009400",
        "end_time": "2025-04-05T04:38:45.498000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009400",
              "crash_point": 43.08,
              "time": "2025-04-05T04:38:45.498000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009773",
        "start_time": "2025-04-05T07:29:50.985000+05:30",
        "end_game_id": "8009790",
        "end_time": "2025-04-05T07:37:14.748000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009790",
              "crash_point": 10.92,
              "time": "2025-04-05T07:37:14.748000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010228",
        "start_time": "2025-04-05T10:58:02.627000+05:30",
        "end_game_id": "8010245",
        "end_time": "2025-04-05T11:06:43.543000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010245",
              "crash_point": 60.55,
              "time": "2025-04-05T11:06:43.543000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011068",
        "start_time": "2025-04-05T17:47:26.475000+05:30",
        "end_game_id": "8011085",
        "end_time": "2025-04-05T17:54:34.444000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011085",
              "crash_point": 21.57,
              "time": "2025-04-05T17:54:34.444000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011352",
        "start_time": "2025-04-05T19:55:24.778000+05:30",
        "end_game_id": "8011369",
        "end_time": "2025-04-05T20:03:52.440000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011369",
              "crash_point": 19.44,
              "time": "2025-04-05T20:03:52.440000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011743",
        "start_time": "2025-04-05T22:59:14.878000+05:30",
        "end_game_id": "8011760",
        "end_time": "2025-04-05T23:07:29.679000+05:30",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011760",
              "crash_point": 38.67,
              "time": "2025-04-05T23:07:29.679000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006950",
        "start_time": "2025-04-04T09:31:38.799000+05:30",
        "end_game_id": "8006966",
        "end_time": "2025-04-04T09:39:52.411000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006966",
              "crash_point": 59.35,
              "time": "2025-04-04T09:39:52.411000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007237",
        "start_time": "2025-04-04T11:47:13.579000+05:30",
        "end_game_id": "8007253",
        "end_time": "2025-04-04T11:56:32.423000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007253",
              "crash_point": 485.26,
              "time": "2025-04-04T11:56:32.423000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007398",
        "start_time": "2025-04-04T13:02:04.735000+05:30",
        "end_game_id": "8007414",
        "end_time": "2025-04-04T13:08:43.824000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007414",
              "crash_point": 11.42,
              "time": "2025-04-04T13:08:43.824000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007524",
        "start_time": "2025-04-04T13:59:23.269000+05:30",
        "end_game_id": "8007540",
        "end_time": "2025-04-04T14:06:51.415000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007540",
              "crash_point": 65.54,
              "time": "2025-04-04T14:06:51.415000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009609",
        "start_time": "2025-04-05T06:16:40.947000+05:30",
        "end_game_id": "8009625",
        "end_time": "2025-04-05T06:22:34.914000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009625",
              "crash_point": 20.5,
              "time": "2025-04-05T06:22:34.914000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009791",
        "start_time": "2025-04-05T07:37:26.832000+05:30",
        "end_game_id": "8009807",
        "end_time": "2025-04-05T07:44:05.398000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009807",
              "crash_point": 36.04,
              "time": "2025-04-05T07:44:05.398000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009833",
        "start_time": "2025-04-05T07:55:49.785000+05:30",
        "end_game_id": "8009849",
        "end_time": "2025-04-05T08:03:25.424000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009849",
              "crash_point": 13.12,
              "time": "2025-04-05T08:03:25.424000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010187",
        "start_time": "2025-04-05T10:40:04.623000+05:30",
        "end_game_id": "8010203",
        "end_time": "2025-04-05T10:46:18.218000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010203",
              "crash_point": 19.32,
              "time": "2025-04-05T10:46:18.218000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010265",
        "start_time": "2025-04-05T11:17:49.221000+05:30",
        "end_game_id": "8010281",
        "end_time": "2025-04-05T11:25:09.845000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010281",
              "crash_point": 13.68,
              "time": "2025-04-05T11:25:09.845000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010756",
        "start_time": "2025-04-05T15:14:45.636000+05:30",
        "end_game_id": "8010772",
        "end_time": "2025-04-05T15:22:03.878000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010772",
              "crash_point": 15.27,
              "time": "2025-04-05T15:22:03.878000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011051",
        "start_time": "2025-04-05T17:40:14.978000+05:30",
        "end_game_id": "8011067",
        "end_time": "2025-04-05T17:47:07.007000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011067",
              "crash_point": 15.06,
              "time": "2025-04-05T17:47:07.007000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012153",
        "start_time": "2025-04-06T02:20:24.993000+05:30",
        "end_game_id": "8012169",
        "end_time": "2025-04-06T02:26:28.238000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012169",
              "crash_point": 10.49,
              "time": "2025-04-06T02:26:28.238000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012170",
        "start_time": "2025-04-06T02:26:51.253000+05:30",
        "end_game_id": "8012186",
        "end_time": "2025-04-06T02:35:58.915000+05:30",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012186",
              "crash_point": 12.46,
              "time": "2025-04-06T02:35:58.915000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007717",
        "start_time": "2025-04-04T15:29:23.438000+05:30",
        "end_game_id": "8007732",
        "end_time": "2025-04-04T15:36:09.204000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007732",
              "crash_point": 12.62,
              "time": "2025-04-04T15:36:09.204000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008046",
        "start_time": "2025-04-04T18:07:47.995000+05:30",
        "end_game_id": "8008061",
        "end_time": "2025-04-04T18:13:53.868000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008061",
              "crash_point": 17.45,
              "time": "2025-04-04T18:13:53.868000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008183",
        "start_time": "2025-04-04T19:06:41.380000+05:30",
        "end_game_id": "8008198",
        "end_time": "2025-04-04T19:13:30.849000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008198",
              "crash_point": 14.0,
              "time": "2025-04-04T19:13:30.849000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008796",
        "start_time": "2025-04-05T00:01:33.908000+05:30",
        "end_game_id": "8008811",
        "end_time": "2025-04-05T00:08:05.356000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008811",
              "crash_point": 28.85,
              "time": "2025-04-05T00:08:05.356000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009040",
        "start_time": "2025-04-05T01:58:06.697000+05:30",
        "end_game_id": "8009055",
        "end_time": "2025-04-05T02:04:43.220000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009055",
              "crash_point": 11.38,
              "time": "2025-04-05T02:04:43.220000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009412",
        "start_time": "2025-04-05T04:45:21.082000+05:30",
        "end_game_id": "8009427",
        "end_time": "2025-04-05T04:51:20.610000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009427",
              "crash_point": 10.88,
              "time": "2025-04-05T04:51:20.610000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009678",
        "start_time": "2025-04-05T06:44:04.649000+05:30",
        "end_game_id": "8009693",
        "end_time": "2025-04-05T06:51:22.447000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009693",
              "crash_point": 490.15,
              "time": "2025-04-05T06:51:22.447000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010828",
        "start_time": "2025-04-05T15:47:35.631000+05:30",
        "end_game_id": "8010843",
        "end_time": "2025-04-05T15:54:22.584000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010843",
              "crash_point": 42.67,
              "time": "2025-04-05T15:54:22.584000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010876",
        "start_time": "2025-04-05T16:11:47.087000+05:30",
        "end_game_id": "8010891",
        "end_time": "2025-04-05T16:18:07.640000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010891",
              "crash_point": 19.1,
              "time": "2025-04-05T16:18:07.640000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010941",
        "start_time": "2025-04-05T16:44:44.169000+05:30",
        "end_game_id": "8010956",
        "end_time": "2025-04-05T16:53:10.448000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010956",
              "crash_point": 45.77,
              "time": "2025-04-05T16:53:10.448000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011026",
        "start_time": "2025-04-05T17:27:28.184000+05:30",
        "end_game_id": "8011041",
        "end_time": "2025-04-05T17:33:57.112000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011041",
              "crash_point": 11.07,
              "time": "2025-04-05T17:33:57.112000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011370",
        "start_time": "2025-04-05T20:04:11.700000+05:30",
        "end_game_id": "8011385",
        "end_time": "2025-04-05T20:10:43.856000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011385",
              "crash_point": 13.57,
              "time": "2025-04-05T20:10:43.856000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011955",
        "start_time": "2025-04-06T00:48:00.086000+05:30",
        "end_game_id": "8011970",
        "end_time": "2025-04-06T00:56:26.283000+05:30",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011970",
              "crash_point": 628.94,
              "time": "2025-04-06T00:56:26.283000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006538",
        "start_time": "2025-04-04T06:17:40.212000+05:30",
        "end_game_id": "8006552",
        "end_time": "2025-04-04T06:24:06.021000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006552",
              "crash_point": 60.1,
              "time": "2025-04-04T06:24:06.021000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006674",
        "start_time": "2025-04-04T07:21:01.191000+05:30",
        "end_game_id": "8006688",
        "end_time": "2025-04-04T07:27:30.551000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006688",
              "crash_point": 16.78,
              "time": "2025-04-04T07:27:30.551000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007044",
        "start_time": "2025-04-04T10:13:20.770000+05:30",
        "end_game_id": "8007058",
        "end_time": "2025-04-04T10:18:50.064000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007058",
              "crash_point": 12.12,
              "time": "2025-04-04T10:18:50.064000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007098",
        "start_time": "2025-04-04T10:38:06.013000+05:30",
        "end_game_id": "8007112",
        "end_time": "2025-04-04T10:44:10.748000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007112",
              "crash_point": 27.89,
              "time": "2025-04-04T10:44:10.748000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007688",
        "start_time": "2025-04-04T15:15:30.688000+05:30",
        "end_game_id": "8007702",
        "end_time": "2025-04-04T15:21:51.853000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007702",
              "crash_point": 80.42,
              "time": "2025-04-04T15:21:51.853000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007742",
        "start_time": "2025-04-04T15:40:42.466000+05:30",
        "end_game_id": "8007756",
        "end_time": "2025-04-04T15:46:11.276000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007756",
              "crash_point": 12.31,
              "time": "2025-04-04T15:46:11.276000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007758",
        "start_time": "2025-04-04T15:47:42.753000+05:30",
        "end_game_id": "8007772",
        "end_time": "2025-04-04T15:54:14.500000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007772",
              "crash_point": 38.94,
              "time": "2025-04-04T15:54:14.500000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007864",
        "start_time": "2025-04-04T16:33:32.537000+05:30",
        "end_game_id": "8007878",
        "end_time": "2025-04-04T16:41:03.485000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007878",
              "crash_point": 367.22,
              "time": "2025-04-04T16:41:03.485000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008648",
        "start_time": "2025-04-04T22:47:46.684000+05:30",
        "end_game_id": "8008662",
        "end_time": "2025-04-04T22:53:53.662000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008662",
              "crash_point": 13.51,
              "time": "2025-04-04T22:53:53.662000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010129",
        "start_time": "2025-04-05T10:10:03.309000+05:30",
        "end_game_id": "8010143",
        "end_time": "2025-04-05T10:16:29.182000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010143",
              "crash_point": 52.88,
              "time": "2025-04-05T10:16:29.182000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010246",
        "start_time": "2025-04-05T11:07:06.098000+05:30",
        "end_game_id": "8010260",
        "end_time": "2025-04-05T11:14:26.845000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010260",
              "crash_point": 13.26,
              "time": "2025-04-05T11:14:26.845000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010418",
        "start_time": "2025-04-05T12:31:52.412000+05:30",
        "end_game_id": "8010432",
        "end_time": "2025-04-05T12:37:41.232000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010432",
              "crash_point": 24.09,
              "time": "2025-04-05T12:37:41.232000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010663",
        "start_time": "2025-04-05T14:27:18.495000+05:30",
        "end_game_id": "8010677",
        "end_time": "2025-04-05T14:33:26.223000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010677",
              "crash_point": 121.47,
              "time": "2025-04-05T14:33:26.223000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010853",
        "start_time": "2025-04-05T15:59:40.854000+05:30",
        "end_game_id": "8010867",
        "end_time": "2025-04-05T16:05:11.603000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010867",
              "crash_point": 70.02,
              "time": "2025-04-05T16:05:11.603000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012138",
        "start_time": "2025-04-06T02:13:45.899000+05:30",
        "end_game_id": "8012152",
        "end_time": "2025-04-06T02:19:56.810000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012152",
              "crash_point": 88.23,
              "time": "2025-04-06T02:19:56.810000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012334",
        "start_time": "2025-04-06T03:44:07.831000+05:30",
        "end_game_id": "8012348",
        "end_time": "2025-04-06T03:50:27.602000+05:30",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012348",
              "crash_point": 22.38,
              "time": "2025-04-06T03:50:27.602000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006256",
        "start_time": "2025-04-04T03:57:19.052000+05:30",
        "end_game_id": "8006269",
        "end_time": "2025-04-04T04:03:33.217000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006269",
              "crash_point": 10.73,
              "time": "2025-04-04T04:03:33.217000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007113",
        "start_time": "2025-04-04T10:44:42.676000+05:30",
        "end_game_id": "8007126",
        "end_time": "2025-04-04T10:50:53.988000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007126",
              "crash_point": 210.61,
              "time": "2025-04-04T10:50:53.988000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007254",
        "start_time": "2025-04-04T11:56:58.575000+05:30",
        "end_game_id": "8007267",
        "end_time": "2025-04-04T12:02:10.558000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007267",
              "crash_point": 14.52,
              "time": "2025-04-04T12:02:10.558000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007269",
        "start_time": "2025-04-04T12:04:01.964000+05:30",
        "end_game_id": "8007282",
        "end_time": "2025-04-04T12:10:19.655000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007282",
              "crash_point": 20.01,
              "time": "2025-04-04T12:10:19.655000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008459",
        "start_time": "2025-04-04T21:19:44.204000+05:30",
        "end_game_id": "8008472",
        "end_time": "2025-04-04T21:25:21.047000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008472",
              "crash_point": 21.27,
              "time": "2025-04-04T21:25:21.047000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008753",
        "start_time": "2025-04-04T23:39:31.200000+05:30",
        "end_game_id": "8008766",
        "end_time": "2025-04-04T23:45:37.924000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008766",
              "crash_point": 18.52,
              "time": "2025-04-04T23:45:37.924000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008928",
        "start_time": "2025-04-05T00:59:22.300000+05:30",
        "end_game_id": "8008941",
        "end_time": "2025-04-05T01:05:14.181000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008941",
              "crash_point": 24.89,
              "time": "2025-04-05T01:05:14.181000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008951",
        "start_time": "2025-04-05T01:11:51.523000+05:30",
        "end_game_id": "8008964",
        "end_time": "2025-04-05T01:18:25.684000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008964",
              "crash_point": 27.64,
              "time": "2025-04-05T01:18:25.684000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009562",
        "start_time": "2025-04-05T05:56:52.511000+05:30",
        "end_game_id": "8009575",
        "end_time": "2025-04-05T06:02:12.672000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009575",
              "crash_point": 16.84,
              "time": "2025-04-05T06:02:12.672000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010404",
        "start_time": "2025-04-05T12:25:19.928000+05:30",
        "end_game_id": "8010417",
        "end_time": "2025-04-05T12:31:35.921000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010417",
              "crash_point": 46.01,
              "time": "2025-04-05T12:31:35.921000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010781",
        "start_time": "2025-04-05T15:25:29.103000+05:30",
        "end_game_id": "8010794",
        "end_time": "2025-04-05T15:30:39.027000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010794",
              "crash_point": 13.33,
              "time": "2025-04-05T15:30:39.027000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011234",
        "start_time": "2025-04-05T19:03:01.849000+05:30",
        "end_game_id": "8011247",
        "end_time": "2025-04-05T19:08:22.030000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011247",
              "crash_point": 12.48,
              "time": "2025-04-05T19:08:22.030000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011318",
        "start_time": "2025-04-05T19:37:25.250000+05:30",
        "end_game_id": "8011331",
        "end_time": "2025-04-05T19:44:55.089000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011331",
              "crash_point": 37.32,
              "time": "2025-04-05T19:44:55.089000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011650",
        "start_time": "2025-04-05T22:13:39.909000+05:30",
        "end_game_id": "8011663",
        "end_time": "2025-04-05T22:19:14.281000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011663",
              "crash_point": 51.42,
              "time": "2025-04-05T22:19:14.281000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011709",
        "start_time": "2025-04-05T22:39:39.031000+05:30",
        "end_game_id": "8011722",
        "end_time": "2025-04-05T22:46:35.130000+05:30",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011722",
              "crash_point": 12.37,
              "time": "2025-04-05T22:46:35.130000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006459",
        "start_time": "2025-04-04T05:35:57.040000+05:30",
        "end_game_id": "8006471",
        "end_time": "2025-04-04T05:42:22.195000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006471",
              "crash_point": 1393.98,
              "time": "2025-04-04T05:42:22.195000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006901",
        "start_time": "2025-04-04T09:06:21.748000+05:30",
        "end_game_id": "8006913",
        "end_time": "2025-04-04T09:11:38.465000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006913",
              "crash_point": 22.59,
              "time": "2025-04-04T09:11:38.465000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006914",
        "start_time": "2025-04-04T09:12:07.723000+05:30",
        "end_game_id": "8006926",
        "end_time": "2025-04-04T09:18:00.338000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006926",
              "crash_point": 53.62,
              "time": "2025-04-04T09:18:00.338000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007069",
        "start_time": "2025-04-04T10:23:39.982000+05:30",
        "end_game_id": "8007081",
        "end_time": "2025-04-04T10:30:18.862000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007081",
              "crash_point": 193.02,
              "time": "2025-04-04T10:30:18.862000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007198",
        "start_time": "2025-04-04T11:25:28.684000+05:30",
        "end_game_id": "8007210",
        "end_time": "2025-04-04T11:31:10.584000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007210",
              "crash_point": 34.41,
              "time": "2025-04-04T11:31:10.584000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008004",
        "start_time": "2025-04-04T17:46:10.440000+05:30",
        "end_game_id": "8008016",
        "end_time": "2025-04-04T17:51:37.331000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008016",
              "crash_point": 10.25,
              "time": "2025-04-04T17:51:37.331000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008170",
        "start_time": "2025-04-04T19:01:06.900000+05:30",
        "end_game_id": "8008182",
        "end_time": "2025-04-04T19:06:23.732000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008182",
              "crash_point": 35.73,
              "time": "2025-04-04T19:06:23.732000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008569",
        "start_time": "2025-04-04T22:09:08.427000+05:30",
        "end_game_id": "8008581",
        "end_time": "2025-04-04T22:14:27.529000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008581",
              "crash_point": 26.29,
              "time": "2025-04-04T22:14:27.529000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008686",
        "start_time": "2025-04-04T23:05:55.111000+05:30",
        "end_game_id": "8008698",
        "end_time": "2025-04-04T23:11:04.315000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008698",
              "crash_point": 95.6,
              "time": "2025-04-04T23:11:04.315000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008714",
        "start_time": "2025-04-04T23:19:39.318000+05:30",
        "end_game_id": "8008726",
        "end_time": "2025-04-04T23:25:32.416000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008726",
              "crash_point": 46.1,
              "time": "2025-04-04T23:25:32.416000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008727",
        "start_time": "2025-04-04T23:26:14.179000+05:30",
        "end_game_id": "8008739",
        "end_time": "2025-04-04T23:31:21.464000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008739",
              "crash_point": 17.11,
              "time": "2025-04-04T23:31:21.464000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008991",
        "start_time": "2025-04-05T01:32:46.536000+05:30",
        "end_game_id": "8009003",
        "end_time": "2025-04-05T01:38:49.189000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009003",
              "crash_point": 14.76,
              "time": "2025-04-05T01:38:49.189000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009809",
        "start_time": "2025-04-05T07:45:17.661000+05:30",
        "end_game_id": "8009821",
        "end_time": "2025-04-05T07:49:59.163000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009821",
              "crash_point": 31.39,
              "time": "2025-04-05T07:49:59.163000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009973",
        "start_time": "2025-04-05T08:58:23.572000+05:30",
        "end_game_id": "8009985",
        "end_time": "2025-04-05T09:03:30.719000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009985",
              "crash_point": 19.33,
              "time": "2025-04-05T09:03:30.719000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010359",
        "start_time": "2025-04-05T12:02:10.956000+05:30",
        "end_game_id": "8010371",
        "end_time": "2025-04-05T12:08:13.873000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010371",
              "crash_point": 21.97,
              "time": "2025-04-05T12:08:13.873000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010433",
        "start_time": "2025-04-05T12:38:08.053000+05:30",
        "end_game_id": "8010445",
        "end_time": "2025-04-05T12:43:27.140000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010445",
              "crash_point": 12.5,
              "time": "2025-04-05T12:43:27.140000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010481",
        "start_time": "2025-04-05T13:01:00.213000+05:30",
        "end_game_id": "8010493",
        "end_time": "2025-04-05T13:06:09.445000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010493",
              "crash_point": 13.32,
              "time": "2025-04-05T13:06:09.445000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010678",
        "start_time": "2025-04-05T14:33:40.961000+05:30",
        "end_game_id": "8010690",
        "end_time": "2025-04-05T14:38:54.035000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010690",
              "crash_point": 104.17,
              "time": "2025-04-05T14:38:54.035000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011086",
        "start_time": "2025-04-05T17:55:07.972000+05:30",
        "end_game_id": "8011098",
        "end_time": "2025-04-05T18:00:57.270000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011098",
              "crash_point": 10.04,
              "time": "2025-04-05T18:00:57.270000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011211",
        "start_time": "2025-04-05T18:51:13.285000+05:30",
        "end_game_id": "8011223",
        "end_time": "2025-04-05T18:57:19.654000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011223",
              "crash_point": 39.58,
              "time": "2025-04-05T18:57:19.654000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011528",
        "start_time": "2025-04-05T21:15:54.664000+05:30",
        "end_game_id": "8011540",
        "end_time": "2025-04-05T21:21:13.587000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011540",
              "crash_point": 33.79,
              "time": "2025-04-05T21:21:13.587000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011768",
        "start_time": "2025-04-05T23:12:37.810000+05:30",
        "end_game_id": "8011780",
        "end_time": "2025-04-05T23:18:40.593000+05:30",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011780",
              "crash_point": 11.01,
              "time": "2025-04-05T23:18:40.593000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006304",
        "start_time": "2025-04-04T04:22:35.236000+05:30",
        "end_game_id": "8006315",
        "end_time": "2025-04-04T04:28:04.004000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006315",
              "crash_point": 16.43,
              "time": "2025-04-04T04:28:04.004000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006489",
        "start_time": "2025-04-04T05:53:40.958000+05:30",
        "end_game_id": "8006500",
        "end_time": "2025-04-04T06:00:04.306000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006500",
              "crash_point": 25.64,
              "time": "2025-04-04T06:00:04.306000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006846",
        "start_time": "2025-04-04T08:40:39.135000+05:30",
        "end_game_id": "8006857",
        "end_time": "2025-04-04T08:45:53.304000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006857",
              "crash_point": 16.79,
              "time": "2025-04-04T08:45:53.304000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007465",
        "start_time": "2025-04-04T13:33:45.766000+05:30",
        "end_game_id": "8007476",
        "end_time": "2025-04-04T13:39:24.355000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007476",
              "crash_point": 17.58,
              "time": "2025-04-04T13:39:24.355000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008203",
        "start_time": "2025-04-04T19:16:15.334000+05:30",
        "end_game_id": "8008214",
        "end_time": "2025-04-04T19:19:46.324000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008214",
              "crash_point": 10.48,
              "time": "2025-04-04T19:19:46.324000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008305",
        "start_time": "2025-04-04T20:06:19.930000+05:30",
        "end_game_id": "8008316",
        "end_time": "2025-04-04T20:11:24.082000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008316",
              "crash_point": 18.2,
              "time": "2025-04-04T20:11:24.082000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008582",
        "start_time": "2025-04-04T22:14:52.007000+05:30",
        "end_game_id": "8008593",
        "end_time": "2025-04-04T22:20:01.648000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008593",
              "crash_point": 74.48,
              "time": "2025-04-04T22:20:01.648000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009056",
        "start_time": "2025-04-05T02:05:00.603000+05:30",
        "end_game_id": "8009067",
        "end_time": "2025-04-05T02:10:29.602000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009067",
              "crash_point": 10.2,
              "time": "2025-04-05T02:10:29.602000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009217",
        "start_time": "2025-04-05T03:16:53.705000+05:30",
        "end_game_id": "8009228",
        "end_time": "2025-04-05T03:22:01.964000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009228",
              "crash_point": 58.34,
              "time": "2025-04-05T03:22:01.964000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009666",
        "start_time": "2025-04-05T06:39:15.752000+05:30",
        "end_game_id": "8009677",
        "end_time": "2025-04-05T06:43:34.176000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009677",
              "crash_point": 12.83,
              "time": "2025-04-05T06:43:34.176000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009741",
        "start_time": "2025-04-05T07:15:57.922000+05:30",
        "end_game_id": "8009752",
        "end_time": "2025-04-05T07:21:03.487000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009752",
              "crash_point": 30.93,
              "time": "2025-04-05T07:21:03.487000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010816",
        "start_time": "2025-04-05T15:40:50.433000+05:30",
        "end_game_id": "8010827",
        "end_time": "2025-04-05T15:47:11.342000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010827",
              "crash_point": 11.98,
              "time": "2025-04-05T15:47:11.342000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011427",
        "start_time": "2025-04-05T20:28:37.737000+05:30",
        "end_game_id": "8011438",
        "end_time": "2025-04-05T20:33:01.531000+05:30",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011438",
              "crash_point": 22.18,
              "time": "2025-04-05T20:33:01.531000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006385",
        "start_time": "2025-04-04T04:59:58.169000+05:30",
        "end_game_id": "8006395",
        "end_time": "2025-04-04T05:04:09.624000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006395",
              "crash_point": 11.67,
              "time": "2025-04-04T05:04:09.624000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006429",
        "start_time": "2025-04-04T05:20:15.061000+05:30",
        "end_game_id": "8006439",
        "end_time": "2025-04-04T05:25:18.550000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006439",
              "crash_point": 75.62,
              "time": "2025-04-04T05:25:18.550000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006569",
        "start_time": "2025-04-04T06:31:52.048000+05:30",
        "end_game_id": "8006579",
        "end_time": "2025-04-04T06:36:07.492000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006579",
              "crash_point": 69.79,
              "time": "2025-04-04T06:36:07.492000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006650",
        "start_time": "2025-04-04T07:08:31.123000+05:30",
        "end_game_id": "8006660",
        "end_time": "2025-04-04T07:13:00.488000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006660",
              "crash_point": 124.48,
              "time": "2025-04-04T07:13:00.488000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006876",
        "start_time": "2025-04-04T08:53:30.366000+05:30",
        "end_game_id": "8006886",
        "end_time": "2025-04-04T08:58:58.930000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006886",
              "crash_point": 17.16,
              "time": "2025-04-04T08:58:58.930000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007082",
        "start_time": "2025-04-04T10:30:30.668000+05:30",
        "end_game_id": "8007092",
        "end_time": "2025-04-04T10:35:02.789000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007092",
              "crash_point": 85.65,
              "time": "2025-04-04T10:35:02.789000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007141",
        "start_time": "2025-04-04T10:59:11.017000+05:30",
        "end_game_id": "8007151",
        "end_time": "2025-04-04T11:03:27.819000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007151",
              "crash_point": 30.21,
              "time": "2025-04-04T11:03:27.819000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008216",
        "start_time": "2025-04-04T19:21:22.955000+05:30",
        "end_game_id": "8008226",
        "end_time": "2025-04-04T19:26:29.176000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008226",
              "crash_point": 44.19,
              "time": "2025-04-04T19:26:29.176000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008284",
        "start_time": "2025-04-04T19:56:04.510000+05:30",
        "end_game_id": "8008294",
        "end_time": "2025-04-04T20:00:37.235000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008294",
              "crash_point": 18.15,
              "time": "2025-04-04T20:00:37.235000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009103",
        "start_time": "2025-04-05T02:27:26.384000+05:30",
        "end_game_id": "8009113",
        "end_time": "2025-04-05T02:30:58.446000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009113",
              "crash_point": 10.06,
              "time": "2025-04-05T02:30:58.446000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009247",
        "start_time": "2025-04-05T03:31:56.394000+05:30",
        "end_game_id": "8009257",
        "end_time": "2025-04-05T03:36:17.910000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009257",
              "crash_point": 15.02,
              "time": "2025-04-05T03:36:17.910000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009401",
        "start_time": "2025-04-05T04:38:59.820000+05:30",
        "end_game_id": "8009411",
        "end_time": "2025-04-05T04:44:41.587000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009411",
              "crash_point": 14.44,
              "time": "2025-04-05T04:44:41.587000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009428",
        "start_time": "2025-04-05T04:51:39.868000+05:30",
        "end_game_id": "8009438",
        "end_time": "2025-04-05T04:56:03.206000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009438",
              "crash_point": 10.56,
              "time": "2025-04-05T04:56:03.206000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009822",
        "start_time": "2025-04-05T07:50:13.777000+05:30",
        "end_game_id": "8009832",
        "end_time": "2025-04-05T07:55:07.513000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009832",
              "crash_point": 16.47,
              "time": "2025-04-05T07:55:07.513000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009876",
        "start_time": "2025-04-05T08:14:47.758000+05:30",
        "end_game_id": "8009886",
        "end_time": "2025-04-05T08:19:08.022000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009886",
              "crash_point": 13.25,
              "time": "2025-04-05T08:19:08.022000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009887",
        "start_time": "2025-04-05T08:19:26.361000+05:30",
        "end_game_id": "8009897",
        "end_time": "2025-04-05T08:23:44.804000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009897",
              "crash_point": 14.3,
              "time": "2025-04-05T08:23:44.804000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010204",
        "start_time": "2025-04-05T10:46:42.754000+05:30",
        "end_game_id": "8010214",
        "end_time": "2025-04-05T10:51:38.930000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010214",
              "crash_point": 21.31,
              "time": "2025-04-05T10:51:38.930000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010570",
        "start_time": "2025-04-05T13:44:01.228000+05:30",
        "end_game_id": "8010580",
        "end_time": "2025-04-05T13:48:48.500000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010580",
              "crash_point": 246.15,
              "time": "2025-04-05T13:48:48.500000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010805",
        "start_time": "2025-04-05T15:36:05.538000+05:30",
        "end_game_id": "8010815",
        "end_time": "2025-04-05T15:40:27.859000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010815",
              "crash_point": 10.22,
              "time": "2025-04-05T15:40:27.859000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011101",
        "start_time": "2025-04-05T18:02:55.436000+05:30",
        "end_game_id": "8011111",
        "end_time": "2025-04-05T18:07:58.591000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011111",
              "crash_point": 20.43,
              "time": "2025-04-05T18:07:58.591000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011470",
        "start_time": "2025-04-05T20:48:58.138000+05:30",
        "end_game_id": "8011480",
        "end_time": "2025-04-05T20:53:49.006000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011480",
              "crash_point": 12.52,
              "time": "2025-04-05T20:53:49.006000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011813",
        "start_time": "2025-04-05T23:33:25.182000+05:30",
        "end_game_id": "8011823",
        "end_time": "2025-04-05T23:37:33.954000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011823",
              "crash_point": 13.34,
              "time": "2025-04-05T23:37:33.954000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011928",
        "start_time": "2025-04-06T00:32:11.541000+05:30",
        "end_game_id": "8011938",
        "end_time": "2025-04-06T00:37:42.837000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011938",
              "crash_point": 3970.14,
              "time": "2025-04-06T00:37:42.837000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011971",
        "start_time": "2025-04-06T00:56:45.712000+05:30",
        "end_game_id": "8011981",
        "end_time": "2025-04-06T01:00:45.453000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011981",
              "crash_point": 12.28,
              "time": "2025-04-06T01:00:45.453000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012044",
        "start_time": "2025-04-06T01:31:55.126000+05:30",
        "end_game_id": "8012054",
        "end_time": "2025-04-06T01:37:37.085000+05:30",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012054",
              "crash_point": 110.32,
              "time": "2025-04-06T01:37:37.085000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006294",
        "start_time": "2025-04-04T04:18:28.009000+05:30",
        "end_game_id": "8006303",
        "end_time": "2025-04-04T04:22:19.783000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006303",
              "crash_point": 10.82,
              "time": "2025-04-04T04:22:19.783000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007059",
        "start_time": "2025-04-04T10:19:02.753000+05:30",
        "end_game_id": "8007068",
        "end_time": "2025-04-04T10:23:27.361000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007068",
              "crash_point": 11.56,
              "time": "2025-04-04T10:23:27.361000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007569",
        "start_time": "2025-04-04T14:18:46.513000+05:30",
        "end_game_id": "8007578",
        "end_time": "2025-04-04T14:23:13.038000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007578",
              "crash_point": 20.35,
              "time": "2025-04-04T14:23:13.038000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007773",
        "start_time": "2025-04-04T15:54:26.500000+05:30",
        "end_game_id": "8007782",
        "end_time": "2025-04-04T15:59:14.149000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007782",
              "crash_point": 17.65,
              "time": "2025-04-04T15:59:14.149000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007901",
        "start_time": "2025-04-04T16:51:43.979000+05:30",
        "end_game_id": "8007910",
        "end_time": "2025-04-04T16:55:20.215000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007910",
              "crash_point": 12.55,
              "time": "2025-04-04T16:55:20.215000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008239",
        "start_time": "2025-04-04T19:34:05.823000+05:30",
        "end_game_id": "8008248",
        "end_time": "2025-04-04T19:40:13.047000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008248",
              "crash_point": 2015.54,
              "time": "2025-04-04T19:40:13.047000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008699",
        "start_time": "2025-04-04T23:11:30.699000+05:30",
        "end_game_id": "8008708",
        "end_time": "2025-04-04T23:15:28.374000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008708",
              "crash_point": 13.83,
              "time": "2025-04-04T23:15:28.374000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008812",
        "start_time": "2025-04-05T00:08:17.636000+05:30",
        "end_game_id": "8008821",
        "end_time": "2025-04-05T00:12:42.006000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008821",
              "crash_point": 15.4,
              "time": "2025-04-05T00:12:42.006000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008851",
        "start_time": "2025-04-05T00:25:52.563000+05:30",
        "end_game_id": "8008860",
        "end_time": "2025-04-05T00:29:02.576000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008860",
              "crash_point": 11.29,
              "time": "2025-04-05T00:29:02.576000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008981",
        "start_time": "2025-04-05T01:28:00.724000+05:30",
        "end_game_id": "8008990",
        "end_time": "2025-04-05T01:32:04.941000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008990",
              "crash_point": 14.32,
              "time": "2025-04-05T01:32:04.941000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009068",
        "start_time": "2025-04-05T02:10:42.849000+05:30",
        "end_game_id": "8009077",
        "end_time": "2025-04-05T02:15:37.740000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009077",
              "crash_point": 16.93,
              "time": "2025-04-05T02:15:37.740000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010113",
        "start_time": "2025-04-05T10:01:44.489000+05:30",
        "end_game_id": "8010122",
        "end_time": "2025-04-05T10:06:23.205000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010122",
              "crash_point": 77.93,
              "time": "2025-04-05T10:06:23.205000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010218",
        "start_time": "2025-04-05T10:53:42.619000+05:30",
        "end_game_id": "8010227",
        "end_time": "2025-04-05T10:57:49.702000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010227",
              "crash_point": 10.0,
              "time": "2025-04-05T10:57:49.702000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010294",
        "start_time": "2025-04-05T11:31:58.419000+05:30",
        "end_game_id": "8010303",
        "end_time": "2025-04-05T11:35:43.817000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010303",
              "crash_point": 11.98,
              "time": "2025-04-05T11:35:43.817000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010306",
        "start_time": "2025-04-05T11:37:21.450000+05:30",
        "end_game_id": "8010315",
        "end_time": "2025-04-05T11:41:50.914000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010315",
              "crash_point": 167.25,
              "time": "2025-04-05T11:41:50.914000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010470",
        "start_time": "2025-04-05T12:54:48.586000+05:30",
        "end_game_id": "8010479",
        "end_time": "2025-04-05T12:59:46.509000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010479",
              "crash_point": 11.73,
              "time": "2025-04-05T12:59:46.509000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010698",
        "start_time": "2025-04-05T14:42:45.982000+05:30",
        "end_game_id": "8010707",
        "end_time": "2025-04-05T14:47:08.880000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010707",
              "crash_point": 26.35,
              "time": "2025-04-05T14:47:08.880000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010795",
        "start_time": "2025-04-05T15:30:55.092000+05:30",
        "end_game_id": "8010804",
        "end_time": "2025-04-05T15:35:50.113000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010804",
              "crash_point": 69.64,
              "time": "2025-04-05T15:35:50.113000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010924",
        "start_time": "2025-04-05T16:33:58.506000+05:30",
        "end_game_id": "8010933",
        "end_time": "2025-04-05T16:38:40.925000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010933",
              "crash_point": 13.94,
              "time": "2025-04-05T16:38:40.925000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011112",
        "start_time": "2025-04-05T18:08:12.139000+05:30",
        "end_game_id": "8011121",
        "end_time": "2025-04-05T18:12:24.556000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011121",
              "crash_point": 19.53,
              "time": "2025-04-05T18:12:24.556000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011133",
        "start_time": "2025-04-05T18:18:24.507000+05:30",
        "end_game_id": "8011142",
        "end_time": "2025-04-05T18:23:12.854000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011142",
              "crash_point": 38.18,
              "time": "2025-04-05T18:23:12.854000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011224",
        "start_time": "2025-04-05T18:57:50.409000+05:30",
        "end_game_id": "8011233",
        "end_time": "2025-04-05T19:02:46.220000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011233",
              "crash_point": 19.52,
              "time": "2025-04-05T19:02:46.220000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011669",
        "start_time": "2025-04-05T22:22:36.939000+05:30",
        "end_game_id": "8011678",
        "end_time": "2025-04-05T22:26:46.825000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011678",
              "crash_point": 11.11,
              "time": "2025-04-05T22:26:46.825000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012196",
        "start_time": "2025-04-06T02:41:26.124000+05:30",
        "end_game_id": "8012205",
        "end_time": "2025-04-06T02:46:25.480000+05:30",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012205",
              "crash_point": 24.39,
              "time": "2025-04-06T02:46:25.480000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006282",
        "start_time": "2025-04-04T04:11:53.890000+05:30",
        "end_game_id": "8006290",
        "end_time": "2025-04-04T04:15:44.362000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006290",
              "crash_point": 20.29,
              "time": "2025-04-04T04:15:44.362000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006748",
        "start_time": "2025-04-04T07:54:25.636000+05:30",
        "end_game_id": "8006756",
        "end_time": "2025-04-04T07:59:32.782000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006756",
              "crash_point": 505.14,
              "time": "2025-04-04T07:59:32.782000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006887",
        "start_time": "2025-04-04T08:59:36.842000+05:30",
        "end_game_id": "8006895",
        "end_time": "2025-04-04T09:03:39.115000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006895",
              "crash_point": 27.69,
              "time": "2025-04-04T09:03:39.115000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007035",
        "start_time": "2025-04-04T10:08:47.316000+05:30",
        "end_game_id": "8007043",
        "end_time": "2025-04-04T10:13:03.380000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007043",
              "crash_point": 33.28,
              "time": "2025-04-04T10:13:03.380000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007417",
        "start_time": "2025-04-04T13:11:08.593000+05:30",
        "end_game_id": "8007425",
        "end_time": "2025-04-04T13:16:35.386000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007425",
              "crash_point": 12.34,
              "time": "2025-04-04T13:16:35.386000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007426",
        "start_time": "2025-04-04T13:16:58.453000+05:30",
        "end_game_id": "8007434",
        "end_time": "2025-04-04T13:21:08.762000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007434",
              "crash_point": 15.76,
              "time": "2025-04-04T13:21:08.762000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007479",
        "start_time": "2025-04-04T13:40:55.194000+05:30",
        "end_game_id": "8007487",
        "end_time": "2025-04-04T13:44:28.703000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007487",
              "crash_point": 27.92,
              "time": "2025-04-04T13:44:28.703000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007649",
        "start_time": "2025-04-04T14:57:32.840000+05:30",
        "end_game_id": "8007657",
        "end_time": "2025-04-04T15:01:39.671000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007657",
              "crash_point": 50.17,
              "time": "2025-04-04T15:01:39.671000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007733",
        "start_time": "2025-04-04T15:36:25.036000+05:30",
        "end_game_id": "8007741",
        "end_time": "2025-04-04T15:40:27.292000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007741",
              "crash_point": 13.88,
              "time": "2025-04-04T15:40:27.292000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008020",
        "start_time": "2025-04-04T17:55:01.368000+05:30",
        "end_game_id": "8008028",
        "end_time": "2025-04-04T17:58:16.805000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008028",
              "crash_point": 18.61,
              "time": "2025-04-04T17:58:16.805000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008355",
        "start_time": "2025-04-04T20:29:05.706000+05:30",
        "end_game_id": "8008363",
        "end_time": "2025-04-04T20:33:25.049000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008363",
              "crash_point": 49.28,
              "time": "2025-04-04T20:33:25.049000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008767",
        "start_time": "2025-04-04T23:46:05.076000+05:30",
        "end_game_id": "8008775",
        "end_time": "2025-04-04T23:50:46.493000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008775",
              "crash_point": 120.54,
              "time": "2025-04-04T23:50:46.493000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009078",
        "start_time": "2025-04-05T02:16:04.868000+05:30",
        "end_game_id": "8009086",
        "end_time": "2025-04-05T02:19:23.056000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009086",
              "crash_point": 12.66,
              "time": "2025-04-05T02:19:23.056000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009149",
        "start_time": "2025-04-05T02:47:20.531000+05:30",
        "end_game_id": "8009157",
        "end_time": "2025-04-05T02:51:23.409000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009157",
              "crash_point": 14.16,
              "time": "2025-04-05T02:51:23.409000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010103",
        "start_time": "2025-04-05T09:56:32.422000+05:30",
        "end_game_id": "8010111",
        "end_time": "2025-04-05T10:00:17.402000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010111",
              "crash_point": 10.0,
              "time": "2025-04-05T10:00:17.402000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010168",
        "start_time": "2025-04-05T10:29:21.663000+05:30",
        "end_game_id": "8010176",
        "end_time": "2025-04-05T10:32:33.057000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010176",
              "crash_point": 25.44,
              "time": "2025-04-05T10:32:33.057000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010350",
        "start_time": "2025-04-05T11:57:33.270000+05:30",
        "end_game_id": "8010358",
        "end_time": "2025-04-05T12:01:55.095000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010358",
              "crash_point": 40.04,
              "time": "2025-04-05T12:01:55.095000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010494",
        "start_time": "2025-04-05T13:06:23.642000+05:30",
        "end_game_id": "8010502",
        "end_time": "2025-04-05T13:09:46.297000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010502",
              "crash_point": 19.9,
              "time": "2025-04-05T13:09:46.297000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010547",
        "start_time": "2025-04-05T13:29:58.114000+05:30",
        "end_game_id": "8010555",
        "end_time": "2025-04-05T13:34:29.188000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010555",
              "crash_point": 19.88,
              "time": "2025-04-05T13:34:29.188000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010726",
        "start_time": "2025-04-05T14:56:34.333000+05:30",
        "end_game_id": "8010734",
        "end_time": "2025-04-05T15:00:17.932000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010734",
              "crash_point": 10.52,
              "time": "2025-04-05T15:00:17.932000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011042",
        "start_time": "2025-04-05T17:34:40.753000+05:30",
        "end_game_id": "8011050",
        "end_time": "2025-04-05T17:39:43.829000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011050",
              "crash_point": 38.34,
              "time": "2025-04-05T17:39:43.829000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011122",
        "start_time": "2025-04-05T18:12:59.138000+05:30",
        "end_game_id": "8011130",
        "end_time": "2025-04-05T18:16:11.545000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011130",
              "crash_point": 16.13,
              "time": "2025-04-05T18:16:11.545000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011289",
        "start_time": "2025-04-05T19:25:39.360000+05:30",
        "end_game_id": "8011297",
        "end_time": "2025-04-05T19:29:24.419000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011297",
              "crash_point": 31.73,
              "time": "2025-04-05T19:29:24.419000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011511",
        "start_time": "2025-04-05T21:06:55.547000+05:30",
        "end_game_id": "8011519",
        "end_time": "2025-04-05T21:11:46.181000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011519",
              "crash_point": 34.14,
              "time": "2025-04-05T21:11:46.181000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011825",
        "start_time": "2025-04-05T23:39:11.229000+05:30",
        "end_game_id": "8011833",
        "end_time": "2025-04-05T23:43:39.835000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011833",
              "crash_point": 326.82,
              "time": "2025-04-05T23:43:39.835000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011846",
        "start_time": "2025-04-05T23:52:38.163000+05:30",
        "end_game_id": "8011854",
        "end_time": "2025-04-05T23:56:39.862000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011854",
              "crash_point": 19.04,
              "time": "2025-04-05T23:56:39.862000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012129",
        "start_time": "2025-04-06T02:09:38.492000+05:30",
        "end_game_id": "8012137",
        "end_time": "2025-04-06T02:13:23.690000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012137",
              "crash_point": 51.16,
              "time": "2025-04-06T02:13:23.690000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012317",
        "start_time": "2025-04-06T03:36:59.012000+05:30",
        "end_game_id": "8012325",
        "end_time": "2025-04-06T03:40:08.152000+05:30",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012325",
              "crash_point": 15.58,
              "time": "2025-04-06T03:40:08.152000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006248",
        "start_time": "2025-04-04T03:52:38.013000+05:30",
        "end_game_id": "8006255",
        "end_time": "2025-04-04T03:57:05.898000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006255",
              "crash_point": 46.32,
              "time": "2025-04-04T03:57:05.898000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006377",
        "start_time": "2025-04-04T04:56:50.107000+05:30",
        "end_game_id": "8006384",
        "end_time": "2025-04-04T04:59:42.942000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006384",
              "crash_point": 11.69,
              "time": "2025-04-04T04:59:42.942000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006553",
        "start_time": "2025-04-04T06:24:18.583000+05:30",
        "end_game_id": "8006560",
        "end_time": "2025-04-04T06:27:08.809000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006560",
              "crash_point": 52.98,
              "time": "2025-04-04T06:27:08.809000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006934",
        "start_time": "2025-04-04T09:24:03.474000+05:30",
        "end_game_id": "8006941",
        "end_time": "2025-04-04T09:27:50.533000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006941",
              "crash_point": 99.68,
              "time": "2025-04-04T09:27:50.533000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006942",
        "start_time": "2025-04-04T09:28:11.279000+05:30",
        "end_game_id": "8006949",
        "end_time": "2025-04-04T09:31:19.946000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006949",
              "crash_point": 11.71,
              "time": "2025-04-04T09:31:19.946000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007129",
        "start_time": "2025-04-04T10:52:48.150000+05:30",
        "end_game_id": "8007136",
        "end_time": "2025-04-04T10:56:38.447000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007136",
              "crash_point": 38.27,
              "time": "2025-04-04T10:56:38.447000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007153",
        "start_time": "2025-04-04T11:04:43.771000+05:30",
        "end_game_id": "8007160",
        "end_time": "2025-04-04T11:08:58.303000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007160",
              "crash_point": 43.63,
              "time": "2025-04-04T11:08:58.303000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007229",
        "start_time": "2025-04-04T11:43:27.020000+05:30",
        "end_game_id": "8007236",
        "end_time": "2025-04-04T11:46:52.846000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007236",
              "crash_point": 19.42,
              "time": "2025-04-04T11:46:52.846000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007709",
        "start_time": "2025-04-04T15:25:42.679000+05:30",
        "end_game_id": "8007716",
        "end_time": "2025-04-04T15:29:11.795000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007716",
              "crash_point": 10.98,
              "time": "2025-04-04T15:29:11.795000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008123",
        "start_time": "2025-04-04T18:39:21.349000+05:30",
        "end_game_id": "8008130",
        "end_time": "2025-04-04T18:42:48.169000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008130",
              "crash_point": 20.8,
              "time": "2025-04-04T18:42:48.169000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008256",
        "start_time": "2025-04-04T19:43:39.802000+05:30",
        "end_game_id": "8008263",
        "end_time": "2025-04-04T19:47:11.920000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008263",
              "crash_point": 29.96,
              "time": "2025-04-04T19:47:11.920000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008295",
        "start_time": "2025-04-04T20:00:52.047000+05:30",
        "end_game_id": "8008302",
        "end_time": "2025-04-04T20:04:08.977000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008302",
              "crash_point": 11.17,
              "time": "2025-04-04T20:04:08.977000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009087",
        "start_time": "2025-04-05T02:19:59.137000+05:30",
        "end_game_id": "8009094",
        "end_time": "2025-04-05T02:23:53.854000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009094",
              "crash_point": 12.49,
              "time": "2025-04-05T02:23:53.854000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009095",
        "start_time": "2025-04-05T02:24:33.463000+05:30",
        "end_game_id": "8009102",
        "end_time": "2025-04-05T02:27:10.012000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009102",
              "crash_point": 14.29,
              "time": "2025-04-05T02:27:10.012000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009239",
        "start_time": "2025-04-05T03:28:01.245000+05:30",
        "end_game_id": "8009246",
        "end_time": "2025-04-05T03:31:43.389000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009246",
              "crash_point": 10.28,
              "time": "2025-04-05T03:31:43.389000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009576",
        "start_time": "2025-04-05T06:02:39.663000+05:30",
        "end_game_id": "8009583",
        "end_time": "2025-04-05T06:05:39.274000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009583",
              "crash_point": 15.65,
              "time": "2025-04-05T06:05:39.274000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009705",
        "start_time": "2025-04-05T06:57:41.323000+05:30",
        "end_game_id": "8009712",
        "end_time": "2025-04-05T07:01:13.608000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009712",
              "crash_point": 13.81,
              "time": "2025-04-05T07:01:13.608000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009726",
        "start_time": "2025-04-05T07:08:18.415000+05:30",
        "end_game_id": "8009733",
        "end_time": "2025-04-05T07:11:20.443000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009733",
              "crash_point": 19.88,
              "time": "2025-04-05T07:11:20.443000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010711",
        "start_time": "2025-04-05T14:49:40.113000+05:30",
        "end_game_id": "8010718",
        "end_time": "2025-04-05T14:53:19.366000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010718",
              "crash_point": 34.23,
              "time": "2025-04-05T14:53:19.366000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010773",
        "start_time": "2025-04-05T15:22:17.046000+05:30",
        "end_game_id": "8010780",
        "end_time": "2025-04-05T15:25:08.525000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010780",
              "crash_point": 21.66,
              "time": "2025-04-05T15:25:08.525000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011332",
        "start_time": "2025-04-05T19:45:10.433000+05:30",
        "end_game_id": "8011339",
        "end_time": "2025-04-05T19:48:03.549000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011339",
              "crash_point": 15.92,
              "time": "2025-04-05T19:48:03.549000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011340",
        "start_time": "2025-04-05T19:48:29.406000+05:30",
        "end_game_id": "8011347",
        "end_time": "2025-04-05T19:52:36.961000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011347",
              "crash_point": 18.67,
              "time": "2025-04-05T19:52:36.961000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011735",
        "start_time": "2025-04-05T22:55:09.426000+05:30",
        "end_game_id": "8011742",
        "end_time": "2025-04-05T22:58:55.833000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011742",
              "crash_point": 26.48,
              "time": "2025-04-05T22:58:55.833000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011993",
        "start_time": "2025-04-06T01:08:14.315000+05:30",
        "end_game_id": "8012000",
        "end_time": "2025-04-06T01:11:49.828000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012000",
              "crash_point": 103.17,
              "time": "2025-04-06T01:11:49.828000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012187",
        "start_time": "2025-04-06T02:36:23.824000+05:30",
        "end_game_id": "8012194",
        "end_time": "2025-04-06T02:39:51.187000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012194",
              "crash_point": 22.64,
              "time": "2025-04-06T02:39:51.187000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012326",
        "start_time": "2025-04-06T03:40:21.478000+05:30",
        "end_game_id": "8012333",
        "end_time": "2025-04-06T03:43:40.472000+05:30",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012333",
              "crash_point": 26.01,
              "time": "2025-04-06T03:43:40.472000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006345",
        "start_time": "2025-04-04T04:41:37.552000+05:30",
        "end_game_id": "8006351",
        "end_time": "2025-04-04T04:44:38.508000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006351",
              "crash_point": 22.56,
              "time": "2025-04-04T04:44:38.508000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006440",
        "start_time": "2025-04-04T05:25:44.273000+05:30",
        "end_game_id": "8006446",
        "end_time": "2025-04-04T05:28:22.780000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006446",
              "crash_point": 12.2,
              "time": "2025-04-04T05:28:22.780000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006667",
        "start_time": "2025-04-04T07:17:48.224000+05:30",
        "end_game_id": "8006673",
        "end_time": "2025-04-04T07:20:43.475000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006673",
              "crash_point": 11.3,
              "time": "2025-04-04T07:20:43.475000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007222",
        "start_time": "2025-04-04T11:40:06.317000+05:30",
        "end_game_id": "8007228",
        "end_time": "2025-04-04T11:43:13.732000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007228",
              "crash_point": 12.19,
              "time": "2025-04-04T11:43:13.732000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007632",
        "start_time": "2025-04-04T14:48:17.427000+05:30",
        "end_game_id": "8007638",
        "end_time": "2025-04-04T14:50:26.050000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007638",
              "crash_point": 12.74,
              "time": "2025-04-04T14:50:26.050000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007658",
        "start_time": "2025-04-04T15:01:53.051000+05:30",
        "end_game_id": "8007664",
        "end_time": "2025-04-04T15:04:51.692000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007664",
              "crash_point": 14.85,
              "time": "2025-04-04T15:04:51.692000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007931",
        "start_time": "2025-04-04T17:09:12.597000+05:30",
        "end_game_id": "8007937",
        "end_time": "2025-04-04T17:12:55.992000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007937",
              "crash_point": 51.94,
              "time": "2025-04-04T17:12:55.992000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007965",
        "start_time": "2025-04-04T17:27:48.773000+05:30",
        "end_game_id": "8007971",
        "end_time": "2025-04-04T17:30:38.160000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007971",
              "crash_point": 13.46,
              "time": "2025-04-04T17:30:38.160000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007994",
        "start_time": "2025-04-04T17:40:54.955000+05:30",
        "end_game_id": "8008000",
        "end_time": "2025-04-04T17:44:09.195000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008000",
              "crash_point": 197.68,
              "time": "2025-04-04T17:44:09.195000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008249",
        "start_time": "2025-04-04T19:40:25.343000+05:30",
        "end_game_id": "8008255",
        "end_time": "2025-04-04T19:43:26.290000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008255",
              "crash_point": 38.78,
              "time": "2025-04-04T19:43:26.290000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008344",
        "start_time": "2025-04-04T20:23:04.860000+05:30",
        "end_game_id": "8008350",
        "end_time": "2025-04-04T20:26:29.315000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008350",
              "crash_point": 53.31,
              "time": "2025-04-04T20:26:29.315000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008782",
        "start_time": "2025-04-04T23:55:23.338000+05:30",
        "end_game_id": "8008788",
        "end_time": "2025-04-04T23:58:31.767000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008788",
              "crash_point": 26.2,
              "time": "2025-04-04T23:58:31.767000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008789",
        "start_time": "2025-04-04T23:58:44.447000+05:30",
        "end_game_id": "8008795",
        "end_time": "2025-04-05T00:01:19.146000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008795",
              "crash_point": 26.07,
              "time": "2025-04-05T00:01:19.146000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008943",
        "start_time": "2025-04-05T01:06:38.695000+05:30",
        "end_game_id": "8008949",
        "end_time": "2025-04-05T01:10:34.475000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008949",
              "crash_point": 86.1,
              "time": "2025-04-05T01:10:34.475000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008973",
        "start_time": "2025-04-05T01:23:49.191000+05:30",
        "end_game_id": "8008979",
        "end_time": "2025-04-05T01:26:41.890000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008979",
              "crash_point": 13.46,
              "time": "2025-04-05T01:26:41.890000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009460",
        "start_time": "2025-04-05T05:10:17.124000+05:30",
        "end_game_id": "8009466",
        "end_time": "2025-04-05T05:12:33.806000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009466",
              "crash_point": 13.47,
              "time": "2025-04-05T05:12:33.806000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009719",
        "start_time": "2025-04-05T07:05:01.722000+05:30",
        "end_game_id": "8009725",
        "end_time": "2025-04-05T07:08:00.339000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009725",
              "crash_point": 42.39,
              "time": "2025-04-05T07:08:00.339000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009734",
        "start_time": "2025-04-05T07:11:33.126000+05:30",
        "end_game_id": "8009740",
        "end_time": "2025-04-05T07:15:34.963000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009740",
              "crash_point": 18.73,
              "time": "2025-04-05T07:15:34.963000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009966",
        "start_time": "2025-04-05T08:55:03.372000+05:30",
        "end_game_id": "8009972",
        "end_time": "2025-04-05T08:58:03.687000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009972",
              "crash_point": 20.95,
              "time": "2025-04-05T08:58:03.687000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010563",
        "start_time": "2025-04-05T13:40:53.401000+05:30",
        "end_game_id": "8010569",
        "end_time": "2025-04-05T13:43:43.421000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010569",
              "crash_point": 14.75,
              "time": "2025-04-05T13:43:43.421000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010691",
        "start_time": "2025-04-05T14:39:28.693000+05:30",
        "end_game_id": "8010697",
        "end_time": "2025-04-05T14:42:13.346000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010697",
              "crash_point": 39.91,
              "time": "2025-04-05T14:42:13.346000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010719",
        "start_time": "2025-04-05T14:53:31.275000+05:30",
        "end_game_id": "8010725",
        "end_time": "2025-04-05T14:56:18.862000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010725",
              "crash_point": 19.13,
              "time": "2025-04-05T14:56:18.862000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010736",
        "start_time": "2025-04-05T15:01:45.746000+05:30",
        "end_game_id": "8010742",
        "end_time": "2025-04-05T15:05:28.759000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010742",
              "crash_point": 18.92,
              "time": "2025-04-05T15:05:28.759000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011461",
        "start_time": "2025-04-05T20:43:31.912000+05:30",
        "end_game_id": "8011467",
        "end_time": "2025-04-05T20:46:56.043000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011467",
              "crash_point": 19.73,
              "time": "2025-04-05T20:46:56.043000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011728",
        "start_time": "2025-04-05T22:51:20.351000+05:30",
        "end_game_id": "8011734",
        "end_time": "2025-04-05T22:54:47.713000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011734",
              "crash_point": 476.12,
              "time": "2025-04-05T22:54:47.713000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011939",
        "start_time": "2025-04-06T00:37:55.450000+05:30",
        "end_game_id": "8011945",
        "end_time": "2025-04-06T00:41:47.691000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011945",
              "crash_point": 81.5,
              "time": "2025-04-06T00:41:47.691000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011948",
        "start_time": "2025-04-06T00:44:06.387000+05:30",
        "end_game_id": "8011954",
        "end_time": "2025-04-06T00:47:46.202000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011954",
              "crash_point": 66.41,
              "time": "2025-04-06T00:47:46.202000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011985",
        "start_time": "2025-04-06T01:02:54.576000+05:30",
        "end_game_id": "8011991",
        "end_time": "2025-04-06T01:06:53.691000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011991",
              "crash_point": 33.73,
              "time": "2025-04-06T01:06:53.691000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012007",
        "start_time": "2025-04-06T01:16:22.591000+05:30",
        "end_game_id": "8012013",
        "end_time": "2025-04-06T01:19:49.732000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012013",
              "crash_point": 10.69,
              "time": "2025-04-06T01:19:49.732000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012037",
        "start_time": "2025-04-06T01:28:53.088000+05:30",
        "end_game_id": "8012043",
        "end_time": "2025-04-06T01:31:25.902000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012043",
              "crash_point": 20.58,
              "time": "2025-04-06T01:31:25.902000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012122",
        "start_time": "2025-04-06T02:06:17.155000+05:30",
        "end_game_id": "8012128",
        "end_time": "2025-04-06T02:09:02.532000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012128",
              "crash_point": 12.04,
              "time": "2025-04-06T02:09:02.532000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012310",
        "start_time": "2025-04-06T03:34:04.566000+05:30",
        "end_game_id": "8012316",
        "end_time": "2025-04-06T03:36:46.340000+05:30",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012316",
              "crash_point": 17.23,
              "time": "2025-04-06T03:36:46.340000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006270",
        "start_time": "2025-04-04T04:04:17.512000+05:30",
        "end_game_id": "8006275",
        "end_time": "2025-04-04T04:06:32.362000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006275",
              "crash_point": 45.16,
              "time": "2025-04-04T04:06:32.362000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006480",
        "start_time": "2025-04-04T05:48:16.975000+05:30",
        "end_game_id": "8006485",
        "end_time": "2025-04-04T05:51:03.656000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006485",
              "crash_point": 105.41,
              "time": "2025-04-04T05:51:03.656000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006561",
        "start_time": "2025-04-04T06:27:39.398000+05:30",
        "end_game_id": "8006566",
        "end_time": "2025-04-04T06:30:03.291000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006566",
              "crash_point": 27.75,
              "time": "2025-04-04T06:30:03.291000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006757",
        "start_time": "2025-04-04T07:59:51.992000+05:30",
        "end_game_id": "8006762",
        "end_time": "2025-04-04T08:02:29.293000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006762",
              "crash_point": 11.77,
              "time": "2025-04-04T08:02:29.293000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007283",
        "start_time": "2025-04-04T12:10:34.248000+05:30",
        "end_game_id": "8007288",
        "end_time": "2025-04-04T12:12:50.400000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007288",
              "crash_point": 10.67,
              "time": "2025-04-04T12:12:50.400000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007562",
        "start_time": "2025-04-04T14:15:11.801000+05:30",
        "end_game_id": "8007567",
        "end_time": "2025-04-04T14:17:39.033000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007567",
              "crash_point": 12.55,
              "time": "2025-04-04T14:17:39.033000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007925",
        "start_time": "2025-04-04T17:04:55.536000+05:30",
        "end_game_id": "8007930",
        "end_time": "2025-04-04T17:08:56.120000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007930",
              "crash_point": 2147.29,
              "time": "2025-04-04T17:08:56.120000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007955",
        "start_time": "2025-04-04T17:22:21.788000+05:30",
        "end_game_id": "8007960",
        "end_time": "2025-04-04T17:25:29.206000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007960",
              "crash_point": 33.48,
              "time": "2025-04-04T17:25:29.206000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008038",
        "start_time": "2025-04-04T18:04:08.654000+05:30",
        "end_game_id": "8008043",
        "end_time": "2025-04-04T18:06:22.648000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008043",
              "crash_point": 10.08,
              "time": "2025-04-04T18:06:22.648000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008366",
        "start_time": "2025-04-04T20:35:27.367000+05:30",
        "end_game_id": "8008371",
        "end_time": "2025-04-04T20:37:48.753000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008371",
              "crash_point": 14.67,
              "time": "2025-04-04T20:37:48.753000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008747",
        "start_time": "2025-04-04T23:37:22.236000+05:30",
        "end_game_id": "8008752",
        "end_time": "2025-04-04T23:39:17.200000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008752",
              "crash_point": 10.29,
              "time": "2025-04-04T23:39:17.200000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008965",
        "start_time": "2025-04-05T01:18:42.154000+05:30",
        "end_game_id": "8008970",
        "end_time": "2025-04-05T01:21:15.754000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008970",
              "crash_point": 33.14,
              "time": "2025-04-05T01:21:15.754000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009005",
        "start_time": "2025-04-05T01:40:16.150000+05:30",
        "end_game_id": "8009010",
        "end_time": "2025-04-05T01:43:03.818000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009010",
              "crash_point": 27.29,
              "time": "2025-04-05T01:43:03.818000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009137",
        "start_time": "2025-04-05T02:41:35.330000+05:30",
        "end_game_id": "8009142",
        "end_time": "2025-04-05T02:43:57.032000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009142",
              "crash_point": 13.55,
              "time": "2025-04-05T02:43:57.032000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009143",
        "start_time": "2025-04-05T02:44:19.842000+05:30",
        "end_game_id": "8009148",
        "end_time": "2025-04-05T02:47:06.080000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009148",
              "crash_point": 118.14,
              "time": "2025-04-05T02:47:06.080000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009231",
        "start_time": "2025-04-05T03:23:42.388000+05:30",
        "end_game_id": "8009236",
        "end_time": "2025-04-05T03:26:19.277000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009236",
              "crash_point": 29.52,
              "time": "2025-04-05T03:26:19.277000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009453",
        "start_time": "2025-04-05T05:05:53.982000+05:30",
        "end_game_id": "8009458",
        "end_time": "2025-04-05T05:08:55.327000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009458",
              "crash_point": 12.77,
              "time": "2025-04-05T05:08:55.327000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009603",
        "start_time": "2025-04-05T06:13:37.200000+05:30",
        "end_game_id": "8009608",
        "end_time": "2025-04-05T06:16:26.733000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009608",
              "crash_point": 79.33,
              "time": "2025-04-05T06:16:26.733000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009699",
        "start_time": "2025-04-05T06:54:02.760000+05:30",
        "end_game_id": "8009704",
        "end_time": "2025-04-05T06:57:21.369000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009704",
              "crash_point": 61.28,
              "time": "2025-04-05T06:57:21.369000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009713",
        "start_time": "2025-04-05T07:01:32.436000+05:30",
        "end_game_id": "8009718",
        "end_time": "2025-04-05T07:04:46.315000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009718",
              "crash_point": 46.45,
              "time": "2025-04-05T07:04:46.315000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010123",
        "start_time": "2025-04-05T10:06:39.783000+05:30",
        "end_game_id": "8010128",
        "end_time": "2025-04-05T10:09:17.800000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010128",
              "crash_point": 10.63,
              "time": "2025-04-05T10:09:17.800000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010282",
        "start_time": "2025-04-05T11:25:26.031000+05:30",
        "end_game_id": "8010287",
        "end_time": "2025-04-05T11:27:42.228000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010287",
              "crash_point": 15.23,
              "time": "2025-04-05T11:27:42.228000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010288",
        "start_time": "2025-04-05T11:28:03.378000+05:30",
        "end_game_id": "8010293",
        "end_time": "2025-04-05T11:31:26.738000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010293",
              "crash_point": 77.05,
              "time": "2025-04-05T11:31:26.738000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010316",
        "start_time": "2025-04-05T11:42:07.127000+05:30",
        "end_game_id": "8010321",
        "end_time": "2025-04-05T11:44:21.181000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010321",
              "crash_point": 10.79,
              "time": "2025-04-05T11:44:21.181000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010372",
        "start_time": "2025-04-05T12:08:34.291000+05:30",
        "end_game_id": "8010377",
        "end_time": "2025-04-05T12:12:38.164000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010377",
              "crash_point": 324.77,
              "time": "2025-04-05T12:12:38.164000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010870",
        "start_time": "2025-04-05T16:08:48.352000+05:30",
        "end_game_id": "8010875",
        "end_time": "2025-04-05T16:11:13.782000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010875",
              "crash_point": 12.04,
              "time": "2025-04-05T16:11:13.782000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010916",
        "start_time": "2025-04-05T16:29:12.173000+05:30",
        "end_game_id": "8010921",
        "end_time": "2025-04-05T16:31:33.972000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010921",
              "crash_point": 14.21,
              "time": "2025-04-05T16:31:33.972000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010962",
        "start_time": "2025-04-05T16:56:35.299000+05:30",
        "end_game_id": "8010967",
        "end_time": "2025-04-05T16:59:02.549000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010967",
              "crash_point": 13.11,
              "time": "2025-04-05T16:59:02.549000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011520",
        "start_time": "2025-04-05T21:12:11.323000+05:30",
        "end_game_id": "8011525",
        "end_time": "2025-04-05T21:14:18.468000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011525",
              "crash_point": 22.81,
              "time": "2025-04-05T21:14:18.468000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011602",
        "start_time": "2025-04-05T21:49:37.477000+05:30",
        "end_game_id": "8011607",
        "end_time": "2025-04-05T21:52:03.796000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011607",
              "crash_point": 15.02,
              "time": "2025-04-05T21:52:03.796000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011834",
        "start_time": "2025-04-05T23:44:29.667000+05:30",
        "end_game_id": "8011839",
        "end_time": "2025-04-05T23:47:36.950000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011839",
              "crash_point": 56.96,
              "time": "2025-04-05T23:47:36.950000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012001",
        "start_time": "2025-04-06T01:12:20.407000+05:30",
        "end_game_id": "8012006",
        "end_time": "2025-04-06T01:15:56.652000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012006",
              "crash_point": 206.76,
              "time": "2025-04-06T01:15:56.652000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012247",
        "start_time": "2025-04-06T03:05:10.824000+05:30",
        "end_game_id": "8012252",
        "end_time": "2025-04-06T03:08:08.297000+05:30",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012252",
              "crash_point": 11.1,
              "time": "2025-04-06T03:08:08.297000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006396",
        "start_time": "2025-04-04T05:04:31.722000+05:30",
        "end_game_id": "8006400",
        "end_time": "2025-04-04T05:06:34.526000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006400",
              "crash_point": 10.6,
              "time": "2025-04-04T05:06:34.526000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006454",
        "start_time": "2025-04-04T05:33:09.549000+05:30",
        "end_game_id": "8006458",
        "end_time": "2025-04-04T05:35:34.829000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006458",
              "crash_point": 108.54,
              "time": "2025-04-04T05:35:34.829000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006533",
        "start_time": "2025-04-04T06:15:12.016000+05:30",
        "end_game_id": "8006537",
        "end_time": "2025-04-04T06:17:21.233000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006537",
              "crash_point": 36.38,
              "time": "2025-04-04T06:17:21.233000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006693",
        "start_time": "2025-04-04T07:30:10.591000+05:30",
        "end_game_id": "8006697",
        "end_time": "2025-04-04T07:32:41.455000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006697",
              "crash_point": 13.66,
              "time": "2025-04-04T07:32:41.455000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006896",
        "start_time": "2025-04-04T09:03:55.270000+05:30",
        "end_game_id": "8006900",
        "end_time": "2025-04-04T09:05:46.653000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006900",
              "crash_point": 17.24,
              "time": "2025-04-04T09:05:46.653000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006929",
        "start_time": "2025-04-04T09:21:19.660000+05:30",
        "end_game_id": "8006933",
        "end_time": "2025-04-04T09:23:48.575000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006933",
              "crash_point": 12.04,
              "time": "2025-04-04T09:23:48.575000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006967",
        "start_time": "2025-04-04T09:40:23.961000+05:30",
        "end_game_id": "8006971",
        "end_time": "2025-04-04T09:43:10.350000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006971",
              "crash_point": 23.91,
              "time": "2025-04-04T09:43:10.350000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007093",
        "start_time": "2025-04-04T10:35:21.736000+05:30",
        "end_game_id": "8007097",
        "end_time": "2025-04-04T10:37:43.206000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007097",
              "crash_point": 65.08,
              "time": "2025-04-04T10:37:43.206000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007579",
        "start_time": "2025-04-04T14:23:25.885000+05:30",
        "end_game_id": "8007583",
        "end_time": "2025-04-04T14:25:26.315000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007583",
              "crash_point": 22.3,
              "time": "2025-04-04T14:25:26.315000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007644",
        "start_time": "2025-04-04T14:53:58.272000+05:30",
        "end_game_id": "8007648",
        "end_time": "2025-04-04T14:56:53+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007648",
              "crash_point": 401.39,
              "time": "2025-04-04T14:56:53+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007683",
        "start_time": "2025-04-04T15:12:53.859000+05:30",
        "end_game_id": "8007687",
        "end_time": "2025-04-04T15:14:49.340000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007687",
              "crash_point": 36.36,
              "time": "2025-04-04T15:14:49.340000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007917",
        "start_time": "2025-04-04T16:59:48.677000+05:30",
        "end_game_id": "8007921",
        "end_time": "2025-04-04T17:01:59.702000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007921",
              "crash_point": 20.35,
              "time": "2025-04-04T17:01:59.702000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007944",
        "start_time": "2025-04-04T17:17:05.217000+05:30",
        "end_game_id": "8007948",
        "end_time": "2025-04-04T17:19:08.187000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007948",
              "crash_point": 16.57,
              "time": "2025-04-04T17:19:08.187000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007949",
        "start_time": "2025-04-04T17:19:30.058000+05:30",
        "end_game_id": "8007953",
        "end_time": "2025-04-04T17:21:09.310000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007953",
              "crash_point": 12.85,
              "time": "2025-04-04T17:21:09.310000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008033",
        "start_time": "2025-04-04T18:00:59.190000+05:30",
        "end_game_id": "8008037",
        "end_time": "2025-04-04T18:03:20.032000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008037",
              "crash_point": 24.65,
              "time": "2025-04-04T18:03:20.032000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008229",
        "start_time": "2025-04-04T19:28:21.849000+05:30",
        "end_game_id": "8008233",
        "end_time": "2025-04-04T19:30:45.873000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008233",
              "crash_point": 40.67,
              "time": "2025-04-04T19:30:45.873000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008234",
        "start_time": "2025-04-04T19:31:21.831000+05:30",
        "end_game_id": "8008238",
        "end_time": "2025-04-04T19:33:16.531000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008238",
              "crash_point": 24.15,
              "time": "2025-04-04T19:33:16.531000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008448",
        "start_time": "2025-04-04T21:13:26.671000+05:30",
        "end_game_id": "8008452",
        "end_time": "2025-04-04T21:16:00.490000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008452",
              "crash_point": 63.66,
              "time": "2025-04-04T21:16:00.490000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008454",
        "start_time": "2025-04-04T21:17:18.361000+05:30",
        "end_game_id": "8008458",
        "end_time": "2025-04-04T21:19:19.100000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008458",
              "crash_point": 25.46,
              "time": "2025-04-04T21:19:19.100000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008617",
        "start_time": "2025-04-04T22:32:17.911000+05:30",
        "end_game_id": "8008621",
        "end_time": "2025-04-04T22:34:31.115000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008621",
              "crash_point": 18.89,
              "time": "2025-04-04T22:34:31.115000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008709",
        "start_time": "2025-04-04T23:15:52.345000+05:30",
        "end_game_id": "8008713",
        "end_time": "2025-04-04T23:19:15.771000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008713",
              "crash_point": 57.43,
              "time": "2025-04-04T23:19:15.771000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009011",
        "start_time": "2025-04-05T01:43:28.032000+05:30",
        "end_game_id": "8009015",
        "end_time": "2025-04-05T01:46:12.757000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009015",
              "crash_point": 74.56,
              "time": "2025-04-05T01:46:12.757000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009326",
        "start_time": "2025-04-05T04:08:03.756000+05:30",
        "end_game_id": "8009330",
        "end_time": "2025-04-05T04:10:21.061000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009330",
              "crash_point": 17.84,
              "time": "2025-04-05T04:10:21.061000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009443",
        "start_time": "2025-04-05T04:58:36.380000+05:30",
        "end_game_id": "8009447",
        "end_time": "2025-04-05T05:01:35.852000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009447",
              "crash_point": 39.1,
              "time": "2025-04-05T05:01:35.852000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009694",
        "start_time": "2025-04-05T06:51:43.932000+05:30",
        "end_game_id": "8009698",
        "end_time": "2025-04-05T06:53:49.772000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009698",
              "crash_point": 15.01,
              "time": "2025-04-05T06:53:49.772000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010751",
        "start_time": "2025-04-05T15:12:25.534000+05:30",
        "end_game_id": "8010755",
        "end_time": "2025-04-05T15:14:31.540000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010755",
              "crash_point": 23.68,
              "time": "2025-04-05T15:14:31.540000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010848",
        "start_time": "2025-04-05T15:56:59.728000+05:30",
        "end_game_id": "8010852",
        "end_time": "2025-04-05T15:59:24.540000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010852",
              "crash_point": 15.16,
              "time": "2025-04-05T15:59:24.540000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010936",
        "start_time": "2025-04-05T16:41:45.475000+05:30",
        "end_game_id": "8010940",
        "end_time": "2025-04-05T16:44:29.219000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010940",
              "crash_point": 14.49,
              "time": "2025-04-05T16:44:29.219000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010957",
        "start_time": "2025-04-05T16:53:28.961000+05:30",
        "end_game_id": "8010961",
        "end_time": "2025-04-05T16:55:56.538000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010961",
              "crash_point": 12.36,
              "time": "2025-04-05T16:55:56.538000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010990",
        "start_time": "2025-04-05T17:10:40.149000+05:30",
        "end_game_id": "8010994",
        "end_time": "2025-04-05T17:12:45.773000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010994",
              "crash_point": 16.19,
              "time": "2025-04-05T17:12:45.773000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011541",
        "start_time": "2025-04-05T21:21:26.935000+05:30",
        "end_game_id": "8011545",
        "end_time": "2025-04-05T21:23:47.378000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011545",
              "crash_point": 12.8,
              "time": "2025-04-05T21:23:47.378000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011546",
        "start_time": "2025-04-05T21:24:06.322000+05:30",
        "end_game_id": "8011550",
        "end_time": "2025-04-05T21:26:23.961000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011550",
              "crash_point": 46.51,
              "time": "2025-04-05T21:26:23.961000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011664",
        "start_time": "2025-04-05T22:19:29.974000+05:30",
        "end_game_id": "8011668",
        "end_time": "2025-04-05T22:22:18.419000+05:30",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011668",
              "crash_point": 15.08,
              "time": "2025-04-05T22:22:18.419000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006316",
        "start_time": "2025-04-04T04:28:42.563000+05:30",
        "end_game_id": "8006319",
        "end_time": "2025-04-04T04:30:34.757000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006319",
              "crash_point": 31.0,
              "time": "2025-04-04T04:30:34.757000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006401",
        "start_time": "2025-04-04T05:06:56.279000+05:30",
        "end_game_id": "8006404",
        "end_time": "2025-04-04T05:08:59.854000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006404",
              "crash_point": 44.86,
              "time": "2025-04-04T05:08:59.854000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006447",
        "start_time": "2025-04-04T05:28:53.840000+05:30",
        "end_game_id": "8006450",
        "end_time": "2025-04-04T05:30:49.144000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006450",
              "crash_point": 11.25,
              "time": "2025-04-04T05:30:49.144000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006472",
        "start_time": "2025-04-04T05:42:47.137000+05:30",
        "end_game_id": "8006475",
        "end_time": "2025-04-04T05:45:00.692000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006475",
              "crash_point": 27.42,
              "time": "2025-04-04T05:45:00.692000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006476",
        "start_time": "2025-04-04T05:45:23.590000+05:30",
        "end_game_id": "8006479",
        "end_time": "2025-04-04T05:47:58.884000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006479",
              "crash_point": 42.23,
              "time": "2025-04-04T05:47:58.884000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006600",
        "start_time": "2025-04-04T06:45:19.749000+05:30",
        "end_game_id": "8006603",
        "end_time": "2025-04-04T06:47:07.867000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006603",
              "crash_point": 22.93,
              "time": "2025-04-04T06:47:07.867000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006646",
        "start_time": "2025-04-04T07:06:35.943000+05:30",
        "end_game_id": "8006649",
        "end_time": "2025-04-04T07:08:02.213000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006649",
              "crash_point": 12.15,
              "time": "2025-04-04T07:08:02.213000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006689",
        "start_time": "2025-04-04T07:27:42.998000+05:30",
        "end_game_id": "8006692",
        "end_time": "2025-04-04T07:29:41.468000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006692",
              "crash_point": 16.36,
              "time": "2025-04-04T07:29:41.468000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007137",
        "start_time": "2025-04-04T10:56:59.068000+05:30",
        "end_game_id": "8007140",
        "end_time": "2025-04-04T10:58:50.404000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007140",
              "crash_point": 10.81,
              "time": "2025-04-04T10:58:50.404000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007639",
        "start_time": "2025-04-04T14:50:41.515000+05:30",
        "end_game_id": "8007642",
        "end_time": "2025-04-04T14:52:35.022000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007642",
              "crash_point": 41.69,
              "time": "2025-04-04T14:52:35.022000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007705",
        "start_time": "2025-04-04T15:23:33.618000+05:30",
        "end_game_id": "8007708",
        "end_time": "2025-04-04T15:25:14.224000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007708",
              "crash_point": 21.66,
              "time": "2025-04-04T15:25:14.224000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007911",
        "start_time": "2025-04-04T16:55:50.384000+05:30",
        "end_game_id": "8007914",
        "end_time": "2025-04-04T16:57:58.158000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007914",
              "crash_point": 28.02,
              "time": "2025-04-04T16:57:58.158000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007961",
        "start_time": "2025-04-04T17:26:00.463000+05:30",
        "end_game_id": "8007964",
        "end_time": "2025-04-04T17:27:25.931000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007964",
              "crash_point": 10.17,
              "time": "2025-04-04T17:27:25.931000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008029",
        "start_time": "2025-04-04T17:58:31.848000+05:30",
        "end_game_id": "8008032",
        "end_time": "2025-04-04T18:00:40.370000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008032",
              "crash_point": 17.56,
              "time": "2025-04-04T18:00:40.370000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008163",
        "start_time": "2025-04-04T18:57:02.961000+05:30",
        "end_game_id": "8008166",
        "end_time": "2025-04-04T18:58:19.941000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008166",
              "crash_point": 11.25,
              "time": "2025-04-04T18:58:19.941000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008199",
        "start_time": "2025-04-04T19:14:06.854000+05:30",
        "end_game_id": "8008202",
        "end_time": "2025-04-04T19:15:55.330000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008202",
              "crash_point": 18.61,
              "time": "2025-04-04T19:15:55.330000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008351",
        "start_time": "2025-04-04T20:27:08.030000+05:30",
        "end_game_id": "8008354",
        "end_time": "2025-04-04T20:28:51.746000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008354",
              "crash_point": 17.05,
              "time": "2025-04-04T20:28:51.746000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008372",
        "start_time": "2025-04-04T20:38:25.373000+05:30",
        "end_game_id": "8008375",
        "end_time": "2025-04-04T20:40:21.054000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008375",
              "crash_point": 28.25,
              "time": "2025-04-04T20:40:21.054000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008541",
        "start_time": "2025-04-04T21:55:17.134000+05:30",
        "end_game_id": "8008544",
        "end_time": "2025-04-04T21:56:54.110000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008544",
              "crash_point": 15.75,
              "time": "2025-04-04T21:56:54.110000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008565",
        "start_time": "2025-04-04T22:06:49.249000+05:30",
        "end_game_id": "8008568",
        "end_time": "2025-04-04T22:08:56.526000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008568",
              "crash_point": 24.78,
              "time": "2025-04-04T22:08:56.526000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009036",
        "start_time": "2025-04-05T01:55:37.012000+05:30",
        "end_game_id": "8009039",
        "end_time": "2025-04-05T01:57:40.779000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009039",
              "crash_point": 72.82,
              "time": "2025-04-05T01:57:40.779000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009322",
        "start_time": "2025-04-05T04:05:46.180000+05:30",
        "end_game_id": "8009325",
        "end_time": "2025-04-05T04:07:49.483000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009325",
              "crash_point": 12.93,
              "time": "2025-04-05T04:07:49.483000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009439",
        "start_time": "2025-04-05T04:56:15.125000+05:30",
        "end_game_id": "8009442",
        "end_time": "2025-04-05T04:58:24.648000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009442",
              "crash_point": 25.12,
              "time": "2025-04-05T04:58:24.648000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009920",
        "start_time": "2025-04-05T08:34:17.035000+05:30",
        "end_game_id": "8009923",
        "end_time": "2025-04-05T08:36:44.335000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009923",
              "crash_point": 168.07,
              "time": "2025-04-05T08:36:44.335000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009924",
        "start_time": "2025-04-05T08:36:56.459000+05:30",
        "end_game_id": "8009927",
        "end_time": "2025-04-05T08:38:39.390000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009927",
              "crash_point": 10.8,
              "time": "2025-04-05T08:38:39.390000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010179",
        "start_time": "2025-04-05T10:34:25.756000+05:30",
        "end_game_id": "8010182",
        "end_time": "2025-04-05T10:36:27.366000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010182",
              "crash_point": 32.96,
              "time": "2025-04-05T10:36:27.366000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010322",
        "start_time": "2025-04-05T11:45:03.254000+05:30",
        "end_game_id": "8010325",
        "end_time": "2025-04-05T11:47:00.034000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010325",
              "crash_point": 77.2,
              "time": "2025-04-05T11:47:00.034000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010503",
        "start_time": "2025-04-05T13:10:01.283000+05:30",
        "end_game_id": "8010506",
        "end_time": "2025-04-05T13:12:13.982000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010506",
              "crash_point": 94.47,
              "time": "2025-04-05T13:12:13.982000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010559",
        "start_time": "2025-04-05T13:37:20.538000+05:30",
        "end_game_id": "8010562",
        "end_time": "2025-04-05T13:40:10.747000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010562",
              "crash_point": 202.82,
              "time": "2025-04-05T13:40:10.747000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010844",
        "start_time": "2025-04-05T15:54:37.688000+05:30",
        "end_game_id": "8010847",
        "end_time": "2025-04-05T15:56:26.041000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010847",
              "crash_point": 13.94,
              "time": "2025-04-05T15:56:26.041000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011348",
        "start_time": "2025-04-05T19:52:49.699000+05:30",
        "end_game_id": "8011351",
        "end_time": "2025-04-05T19:55:02.598000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011351",
              "crash_point": 19.53,
              "time": "2025-04-05T19:55:02.598000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011645",
        "start_time": "2025-04-05T22:09:01.324000+05:30",
        "end_game_id": "8011648",
        "end_time": "2025-04-05T22:11:10.787000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011648",
              "crash_point": 102.15,
              "time": "2025-04-05T22:11:10.787000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011723",
        "start_time": "2025-04-05T22:46:48.090000+05:30",
        "end_game_id": "8011726",
        "end_time": "2025-04-05T22:49:20.588000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011726",
              "crash_point": 19.62,
              "time": "2025-04-05T22:49:20.588000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011764",
        "start_time": "2025-04-05T23:10:16.525000+05:30",
        "end_game_id": "8011767",
        "end_time": "2025-04-05T23:11:50.501000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011767",
              "crash_point": 12.43,
              "time": "2025-04-05T23:11:50.501000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011809",
        "start_time": "2025-04-05T23:31:04.811000+05:30",
        "end_game_id": "8011812",
        "end_time": "2025-04-05T23:32:58.984000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011812",
              "crash_point": 19.13,
              "time": "2025-04-05T23:32:58.984000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011912",
        "start_time": "2025-04-06T00:21:24.633000+05:30",
        "end_game_id": "8011915",
        "end_time": "2025-04-06T00:23:49.667000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011915",
              "crash_point": 94.01,
              "time": "2025-04-06T00:23:49.667000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011916",
        "start_time": "2025-04-06T00:24:39.088000+05:30",
        "end_game_id": "8011919",
        "end_time": "2025-04-06T00:26:10.097000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011919",
              "crash_point": 15.79,
              "time": "2025-04-06T00:26:10.097000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011920",
        "start_time": "2025-04-06T00:26:40.629000+05:30",
        "end_game_id": "8011923",
        "end_time": "2025-04-06T00:28:30.849000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011923",
              "crash_point": 11.69,
              "time": "2025-04-06T00:28:30.849000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012058",
        "start_time": "2025-04-06T01:39:17.948000+05:30",
        "end_game_id": "8012061",
        "end_time": "2025-04-06T01:41:14.171000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012061",
              "crash_point": 54.98,
              "time": "2025-04-06T01:41:14.171000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012062",
        "start_time": "2025-04-06T01:41:43.271000+05:30",
        "end_game_id": "8012065",
        "end_time": "2025-04-06T01:44:19.163000+05:30",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012065",
              "crash_point": 176.28,
              "time": "2025-04-06T01:44:19.163000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006276",
        "start_time": "2025-04-04T04:06:59.889000+05:30",
        "end_game_id": "8006278",
        "end_time": "2025-04-04T04:08:05.892000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006278",
              "crash_point": 11.59,
              "time": "2025-04-04T04:08:05.892000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006291",
        "start_time": "2025-04-04T04:16:20.252000+05:30",
        "end_game_id": "8006293",
        "end_time": "2025-04-04T04:17:55.955000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006293",
              "crash_point": 30.96,
              "time": "2025-04-04T04:17:55.955000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006451",
        "start_time": "2025-04-04T05:31:20.867000+05:30",
        "end_game_id": "8006453",
        "end_time": "2025-04-04T05:32:46.547000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006453",
              "crash_point": 17.11,
              "time": "2025-04-04T05:32:46.547000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006486",
        "start_time": "2025-04-04T05:51:47.599000+05:30",
        "end_game_id": "8006488",
        "end_time": "2025-04-04T05:53:28.013000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006488",
              "crash_point": 17.2,
              "time": "2025-04-04T05:53:28.013000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006527",
        "start_time": "2025-04-04T06:11:03.883000+05:30",
        "end_game_id": "8006529",
        "end_time": "2025-04-04T06:12:53.015000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006529",
              "crash_point": 95.79,
              "time": "2025-04-04T06:12:53.015000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006530",
        "start_time": "2025-04-04T06:13:19.215000+05:30",
        "end_game_id": "8006532",
        "end_time": "2025-04-04T06:14:37.847000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006532",
              "crash_point": 10.17,
              "time": "2025-04-04T06:14:37.847000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006643",
        "start_time": "2025-04-04T07:04:01.231000+05:30",
        "end_game_id": "8006645",
        "end_time": "2025-04-04T07:05:55.931000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006645",
              "crash_point": 92.62,
              "time": "2025-04-04T07:05:55.931000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006662",
        "start_time": "2025-04-04T07:14:08.458000+05:30",
        "end_game_id": "8006664",
        "end_time": "2025-04-04T07:16:03.756000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006664",
              "crash_point": 39.77,
              "time": "2025-04-04T07:16:03.756000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006797",
        "start_time": "2025-04-04T08:19:02.477000+05:30",
        "end_game_id": "8006799",
        "end_time": "2025-04-04T08:20:17.986000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006799",
              "crash_point": 17.21,
              "time": "2025-04-04T08:20:17.986000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007211",
        "start_time": "2025-04-04T11:31:30.418000+05:30",
        "end_game_id": "8007213",
        "end_time": "2025-04-04T11:33:01.575000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007213",
              "crash_point": 19.41,
              "time": "2025-04-04T11:33:01.575000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007629",
        "start_time": "2025-04-04T14:46:43.411000+05:30",
        "end_game_id": "8007631",
        "end_time": "2025-04-04T14:47:59.640000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007631",
              "crash_point": 22.55,
              "time": "2025-04-04T14:47:59.640000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007805",
        "start_time": "2025-04-04T16:07:28.430000+05:30",
        "end_game_id": "8007807",
        "end_time": "2025-04-04T16:09:40.020000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007807",
              "crash_point": 135.59,
              "time": "2025-04-04T16:09:40.020000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007879",
        "start_time": "2025-04-04T16:41:20.297000+05:30",
        "end_game_id": "8007881",
        "end_time": "2025-04-04T16:42:45.481000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007881",
              "crash_point": 11.99,
              "time": "2025-04-04T16:42:45.481000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007938",
        "start_time": "2025-04-04T17:13:12.087000+05:30",
        "end_game_id": "8007940",
        "end_time": "2025-04-04T17:15:14.662000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007940",
              "crash_point": 93.16,
              "time": "2025-04-04T17:15:14.662000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007941",
        "start_time": "2025-04-04T17:15:29.489000+05:30",
        "end_game_id": "8007943",
        "end_time": "2025-04-04T17:16:47.089000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007943",
              "crash_point": 16.8,
              "time": "2025-04-04T17:16:47.089000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008001",
        "start_time": "2025-04-04T17:44:22.634000+05:30",
        "end_game_id": "8008003",
        "end_time": "2025-04-04T17:45:38.957000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008003",
              "crash_point": 16.61,
              "time": "2025-04-04T17:45:38.957000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008131",
        "start_time": "2025-04-04T18:43:16.073000+05:30",
        "end_game_id": "8008133",
        "end_time": "2025-04-04T18:44:28.893000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008133",
              "crash_point": 11.1,
              "time": "2025-04-04T18:44:28.893000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008317",
        "start_time": "2025-04-04T20:11:37.650000+05:30",
        "end_game_id": "8008319",
        "end_time": "2025-04-04T20:12:54.130000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008319",
              "crash_point": 16.51,
              "time": "2025-04-04T20:12:54.130000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008376",
        "start_time": "2025-04-04T20:40:37.720000+05:30",
        "end_game_id": "8008378",
        "end_time": "2025-04-04T20:41:43.146000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008378",
              "crash_point": 10.07,
              "time": "2025-04-04T20:41:43.146000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008421",
        "start_time": "2025-04-04T21:00:05.510000+05:30",
        "end_game_id": "8008423",
        "end_time": "2025-04-04T21:01:28.951000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008423",
              "crash_point": 10.17,
              "time": "2025-04-04T21:01:28.951000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008443",
        "start_time": "2025-04-04T21:10:00.223000+05:30",
        "end_game_id": "8008445",
        "end_time": "2025-04-04T21:11:38.961000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008445",
              "crash_point": 46.99,
              "time": "2025-04-04T21:11:38.961000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008622",
        "start_time": "2025-04-04T22:34:52.768000+05:30",
        "end_game_id": "8008624",
        "end_time": "2025-04-04T22:36:25.323000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008624",
              "crash_point": 26.4,
              "time": "2025-04-04T22:36:25.323000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008644",
        "start_time": "2025-04-04T22:45:22.921000+05:30",
        "end_game_id": "8008646",
        "end_time": "2025-04-04T22:46:38.178000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008646",
              "crash_point": 11.68,
              "time": "2025-04-04T22:46:38.178000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008740",
        "start_time": "2025-04-04T23:31:58.001000+05:30",
        "end_game_id": "8008742",
        "end_time": "2025-04-04T23:33:22.232000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008742",
              "crash_point": 27.98,
              "time": "2025-04-04T23:33:22.232000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008779",
        "start_time": "2025-04-04T23:53:37.353000+05:30",
        "end_game_id": "8008781",
        "end_time": "2025-04-04T23:55:01.889000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008781",
              "crash_point": 32.46,
              "time": "2025-04-04T23:55:01.889000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008925",
        "start_time": "2025-04-05T00:57:13.889000+05:30",
        "end_game_id": "8008927",
        "end_time": "2025-04-05T00:59:06.976000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008927",
              "crash_point": 134.31,
              "time": "2025-04-05T00:59:06.976000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009214",
        "start_time": "2025-04-05T03:15:26.226000+05:30",
        "end_game_id": "8009216",
        "end_time": "2025-04-05T03:16:40.087000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009216",
              "crash_point": 11.46,
              "time": "2025-04-05T03:16:40.087000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009449",
        "start_time": "2025-04-05T05:02:59.071000+05:30",
        "end_game_id": "8009451",
        "end_time": "2025-04-05T05:04:13.932000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009451",
              "crash_point": 13.16,
              "time": "2025-04-05T05:04:13.932000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009928",
        "start_time": "2025-04-05T08:39:20.863000+05:30",
        "end_game_id": "8009930",
        "end_time": "2025-04-05T08:40:59.815000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009930",
              "crash_point": 47.18,
              "time": "2025-04-05T08:40:59.815000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010184",
        "start_time": "2025-04-05T10:38:26.418000+05:30",
        "end_game_id": "8010186",
        "end_time": "2025-04-05T10:39:47.782000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010186",
              "crash_point": 27.55,
              "time": "2025-04-05T10:39:47.782000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010215",
        "start_time": "2025-04-05T10:52:00.325000+05:30",
        "end_game_id": "8010217",
        "end_time": "2025-04-05T10:53:25.326000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010217",
              "crash_point": 33.23,
              "time": "2025-04-05T10:53:25.326000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010261",
        "start_time": "2025-04-05T11:14:44.446000+05:30",
        "end_game_id": "8010263",
        "end_time": "2025-04-05T11:16:07.231000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010263",
              "crash_point": 14.36,
              "time": "2025-04-05T11:16:07.231000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010556",
        "start_time": "2025-04-05T13:34:55.315000+05:30",
        "end_game_id": "8010558",
        "end_time": "2025-04-05T13:37:07.022000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010558",
              "crash_point": 224.61,
              "time": "2025-04-05T13:37:07.022000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010708",
        "start_time": "2025-04-05T14:47:21.399000+05:30",
        "end_game_id": "8010710",
        "end_time": "2025-04-05T14:49:04.651000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010710",
              "crash_point": 34.6,
              "time": "2025-04-05T14:49:04.651000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010744",
        "start_time": "2025-04-05T15:07:38.867000+05:30",
        "end_game_id": "8010746",
        "end_time": "2025-04-05T15:09:13.911000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010746",
              "crash_point": 22.71,
              "time": "2025-04-05T15:09:13.911000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010747",
        "start_time": "2025-04-05T15:09:51.677000+05:30",
        "end_game_id": "8010749",
        "end_time": "2025-04-05T15:11:04.202000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010749",
              "crash_point": 12.31,
              "time": "2025-04-05T15:11:04.202000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011481",
        "start_time": "2025-04-05T20:54:10.357000+05:30",
        "end_game_id": "8011483",
        "end_time": "2025-04-05T20:55:17.373000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011483",
              "crash_point": 10.75,
              "time": "2025-04-05T20:55:17.373000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011508",
        "start_time": "2025-04-05T21:05:06.024000+05:30",
        "end_game_id": "8011510",
        "end_time": "2025-04-05T21:06:39.164000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011510",
              "crash_point": 29.15,
              "time": "2025-04-05T21:06:39.164000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011642",
        "start_time": "2025-04-05T22:07:07.415000+05:30",
        "end_game_id": "8011644",
        "end_time": "2025-04-05T22:08:47.208000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011644",
              "crash_point": 65.72,
              "time": "2025-04-05T22:08:47.208000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011842",
        "start_time": "2025-04-05T23:50:00.292000+05:30",
        "end_game_id": "8011844",
        "end_time": "2025-04-05T23:51:29.285000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011844",
              "crash_point": 40.7,
              "time": "2025-04-05T23:51:29.285000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011924",
        "start_time": "2025-04-06T00:28:49.027000+05:30",
        "end_game_id": "8011926",
        "end_time": "2025-04-06T00:30:17.830000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011926",
              "crash_point": 14.86,
              "time": "2025-04-06T00:30:17.830000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011982",
        "start_time": "2025-04-06T01:01:01.690000+05:30",
        "end_game_id": "8011984",
        "end_time": "2025-04-06T01:02:22.055000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011984",
              "crash_point": 13.59,
              "time": "2025-04-06T01:02:22.055000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012055",
        "start_time": "2025-04-06T01:37:54.634000+05:30",
        "end_game_id": "8012057",
        "end_time": "2025-04-06T01:39:04.041000+05:30",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012057",
              "crash_point": 11.38,
              "time": "2025-04-06T01:39:04.041000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006280",
        "start_time": "2025-04-04T04:10:30.722000+05:30",
        "end_game_id": "8006281",
        "end_time": "2025-04-04T04:11:32.844000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006281",
              "crash_point": 20.48,
              "time": "2025-04-04T04:11:32.844000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006567",
        "start_time": "2025-04-04T06:30:32.767000+05:30",
        "end_game_id": "8006568",
        "end_time": "2025-04-04T06:31:28.495000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006568",
              "crash_point": 14.36,
              "time": "2025-04-04T06:31:28.495000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006641",
        "start_time": "2025-04-04T07:02:44.782000+05:30",
        "end_game_id": "8006642",
        "end_time": "2025-04-04T07:03:48.444000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006642",
              "crash_point": 22.89,
              "time": "2025-04-04T07:03:48.444000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006665",
        "start_time": "2025-04-04T07:16:27.270000+05:30",
        "end_game_id": "8006666",
        "end_time": "2025-04-04T07:17:21.820000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006666",
              "crash_point": 13.17,
              "time": "2025-04-04T07:17:21.820000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8006927",
        "start_time": "2025-04-04T09:18:39.263000+05:30",
        "end_game_id": "8006928",
        "end_time": "2025-04-04T09:20:47.938000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8006928",
              "crash_point": 1119.5,
              "time": "2025-04-04T09:20:47.938000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007127",
        "start_time": "2025-04-04T10:51:05.622000+05:30",
        "end_game_id": "8007128",
        "end_time": "2025-04-04T10:52:14.809000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007128",
              "crash_point": 29.22,
              "time": "2025-04-04T10:52:14.809000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007214",
        "start_time": "2025-04-04T11:33:47.897000+05:30",
        "end_game_id": "8007215",
        "end_time": "2025-04-04T11:34:38.912000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007215",
              "crash_point": 10.68,
              "time": "2025-04-04T11:34:38.912000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007217",
        "start_time": "2025-04-04T11:36:03.367000+05:30",
        "end_game_id": "8007218",
        "end_time": "2025-04-04T11:37:15.275000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007218",
              "crash_point": 35.8,
              "time": "2025-04-04T11:37:15.275000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007219",
        "start_time": "2025-04-04T11:37:47.683000+05:30",
        "end_game_id": "8007220",
        "end_time": "2025-04-04T11:38:53.880000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007220",
              "crash_point": 26.29,
              "time": "2025-04-04T11:38:53.880000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007435",
        "start_time": "2025-04-04T13:21:22.574000+05:30",
        "end_game_id": "8007436",
        "end_time": "2025-04-04T13:22:34.287000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007436",
              "crash_point": 35.23,
              "time": "2025-04-04T13:22:34.287000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007477",
        "start_time": "2025-04-04T13:39:45.353000+05:30",
        "end_game_id": "8007478",
        "end_time": "2025-04-04T13:40:43.072000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007478",
              "crash_point": 15.39,
              "time": "2025-04-04T13:40:43.072000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007703",
        "start_time": "2025-04-04T15:22:09.488000+05:30",
        "end_game_id": "8007704",
        "end_time": "2025-04-04T15:23:20.820000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007704",
              "crash_point": 34.28,
              "time": "2025-04-04T15:23:20.820000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007862",
        "start_time": "2025-04-04T16:32:11.104000+05:30",
        "end_game_id": "8007863",
        "end_time": "2025-04-04T16:33:10.789000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007863",
              "crash_point": 17.69,
              "time": "2025-04-04T16:33:10.789000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007915",
        "start_time": "2025-04-04T16:58:29.449000+05:30",
        "end_game_id": "8007916",
        "end_time": "2025-04-04T16:59:29.936000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007916",
              "crash_point": 18.82,
              "time": "2025-04-04T16:59:29.936000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8007923",
        "start_time": "2025-04-04T17:03:29.978000+05:30",
        "end_game_id": "8007924",
        "end_time": "2025-04-04T17:04:24.767000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8007924",
              "crash_point": 13.32,
              "time": "2025-04-04T17:04:24.767000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008017",
        "start_time": "2025-04-04T17:51:50.196000+05:30",
        "end_game_id": "8008018",
        "end_time": "2025-04-04T17:53:23.321000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008018",
              "crash_point": 127.44,
              "time": "2025-04-04T17:53:23.321000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008044",
        "start_time": "2025-04-04T18:06:41.015000+05:30",
        "end_game_id": "8008045",
        "end_time": "2025-04-04T18:07:35.361000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008045",
              "crash_point": 12.39,
              "time": "2025-04-04T18:07:35.361000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008134",
        "start_time": "2025-04-04T18:44:42.287000+05:30",
        "end_game_id": "8008135",
        "end_time": "2025-04-04T18:46:24.086000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008135",
              "crash_point": 218.57,
              "time": "2025-04-04T18:46:24.086000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008168",
        "start_time": "2025-04-04T18:59:42.890000+05:30",
        "end_game_id": "8008169",
        "end_time": "2025-04-04T19:00:55.018000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008169",
              "crash_point": 37.77,
              "time": "2025-04-04T19:00:55.018000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008227",
        "start_time": "2025-04-04T19:26:43.481000+05:30",
        "end_game_id": "8008228",
        "end_time": "2025-04-04T19:27:34.597000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008228",
              "crash_point": 10.28,
              "time": "2025-04-04T19:27:34.597000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008303",
        "start_time": "2025-04-04T20:04:43.577000+05:30",
        "end_game_id": "8008304",
        "end_time": "2025-04-04T20:05:34.150000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008304",
              "crash_point": 10.33,
              "time": "2025-04-04T20:05:34.150000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008364",
        "start_time": "2025-04-04T20:33:55.748000+05:30",
        "end_game_id": "8008365",
        "end_time": "2025-04-04T20:35:07.568000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008365",
              "crash_point": 36.26,
              "time": "2025-04-04T20:35:07.568000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008446",
        "start_time": "2025-04-04T21:12:08.705000+05:30",
        "end_game_id": "8008447",
        "end_time": "2025-04-04T21:13:05.303000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008447",
              "crash_point": 14.93,
              "time": "2025-04-04T21:13:05.303000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008536",
        "start_time": "2025-04-04T21:51:14.236000+05:30",
        "end_game_id": "8008537",
        "end_time": "2025-04-04T21:52:06.504000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008537",
              "crash_point": 11.01,
              "time": "2025-04-04T21:52:06.504000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008539",
        "start_time": "2025-04-04T21:53:36.811000+05:30",
        "end_game_id": "8008540",
        "end_time": "2025-04-04T21:54:47.721000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008540",
              "crash_point": 32.67,
              "time": "2025-04-04T21:54:47.721000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008545",
        "start_time": "2025-04-04T21:57:30.834000+05:30",
        "end_game_id": "8008546",
        "end_time": "2025-04-04T21:58:21.754000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008546",
              "crash_point": 10.67,
              "time": "2025-04-04T21:58:21.754000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008664",
        "start_time": "2025-04-04T22:55:30.702000+05:30",
        "end_game_id": "8008665",
        "end_time": "2025-04-04T22:56:53.789000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008665",
              "crash_point": 73.92,
              "time": "2025-04-04T22:56:53.789000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008743",
        "start_time": "2025-04-04T23:33:48.118000+05:30",
        "end_game_id": "8008744",
        "end_time": "2025-04-04T23:35:28.305000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008744",
              "crash_point": 202.99,
              "time": "2025-04-04T23:35:28.305000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008745",
        "start_time": "2025-04-04T23:35:54.800000+05:30",
        "end_game_id": "8008746",
        "end_time": "2025-04-04T23:36:47.185000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008746",
              "crash_point": 11.63,
              "time": "2025-04-04T23:36:47.185000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008777",
        "start_time": "2025-04-04T23:52:10.785000+05:30",
        "end_game_id": "8008778",
        "end_time": "2025-04-04T23:53:23.078000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008778",
              "crash_point": 35.9,
              "time": "2025-04-04T23:53:23.078000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8008971",
        "start_time": "2025-04-05T01:21:58.214000+05:30",
        "end_game_id": "8008972",
        "end_time": "2025-04-05T01:23:07.219000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8008972",
              "crash_point": 31.12,
              "time": "2025-04-05T01:23:07.219000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009114",
        "start_time": "2025-04-05T02:31:23.398000+05:30",
        "end_game_id": "8009115",
        "end_time": "2025-04-05T02:32:18.978000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009115",
              "crash_point": 13.77,
              "time": "2025-04-05T02:32:18.978000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009212",
        "start_time": "2025-04-05T03:13:57.406000+05:30",
        "end_game_id": "8009213",
        "end_time": "2025-04-05T03:15:12.132000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009213",
              "crash_point": 44.5,
              "time": "2025-04-05T03:15:12.132000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009229",
        "start_time": "2025-04-05T03:22:20.376000+05:30",
        "end_game_id": "8009230",
        "end_time": "2025-04-05T03:23:12.739000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009230",
              "crash_point": 11.32,
              "time": "2025-04-05T03:23:12.739000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009237",
        "start_time": "2025-04-05T03:26:43.982000+05:30",
        "end_game_id": "8009238",
        "end_time": "2025-04-05T03:27:48.774000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009238",
              "crash_point": 24.51,
              "time": "2025-04-05T03:27:48.774000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8009287",
        "start_time": "2025-04-05T03:50:18.395000+05:30",
        "end_game_id": "8009288",
        "end_time": "2025-04-05T03:51:42.282000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8009288",
              "crash_point": 74.07,
              "time": "2025-04-05T03:51:42.282000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010035",
        "start_time": "2025-04-05T09:23:47.021000+05:30",
        "end_game_id": "8010036",
        "end_time": "2025-04-05T09:24:42.262000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010036",
              "crash_point": 13.82,
              "time": "2025-04-05T09:24:42.262000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010101",
        "start_time": "2025-04-05T09:54:37.698000+05:30",
        "end_game_id": "8010102",
        "end_time": "2025-04-05T09:55:47.524000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010102",
              "crash_point": 31.03,
              "time": "2025-04-05T09:55:47.524000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010177",
        "start_time": "2025-04-05T10:32:55.637000+05:30",
        "end_game_id": "8010178",
        "end_time": "2025-04-05T10:34:05.488000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010178",
              "crash_point": 32.24,
              "time": "2025-04-05T10:34:05.488000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010304",
        "start_time": "2025-04-05T11:36:04.569000+05:30",
        "end_game_id": "8010305",
        "end_time": "2025-04-05T11:37:01.142000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010305",
              "crash_point": 14.35,
              "time": "2025-04-05T11:37:01.142000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010446",
        "start_time": "2025-04-05T12:44:00.203000+05:30",
        "end_game_id": "8010447",
        "end_time": "2025-04-05T12:44:55.157000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010447",
              "crash_point": 13.37,
              "time": "2025-04-05T12:44:55.157000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010610",
        "start_time": "2025-04-05T14:02:27.675000+05:30",
        "end_game_id": "8010611",
        "end_time": "2025-04-05T14:03:27.886000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010611",
              "crash_point": 17.06,
              "time": "2025-04-05T14:03:27.886000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010922",
        "start_time": "2025-04-05T16:31:57.288000+05:30",
        "end_game_id": "8010923",
        "end_time": "2025-04-05T16:33:42.816000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010923",
              "crash_point": 278.41,
              "time": "2025-04-05T16:33:42.816000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8010968",
        "start_time": "2025-04-05T16:59:25.299000+05:30",
        "end_game_id": "8010969",
        "end_time": "2025-04-05T17:00:42.386000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8010969",
              "crash_point": 47.21,
              "time": "2025-04-05T17:00:42.386000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011099",
        "start_time": "2025-04-05T18:01:22.006000+05:30",
        "end_game_id": "8011100",
        "end_time": "2025-04-05T18:02:40.977000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011100",
              "crash_point": 57.37,
              "time": "2025-04-05T18:02:40.977000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011131",
        "start_time": "2025-04-05T18:16:39.138000+05:30",
        "end_game_id": "8011132",
        "end_time": "2025-04-05T18:17:59.921000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011132",
              "crash_point": 63.83,
              "time": "2025-04-05T18:17:59.921000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011439",
        "start_time": "2025-04-05T20:33:26.253000+05:30",
        "end_game_id": "8011440",
        "end_time": "2025-04-05T20:34:20.146000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011440",
              "crash_point": 12.57,
              "time": "2025-04-05T20:34:20.146000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011468",
        "start_time": "2025-04-05T20:47:20.802000+05:30",
        "end_game_id": "8011469",
        "end_time": "2025-04-05T20:48:23.260000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011469",
              "crash_point": 21.03,
              "time": "2025-04-05T20:48:23.260000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011526",
        "start_time": "2025-04-05T21:14:31.003000+05:30",
        "end_game_id": "8011527",
        "end_time": "2025-04-05T21:15:26.269000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011527",
              "crash_point": 12.63,
              "time": "2025-04-05T21:15:26.269000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011762",
        "start_time": "2025-04-05T23:08:50.864000+05:30",
        "end_game_id": "8011763",
        "end_time": "2025-04-05T23:09:54.776000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011763",
              "crash_point": 22.52,
              "time": "2025-04-05T23:09:54.776000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011840",
        "start_time": "2025-04-05T23:47:58.156000+05:30",
        "end_game_id": "8011841",
        "end_time": "2025-04-05T23:49:33.633000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011841",
              "crash_point": 147.66,
              "time": "2025-04-05T23:49:33.633000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011889",
        "start_time": "2025-04-06T00:10:44.353000+05:30",
        "end_game_id": "8011890",
        "end_time": "2025-04-06T00:11:51.138000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011890",
              "crash_point": 27.21,
              "time": "2025-04-06T00:11:51.138000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011891",
        "start_time": "2025-04-06T00:12:17.656000+05:30",
        "end_game_id": "8011892",
        "end_time": "2025-04-06T00:13:12.558000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011892",
              "crash_point": 13.53,
              "time": "2025-04-06T00:13:12.558000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8011946",
        "start_time": "2025-04-06T00:42:02.528000+05:30",
        "end_game_id": "8011947",
        "end_time": "2025-04-06T00:43:26.207000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011947",
              "crash_point": 72.37,
              "time": "2025-04-06T00:43:26.207000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012245",
        "start_time": "2025-04-06T03:03:34.281000+05:30",
        "end_game_id": "8012246",
        "end_time": "2025-04-06T03:04:46.319000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012246",
              "crash_point": 37.52,
              "time": "2025-04-06T03:04:46.319000+05:30"
            }
          ]
        }
      },
      {
        "start_game_id": "8012349",
        "start_time": "2025-04-06T03:51:00.134000+05:30",
        "end_game_id": "8012350",
        "end_time": "2025-04-06T03:51:17.832000+05:30",
        "length": 2,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8006247",
        "start_time": "2025-04-04T03:52:26.190000+05:30",
        "end_game_id": "8006247",
        "end_time": "2025-04-04T03:52:26.190000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8006279",
        "start_time": "2025-04-04T04:10:09.956000+05:30",
        "end_game_id": "8006279",
        "end_time": "2025-04-04T04:10:09.956000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8006604",
        "start_time": "2025-04-04T06:48:28.962000+05:30",
        "end_game_id": "8006604",
        "end_time": "2025-04-04T06:48:28.962000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8006661",
        "start_time": "2025-04-04T07:13:56.077000+05:30",
        "end_game_id": "8006661",
        "end_time": "2025-04-04T07:13:56.077000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8006719",
        "start_time": "2025-04-04T07:42:01.491000+05:30",
        "end_game_id": "8006719",
        "end_time": "2025-04-04T07:42:01.491000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8007152",
        "start_time": "2025-04-04T11:04:23.468000+05:30",
        "end_game_id": "8007152",
        "end_time": "2025-04-04T11:04:23.468000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8007216",
        "start_time": "2025-04-04T11:35:40.204000+05:30",
        "end_game_id": "8007216",
        "end_time": "2025-04-04T11:35:40.204000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8007221",
        "start_time": "2025-04-04T11:39:52.739000+05:30",
        "end_game_id": "8007221",
        "end_time": "2025-04-04T11:39:52.739000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8007268",
        "start_time": "2025-04-04T12:03:35.591000+05:30",
        "end_game_id": "8007268",
        "end_time": "2025-04-04T12:03:35.591000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8007334",
        "start_time": "2025-04-04T12:34:03.493000+05:30",
        "end_game_id": "8007334",
        "end_time": "2025-04-04T12:34:03.493000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8007397",
        "start_time": "2025-04-04T13:01:52.015000+05:30",
        "end_game_id": "8007397",
        "end_time": "2025-04-04T13:01:52.015000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8007415",
        "start_time": "2025-04-04T13:09:40.731000+05:30",
        "end_game_id": "8007415",
        "end_time": "2025-04-04T13:09:40.731000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8007416",
        "start_time": "2025-04-04T13:10:54.013000+05:30",
        "end_game_id": "8007416",
        "end_time": "2025-04-04T13:10:54.013000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8007568",
        "start_time": "2025-04-04T14:18:34.182000+05:30",
        "end_game_id": "8007568",
        "end_time": "2025-04-04T14:18:34.182000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8007643",
        "start_time": "2025-04-04T14:53:43.871000+05:30",
        "end_game_id": "8007643",
        "end_time": "2025-04-04T14:53:43.871000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8007757",
        "start_time": "2025-04-04T15:47:17.323000+05:30",
        "end_game_id": "8007757",
        "end_time": "2025-04-04T15:47:17.323000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8007922",
        "start_time": "2025-04-04T17:03:06.451000+05:30",
        "end_game_id": "8007922",
        "end_time": "2025-04-04T17:03:06.451000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8007954",
        "start_time": "2025-04-04T17:22:02.305000+05:30",
        "end_game_id": "8007954",
        "end_time": "2025-04-04T17:22:02.305000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8008019",
        "start_time": "2025-04-04T17:54:23.534000+05:30",
        "end_game_id": "8008019",
        "end_time": "2025-04-04T17:54:23.534000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8008167",
        "start_time": "2025-04-04T18:59:19.466000+05:30",
        "end_game_id": "8008167",
        "end_time": "2025-04-04T18:59:19.466000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8008215",
        "start_time": "2025-04-04T19:20:50.953000+05:30",
        "end_game_id": "8008215",
        "end_time": "2025-04-04T19:20:50.953000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8008453",
        "start_time": "2025-04-04T21:16:53.626000+05:30",
        "end_game_id": "8008453",
        "end_time": "2025-04-04T21:16:53.626000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8008535",
        "start_time": "2025-04-04T21:50:58.291000+05:30",
        "end_game_id": "8008535",
        "end_time": "2025-04-04T21:50:58.291000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8008538",
        "start_time": "2025-04-04T21:53:13.967000+05:30",
        "end_game_id": "8008538",
        "end_time": "2025-04-04T21:53:13.967000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8008647",
        "start_time": "2025-04-04T22:47:34.836000+05:30",
        "end_game_id": "8008647",
        "end_time": "2025-04-04T22:47:34.836000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8008663",
        "start_time": "2025-04-04T22:54:56.553000+05:30",
        "end_game_id": "8008663",
        "end_time": "2025-04-04T22:54:56.553000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8008776",
        "start_time": "2025-04-04T23:51:53.329000+05:30",
        "end_game_id": "8008776",
        "end_time": "2025-04-04T23:51:53.329000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8008850",
        "start_time": "2025-04-05T00:25:19.775000+05:30",
        "end_game_id": "8008850",
        "end_time": "2025-04-05T00:25:19.775000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8008942",
        "start_time": "2025-04-05T01:06:08.342000+05:30",
        "end_game_id": "8008942",
        "end_time": "2025-04-05T01:06:08.342000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8008950",
        "start_time": "2025-04-05T01:11:29.325000+05:30",
        "end_game_id": "8008950",
        "end_time": "2025-04-05T01:11:29.325000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8008980",
        "start_time": "2025-04-05T01:27:42.904000+05:30",
        "end_game_id": "8008980",
        "end_time": "2025-04-05T01:27:42.904000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8009004",
        "start_time": "2025-04-05T01:39:39.829000+05:30",
        "end_game_id": "8009004",
        "end_time": "2025-04-05T01:39:39.829000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8009211",
        "start_time": "2025-04-05T03:13:26.667000+05:30",
        "end_game_id": "8009211",
        "end_time": "2025-04-05T03:13:26.667000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8009258",
        "start_time": "2025-04-05T03:37:34.788000+05:30",
        "end_game_id": "8009258",
        "end_time": "2025-04-05T03:37:34.788000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8009448",
        "start_time": "2025-04-05T05:02:44.352000+05:30",
        "end_game_id": "8009448",
        "end_time": "2025-04-05T05:02:44.352000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8009452",
        "start_time": "2025-04-05T05:05:19.198000+05:30",
        "end_game_id": "8009452",
        "end_time": "2025-04-05T05:05:19.198000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8009459",
        "start_time": "2025-04-05T05:09:48.634000+05:30",
        "end_game_id": "8009459",
        "end_time": "2025-04-05T05:09:48.634000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8009467",
        "start_time": "2025-04-05T05:13:33.784000+05:30",
        "end_game_id": "8009467",
        "end_time": "2025-04-05T05:13:33.784000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8009527",
        "start_time": "2025-04-05T05:40:26.204000+05:30",
        "end_game_id": "8009527",
        "end_time": "2025-04-05T05:40:26.204000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8009561",
        "start_time": "2025-04-05T05:56:36.851000+05:30",
        "end_game_id": "8009561",
        "end_time": "2025-04-05T05:56:36.851000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8009808",
        "start_time": "2025-04-05T07:45:02.680000+05:30",
        "end_game_id": "8009808",
        "end_time": "2025-04-05T07:45:02.680000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8009919",
        "start_time": "2025-04-05T08:34:04.337000+05:30",
        "end_game_id": "8009919",
        "end_time": "2025-04-05T08:34:04.337000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8010061",
        "start_time": "2025-04-05T09:37:20.272000+05:30",
        "end_game_id": "8010061",
        "end_time": "2025-04-05T09:37:20.272000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8010062",
        "start_time": "2025-04-05T09:38:44.756000+05:30",
        "end_game_id": "8010062",
        "end_time": "2025-04-05T09:38:44.756000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8010112",
        "start_time": "2025-04-05T10:01:09.933000+05:30",
        "end_game_id": "8010112",
        "end_time": "2025-04-05T10:01:09.933000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8010167",
        "start_time": "2025-04-05T10:28:37.173000+05:30",
        "end_game_id": "8010167",
        "end_time": "2025-04-05T10:28:37.173000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8010183",
        "start_time": "2025-04-05T10:37:48.663000+05:30",
        "end_game_id": "8010183",
        "end_time": "2025-04-05T10:37:48.663000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8010264",
        "start_time": "2025-04-05T11:17:21.348000+05:30",
        "end_game_id": "8010264",
        "end_time": "2025-04-05T11:17:21.348000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8010403",
        "start_time": "2025-04-05T12:25:08.215000+05:30",
        "end_game_id": "8010403",
        "end_time": "2025-04-05T12:25:08.215000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8010480",
        "start_time": "2025-04-05T13:00:37.433000+05:30",
        "end_game_id": "8010480",
        "end_time": "2025-04-05T13:00:37.433000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8010662",
        "start_time": "2025-04-05T14:27:00.815000+05:30",
        "end_game_id": "8010662",
        "end_time": "2025-04-05T14:27:00.815000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8010735",
        "start_time": "2025-04-05T15:01:16.822000+05:30",
        "end_game_id": "8010735",
        "end_time": "2025-04-05T15:01:16.822000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8010743",
        "start_time": "2025-04-05T15:07:10.824000+05:30",
        "end_game_id": "8010743",
        "end_time": "2025-04-05T15:07:10.824000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8010750",
        "start_time": "2025-04-05T15:11:59.737000+05:30",
        "end_game_id": "8010750",
        "end_time": "2025-04-05T15:11:59.737000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8010868",
        "start_time": "2025-04-05T16:07:36.039000+05:30",
        "end_game_id": "8010868",
        "end_time": "2025-04-05T16:07:36.039000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8010869",
        "start_time": "2025-04-05T16:08:34.805000+05:30",
        "end_game_id": "8010869",
        "end_time": "2025-04-05T16:08:34.805000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8010934",
        "start_time": "2025-04-05T16:39:34.719000+05:30",
        "end_game_id": "8010934",
        "end_time": "2025-04-05T16:39:34.719000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8010935",
        "start_time": "2025-04-05T16:41:27.443000+05:30",
        "end_game_id": "8010935",
        "end_time": "2025-04-05T16:41:27.443000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011025",
        "start_time": "2025-04-05T17:27:00.637000+05:30",
        "end_game_id": "8011025",
        "end_time": "2025-04-05T17:27:00.637000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011601",
        "start_time": "2025-04-05T21:49:13.252000+05:30",
        "end_game_id": "8011601",
        "end_time": "2025-04-05T21:49:13.252000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011649",
        "start_time": "2025-04-05T22:12:51.198000+05:30",
        "end_game_id": "8011649",
        "end_time": "2025-04-05T22:12:51.198000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011727",
        "start_time": "2025-04-05T22:50:54.114000+05:30",
        "end_game_id": "8011727",
        "end_time": "2025-04-05T22:50:54.114000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011761",
        "start_time": "2025-04-05T23:08:37.960000+05:30",
        "end_game_id": "8011761",
        "end_time": "2025-04-05T23:08:37.960000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011781",
        "start_time": "2025-04-05T23:19:39.318000+05:30",
        "end_game_id": "8011781",
        "end_time": "2025-04-05T23:19:39.318000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011824",
        "start_time": "2025-04-05T23:38:50.679000+05:30",
        "end_game_id": "8011824",
        "end_time": "2025-04-05T23:38:50.679000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011845",
        "start_time": "2025-04-05T23:52:20.435000+05:30",
        "end_game_id": "8011845",
        "end_time": "2025-04-05T23:52:20.435000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011927",
        "start_time": "2025-04-06T00:31:54.755000+05:30",
        "end_game_id": "8011927",
        "end_time": "2025-04-06T00:31:54.755000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011992",
        "start_time": "2025-04-06T01:07:50.502000+05:30",
        "end_game_id": "8011992",
        "end_time": "2025-04-06T01:07:50.502000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8012195",
        "start_time": "2025-04-06T02:40:51.748000+05:30",
        "end_game_id": "8012195",
        "end_time": "2025-04-06T02:40:51.748000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8012253",
        "start_time": "2025-04-06T03:09:09.226000+05:30",
        "end_game_id": "8012253",
        "end_time": "2025-04-06T03:09:09.226000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8012278",
        "start_time": "2025-04-06T03:20:39.290000+05:30",
        "end_game_id": "8012278",
        "end_time": "2025-04-06T03:20:39.290000+05:30",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      }
    ]
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 29421  100 29421    0     0   5794      0  0:00:05  0:00:05 --:--:--  6037
{
  "status": "success",
  "data": {
    "min_value": 10.0,
    "limit": 1000,
    "sort_by": "time",
    "count": 102,
    "series": [
      {
        "start_game_id": "8012349",
        "start_time": "2025-04-05T18:21:00.134000-04:00",
        "end_game_id": "8012350",
        "end_time": "2025-04-05T18:21:17.832000-04:00",
        "length": 2,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8012334",
        "start_time": "2025-04-05T18:14:07.831000-04:00",
        "end_game_id": "8012348",
        "end_time": "2025-04-05T18:20:27.602000-04:00",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012348",
              "crash_point": 22.38,
              "time": "2025-04-05T18:20:27.602000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012326",
        "start_time": "2025-04-05T18:10:21.478000-04:00",
        "end_game_id": "8012333",
        "end_time": "2025-04-05T18:13:40.472000-04:00",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012333",
              "crash_point": 26.01,
              "time": "2025-04-05T18:13:40.472000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012317",
        "start_time": "2025-04-05T18:06:59.012000-04:00",
        "end_game_id": "8012325",
        "end_time": "2025-04-05T18:10:08.152000-04:00",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012325",
              "crash_point": 15.58,
              "time": "2025-04-05T18:10:08.152000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012310",
        "start_time": "2025-04-05T18:04:04.566000-04:00",
        "end_game_id": "8012316",
        "end_time": "2025-04-05T18:06:46.340000-04:00",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012316",
              "crash_point": 17.23,
              "time": "2025-04-05T18:06:46.340000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012279",
        "start_time": "2025-04-05T17:50:53.920000-04:00",
        "end_game_id": "8012309",
        "end_time": "2025-04-05T18:03:32.836000-04:00",
        "length": 31,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012309",
              "crash_point": 86.46,
              "time": "2025-04-05T18:03:32.836000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012278",
        "start_time": "2025-04-05T17:50:39.290000-04:00",
        "end_game_id": "8012278",
        "end_time": "2025-04-05T17:50:39.290000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8012254",
        "start_time": "2025-04-05T17:39:22.780000-04:00",
        "end_game_id": "8012277",
        "end_time": "2025-04-05T17:49:04.009000-04:00",
        "length": 24,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012277",
              "crash_point": 21.76,
              "time": "2025-04-05T17:49:04.009000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012253",
        "start_time": "2025-04-05T17:39:09.226000-04:00",
        "end_game_id": "8012253",
        "end_time": "2025-04-05T17:39:09.226000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8012247",
        "start_time": "2025-04-05T17:35:10.824000-04:00",
        "end_game_id": "8012252",
        "end_time": "2025-04-05T17:38:08.297000-04:00",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012252",
              "crash_point": 11.1,
              "time": "2025-04-05T17:38:08.297000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012245",
        "start_time": "2025-04-05T17:33:34.281000-04:00",
        "end_game_id": "8012246",
        "end_time": "2025-04-05T17:34:46.319000-04:00",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012246",
              "crash_point": 37.52,
              "time": "2025-04-05T17:34:46.319000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012206",
        "start_time": "2025-04-05T17:16:37.401000-04:00",
        "end_game_id": "8012244",
        "end_time": "2025-04-05T17:32:52.985000-04:00",
        "length": 39,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012244",
              "crash_point": 95.86,
              "time": "2025-04-05T17:32:52.985000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012196",
        "start_time": "2025-04-05T17:11:26.124000-04:00",
        "end_game_id": "8012205",
        "end_time": "2025-04-05T17:16:25.480000-04:00",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012205",
              "crash_point": 24.39,
              "time": "2025-04-05T17:16:25.480000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012195",
        "start_time": "2025-04-05T17:10:51.748000-04:00",
        "end_game_id": "8012195",
        "end_time": "2025-04-05T17:10:51.748000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8012187",
        "start_time": "2025-04-05T17:06:23.824000-04:00",
        "end_game_id": "8012194",
        "end_time": "2025-04-05T17:09:51.187000-04:00",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012194",
              "crash_point": 22.64,
              "time": "2025-04-05T17:09:51.187000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012170",
        "start_time": "2025-04-05T16:56:51.253000-04:00",
        "end_game_id": "8012186",
        "end_time": "2025-04-05T17:05:58.915000-04:00",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012186",
              "crash_point": 12.46,
              "time": "2025-04-05T17:05:58.915000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012153",
        "start_time": "2025-04-05T16:50:24.993000-04:00",
        "end_game_id": "8012169",
        "end_time": "2025-04-05T16:56:28.238000-04:00",
        "length": 17,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012169",
              "crash_point": 10.49,
              "time": "2025-04-05T16:56:28.238000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012138",
        "start_time": "2025-04-05T16:43:45.899000-04:00",
        "end_game_id": "8012152",
        "end_time": "2025-04-05T16:49:56.810000-04:00",
        "length": 15,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012152",
              "crash_point": 88.23,
              "time": "2025-04-05T16:49:56.810000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012129",
        "start_time": "2025-04-05T16:39:38.492000-04:00",
        "end_game_id": "8012137",
        "end_time": "2025-04-05T16:43:23.690000-04:00",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012137",
              "crash_point": 51.16,
              "time": "2025-04-05T16:43:23.690000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012122",
        "start_time": "2025-04-05T16:36:17.155000-04:00",
        "end_game_id": "8012128",
        "end_time": "2025-04-05T16:39:02.532000-04:00",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012128",
              "crash_point": 12.04,
              "time": "2025-04-05T16:39:02.532000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012092",
        "start_time": "2025-04-05T16:24:14.812000-04:00",
        "end_game_id": "8012121",
        "end_time": "2025-04-05T16:35:51.998000-04:00",
        "length": 30,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012121",
              "crash_point": 30.9,
              "time": "2025-04-05T16:35:51.998000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012066",
        "start_time": "2025-04-05T16:14:42.258000-04:00",
        "end_game_id": "8012091",
        "end_time": "2025-04-05T16:23:29.096000-04:00",
        "length": 26,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012091",
              "crash_point": 22.52,
              "time": "2025-04-05T16:23:29.096000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012062",
        "start_time": "2025-04-05T16:11:43.271000-04:00",
        "end_game_id": "8012065",
        "end_time": "2025-04-05T16:14:19.163000-04:00",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012065",
              "crash_point": 176.28,
              "time": "2025-04-05T16:14:19.163000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012058",
        "start_time": "2025-04-05T16:09:17.948000-04:00",
        "end_game_id": "8012061",
        "end_time": "2025-04-05T16:11:14.171000-04:00",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012061",
              "crash_point": 54.98,
              "time": "2025-04-05T16:11:14.171000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012055",
        "start_time": "2025-04-05T16:07:54.634000-04:00",
        "end_game_id": "8012057",
        "end_time": "2025-04-05T16:09:04.041000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012057",
              "crash_point": 11.38,
              "time": "2025-04-05T16:09:04.041000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012044",
        "start_time": "2025-04-05T16:01:55.126000-04:00",
        "end_game_id": "8012054",
        "end_time": "2025-04-05T16:07:37.085000-04:00",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012054",
              "crash_point": 110.32,
              "time": "2025-04-05T16:07:37.085000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012037",
        "start_time": "2025-04-05T15:58:53.088000-04:00",
        "end_game_id": "8012043",
        "end_time": "2025-04-05T16:01:25.902000-04:00",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012043",
              "crash_point": 20.58,
              "time": "2025-04-05T16:01:25.902000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012014",
        "start_time": "2025-04-05T15:50:02.600000-04:00",
        "end_game_id": "8012036",
        "end_time": "2025-04-05T15:58:34.365000-04:00",
        "length": 23,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012036",
              "crash_point": 12.01,
              "time": "2025-04-05T15:58:34.365000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012007",
        "start_time": "2025-04-05T15:46:22.591000-04:00",
        "end_game_id": "8012013",
        "end_time": "2025-04-05T15:49:49.732000-04:00",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012013",
              "crash_point": 10.69,
              "time": "2025-04-05T15:49:49.732000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8012001",
        "start_time": "2025-04-05T15:42:20.407000-04:00",
        "end_game_id": "8012006",
        "end_time": "2025-04-05T15:45:56.652000-04:00",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012006",
              "crash_point": 206.76,
              "time": "2025-04-05T15:45:56.652000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011993",
        "start_time": "2025-04-05T15:38:14.315000-04:00",
        "end_game_id": "8012000",
        "end_time": "2025-04-05T15:41:49.828000-04:00",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8012000",
              "crash_point": 103.17,
              "time": "2025-04-05T15:41:49.828000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011992",
        "start_time": "2025-04-05T15:37:50.502000-04:00",
        "end_game_id": "8011992",
        "end_time": "2025-04-05T15:37:50.502000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011985",
        "start_time": "2025-04-05T15:32:54.576000-04:00",
        "end_game_id": "8011991",
        "end_time": "2025-04-05T15:36:53.691000-04:00",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011991",
              "crash_point": 33.73,
              "time": "2025-04-05T15:36:53.691000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011982",
        "start_time": "2025-04-05T15:31:01.690000-04:00",
        "end_game_id": "8011984",
        "end_time": "2025-04-05T15:32:22.055000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011984",
              "crash_point": 13.59,
              "time": "2025-04-05T15:32:22.055000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011971",
        "start_time": "2025-04-05T15:26:45.712000-04:00",
        "end_game_id": "8011981",
        "end_time": "2025-04-05T15:30:45.453000-04:00",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011981",
              "crash_point": 12.28,
              "time": "2025-04-05T15:30:45.453000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011955",
        "start_time": "2025-04-05T15:18:00.086000-04:00",
        "end_game_id": "8011970",
        "end_time": "2025-04-05T15:26:26.283000-04:00",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011970",
              "crash_point": 628.94,
              "time": "2025-04-05T15:26:26.283000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011948",
        "start_time": "2025-04-05T15:14:06.387000-04:00",
        "end_game_id": "8011954",
        "end_time": "2025-04-05T15:17:46.202000-04:00",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011954",
              "crash_point": 66.41,
              "time": "2025-04-05T15:17:46.202000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011946",
        "start_time": "2025-04-05T15:12:02.528000-04:00",
        "end_game_id": "8011947",
        "end_time": "2025-04-05T15:13:26.207000-04:00",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011947",
              "crash_point": 72.37,
              "time": "2025-04-05T15:13:26.207000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011939",
        "start_time": "2025-04-05T15:07:55.450000-04:00",
        "end_game_id": "8011945",
        "end_time": "2025-04-05T15:11:47.691000-04:00",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011945",
              "crash_point": 81.5,
              "time": "2025-04-05T15:11:47.691000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011928",
        "start_time": "2025-04-05T15:02:11.541000-04:00",
        "end_game_id": "8011938",
        "end_time": "2025-04-05T15:07:42.837000-04:00",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011938",
              "crash_point": 3970.14,
              "time": "2025-04-05T15:07:42.837000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011927",
        "start_time": "2025-04-05T15:01:54.755000-04:00",
        "end_game_id": "8011927",
        "end_time": "2025-04-05T15:01:54.755000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011924",
        "start_time": "2025-04-05T14:58:49.027000-04:00",
        "end_game_id": "8011926",
        "end_time": "2025-04-05T15:00:17.830000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011926",
              "crash_point": 14.86,
              "time": "2025-04-05T15:00:17.830000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011920",
        "start_time": "2025-04-05T14:56:40.629000-04:00",
        "end_game_id": "8011923",
        "end_time": "2025-04-05T14:58:30.849000-04:00",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011923",
              "crash_point": 11.69,
              "time": "2025-04-05T14:58:30.849000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011916",
        "start_time": "2025-04-05T14:54:39.088000-04:00",
        "end_game_id": "8011919",
        "end_time": "2025-04-05T14:56:10.097000-04:00",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011919",
              "crash_point": 15.79,
              "time": "2025-04-05T14:56:10.097000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011912",
        "start_time": "2025-04-05T14:51:24.633000-04:00",
        "end_game_id": "8011915",
        "end_time": "2025-04-05T14:53:49.667000-04:00",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011915",
              "crash_point": 94.01,
              "time": "2025-04-05T14:53:49.667000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011893",
        "start_time": "2025-04-05T14:43:33.300000-04:00",
        "end_game_id": "8011911",
        "end_time": "2025-04-05T14:51:06.858000-04:00",
        "length": 19,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011911",
              "crash_point": 10.25,
              "time": "2025-04-05T14:51:06.858000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011891",
        "start_time": "2025-04-05T14:42:17.656000-04:00",
        "end_game_id": "8011892",
        "end_time": "2025-04-05T14:43:12.558000-04:00",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011892",
              "crash_point": 13.53,
              "time": "2025-04-05T14:43:12.558000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011889",
        "start_time": "2025-04-05T14:40:44.353000-04:00",
        "end_game_id": "8011890",
        "end_time": "2025-04-05T14:41:51.138000-04:00",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011890",
              "crash_point": 27.21,
              "time": "2025-04-05T14:41:51.138000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011855",
        "start_time": "2025-04-05T14:27:08.131000-04:00",
        "end_game_id": "8011888",
        "end_time": "2025-04-05T14:40:21.183000-04:00",
        "length": 34,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011888",
              "crash_point": 11.03,
              "time": "2025-04-05T14:40:21.183000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011846",
        "start_time": "2025-04-05T14:22:38.163000-04:00",
        "end_game_id": "8011854",
        "end_time": "2025-04-05T14:26:39.862000-04:00",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011854",
              "crash_point": 19.04,
              "time": "2025-04-05T14:26:39.862000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011845",
        "start_time": "2025-04-05T14:22:20.435000-04:00",
        "end_game_id": "8011845",
        "end_time": "2025-04-05T14:22:20.435000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011842",
        "start_time": "2025-04-05T14:20:00.292000-04:00",
        "end_game_id": "8011844",
        "end_time": "2025-04-05T14:21:29.285000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011844",
              "crash_point": 40.7,
              "time": "2025-04-05T14:21:29.285000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011840",
        "start_time": "2025-04-05T14:17:58.156000-04:00",
        "end_game_id": "8011841",
        "end_time": "2025-04-05T14:19:33.633000-04:00",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011841",
              "crash_point": 147.66,
              "time": "2025-04-05T14:19:33.633000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011834",
        "start_time": "2025-04-05T14:14:29.667000-04:00",
        "end_game_id": "8011839",
        "end_time": "2025-04-05T14:17:36.950000-04:00",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011839",
              "crash_point": 56.96,
              "time": "2025-04-05T14:17:36.950000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011825",
        "start_time": "2025-04-05T14:09:11.229000-04:00",
        "end_game_id": "8011833",
        "end_time": "2025-04-05T14:13:39.835000-04:00",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011833",
              "crash_point": 326.82,
              "time": "2025-04-05T14:13:39.835000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011824",
        "start_time": "2025-04-05T14:08:50.679000-04:00",
        "end_game_id": "8011824",
        "end_time": "2025-04-05T14:08:50.679000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011813",
        "start_time": "2025-04-05T14:03:25.182000-04:00",
        "end_game_id": "8011823",
        "end_time": "2025-04-05T14:07:33.954000-04:00",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011823",
              "crash_point": 13.34,
              "time": "2025-04-05T14:07:33.954000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011809",
        "start_time": "2025-04-05T14:01:04.811000-04:00",
        "end_game_id": "8011812",
        "end_time": "2025-04-05T14:02:58.984000-04:00",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011812",
              "crash_point": 19.13,
              "time": "2025-04-05T14:02:58.984000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011782",
        "start_time": "2025-04-05T13:49:51.321000-04:00",
        "end_game_id": "8011808",
        "end_time": "2025-04-05T14:00:51.709000-04:00",
        "length": 27,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011808",
              "crash_point": 14.89,
              "time": "2025-04-05T14:00:51.709000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011781",
        "start_time": "2025-04-05T13:49:39.318000-04:00",
        "end_game_id": "8011781",
        "end_time": "2025-04-05T13:49:39.318000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011768",
        "start_time": "2025-04-05T13:42:37.810000-04:00",
        "end_game_id": "8011780",
        "end_time": "2025-04-05T13:48:40.593000-04:00",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011780",
              "crash_point": 11.01,
              "time": "2025-04-05T13:48:40.593000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011764",
        "start_time": "2025-04-05T13:40:16.525000-04:00",
        "end_game_id": "8011767",
        "end_time": "2025-04-05T13:41:50.501000-04:00",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011767",
              "crash_point": 12.43,
              "time": "2025-04-05T13:41:50.501000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011762",
        "start_time": "2025-04-05T13:38:50.864000-04:00",
        "end_game_id": "8011763",
        "end_time": "2025-04-05T13:39:54.776000-04:00",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011763",
              "crash_point": 22.52,
              "time": "2025-04-05T13:39:54.776000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011761",
        "start_time": "2025-04-05T13:38:37.960000-04:00",
        "end_game_id": "8011761",
        "end_time": "2025-04-05T13:38:37.960000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011743",
        "start_time": "2025-04-05T13:29:14.878000-04:00",
        "end_game_id": "8011760",
        "end_time": "2025-04-05T13:37:29.679000-04:00",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011760",
              "crash_point": 38.67,
              "time": "2025-04-05T13:37:29.679000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011735",
        "start_time": "2025-04-05T13:25:09.426000-04:00",
        "end_game_id": "8011742",
        "end_time": "2025-04-05T13:28:55.833000-04:00",
        "length": 8,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011742",
              "crash_point": 26.48,
              "time": "2025-04-05T13:28:55.833000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011728",
        "start_time": "2025-04-05T13:21:20.351000-04:00",
        "end_game_id": "8011734",
        "end_time": "2025-04-05T13:24:47.713000-04:00",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011734",
              "crash_point": 476.12,
              "time": "2025-04-05T13:24:47.713000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011727",
        "start_time": "2025-04-05T13:20:54.114000-04:00",
        "end_game_id": "8011727",
        "end_time": "2025-04-05T13:20:54.114000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011723",
        "start_time": "2025-04-05T13:16:48.090000-04:00",
        "end_game_id": "8011726",
        "end_time": "2025-04-05T13:19:20.588000-04:00",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011726",
              "crash_point": 19.62,
              "time": "2025-04-05T13:19:20.588000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011709",
        "start_time": "2025-04-05T13:09:39.031000-04:00",
        "end_game_id": "8011722",
        "end_time": "2025-04-05T13:16:35.130000-04:00",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011722",
              "crash_point": 12.37,
              "time": "2025-04-05T13:16:35.130000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011679",
        "start_time": "2025-04-05T12:57:12.868000-04:00",
        "end_game_id": "8011708",
        "end_time": "2025-04-05T13:09:19.494000-04:00",
        "length": 30,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011708",
              "crash_point": 11.28,
              "time": "2025-04-05T13:09:19.494000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011669",
        "start_time": "2025-04-05T12:52:36.939000-04:00",
        "end_game_id": "8011678",
        "end_time": "2025-04-05T12:56:46.825000-04:00",
        "length": 10,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011678",
              "crash_point": 11.11,
              "time": "2025-04-05T12:56:46.825000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011664",
        "start_time": "2025-04-05T12:49:29.974000-04:00",
        "end_game_id": "8011668",
        "end_time": "2025-04-05T12:52:18.419000-04:00",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011668",
              "crash_point": 15.08,
              "time": "2025-04-05T12:52:18.419000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011650",
        "start_time": "2025-04-05T12:43:39.909000-04:00",
        "end_game_id": "8011663",
        "end_time": "2025-04-05T12:49:14.281000-04:00",
        "length": 14,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011663",
              "crash_point": 51.42,
              "time": "2025-04-05T12:49:14.281000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011649",
        "start_time": "2025-04-05T12:42:51.198000-04:00",
        "end_game_id": "8011649",
        "end_time": "2025-04-05T12:42:51.198000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011645",
        "start_time": "2025-04-05T12:39:01.324000-04:00",
        "end_game_id": "8011648",
        "end_time": "2025-04-05T12:41:10.787000-04:00",
        "length": 4,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011648",
              "crash_point": 102.15,
              "time": "2025-04-05T12:41:10.787000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011642",
        "start_time": "2025-04-05T12:37:07.415000-04:00",
        "end_game_id": "8011644",
        "end_time": "2025-04-05T12:38:47.208000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011644",
              "crash_point": 65.72,
              "time": "2025-04-05T12:38:47.208000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011608",
        "start_time": "2025-04-05T12:22:16.742000-04:00",
        "end_game_id": "8011641",
        "end_time": "2025-04-05T12:36:35.345000-04:00",
        "length": 34,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011641",
              "crash_point": 136.57,
              "time": "2025-04-05T12:36:35.345000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011602",
        "start_time": "2025-04-05T12:19:37.477000-04:00",
        "end_game_id": "8011607",
        "end_time": "2025-04-05T12:22:03.796000-04:00",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011607",
              "crash_point": 15.02,
              "time": "2025-04-05T12:22:03.796000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011601",
        "start_time": "2025-04-05T12:19:13.252000-04:00",
        "end_game_id": "8011601",
        "end_time": "2025-04-05T12:19:13.252000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      },
      {
        "start_game_id": "8011577",
        "start_time": "2025-04-05T12:08:53.085000-04:00",
        "end_game_id": "8011600",
        "end_time": "2025-04-05T12:18:00.702000-04:00",
        "length": 24,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011600",
              "crash_point": 110.74,
              "time": "2025-04-05T12:18:00.702000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011551",
        "start_time": "2025-04-05T11:56:43.081000-04:00",
        "end_game_id": "8011576",
        "end_time": "2025-04-05T12:08:25.707000-04:00",
        "length": 26,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011576",
              "crash_point": 41.09,
              "time": "2025-04-05T12:08:25.707000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011546",
        "start_time": "2025-04-05T11:54:06.322000-04:00",
        "end_game_id": "8011550",
        "end_time": "2025-04-05T11:56:23.961000-04:00",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011550",
              "crash_point": 46.51,
              "time": "2025-04-05T11:56:23.961000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011541",
        "start_time": "2025-04-05T11:51:26.935000-04:00",
        "end_game_id": "8011545",
        "end_time": "2025-04-05T11:53:47.378000-04:00",
        "length": 5,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011545",
              "crash_point": 12.8,
              "time": "2025-04-05T11:53:47.378000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011528",
        "start_time": "2025-04-05T11:45:54.664000-04:00",
        "end_game_id": "8011540",
        "end_time": "2025-04-05T11:51:13.587000-04:00",
        "length": 13,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011540",
              "crash_point": 33.79,
              "time": "2025-04-05T11:51:13.587000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011526",
        "start_time": "2025-04-05T11:44:31.003000-04:00",
        "end_game_id": "8011527",
        "end_time": "2025-04-05T11:45:26.269000-04:00",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011527",
              "crash_point": 12.63,
              "time": "2025-04-05T11:45:26.269000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011520",
        "start_time": "2025-04-05T11:42:11.323000-04:00",
        "end_game_id": "8011525",
        "end_time": "2025-04-05T11:44:18.468000-04:00",
        "length": 6,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011525",
              "crash_point": 22.81,
              "time": "2025-04-05T11:44:18.468000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011511",
        "start_time": "2025-04-05T11:36:55.547000-04:00",
        "end_game_id": "8011519",
        "end_time": "2025-04-05T11:41:46.181000-04:00",
        "length": 9,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011519",
              "crash_point": 34.14,
              "time": "2025-04-05T11:41:46.181000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011508",
        "start_time": "2025-04-05T11:35:06.024000-04:00",
        "end_game_id": "8011510",
        "end_time": "2025-04-05T11:36:39.164000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011510",
              "crash_point": 29.15,
              "time": "2025-04-05T11:36:39.164000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011484",
        "start_time": "2025-04-05T11:25:32.567000-04:00",
        "end_game_id": "8011507",
        "end_time": "2025-04-05T11:34:49.414000-04:00",
        "length": 24,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011507",
              "crash_point": 11.89,
              "time": "2025-04-05T11:34:49.414000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011481",
        "start_time": "2025-04-05T11:24:10.357000-04:00",
        "end_game_id": "8011483",
        "end_time": "2025-04-05T11:25:17.373000-04:00",
        "length": 3,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011483",
              "crash_point": 10.75,
              "time": "2025-04-05T11:25:17.373000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011470",
        "start_time": "2025-04-05T11:18:58.138000-04:00",
        "end_game_id": "8011480",
        "end_time": "2025-04-05T11:23:49.006000-04:00",
        "length": 11,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011480",
              "crash_point": 12.52,
              "time": "2025-04-05T11:23:49.006000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011468",
        "start_time": "2025-04-05T11:17:20.802000-04:00",
        "end_game_id": "8011469",
        "end_time": "2025-04-05T11:18:23.260000-04:00",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011469",
              "crash_point": 21.03,
              "time": "2025-04-05T11:18:23.260000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011461",
        "start_time": "2025-04-05T11:13:31.912000-04:00",
        "end_game_id": "8011467",
        "end_time": "2025-04-05T11:16:56.043000-04:00",
        "length": 7,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011467",
              "crash_point": 19.73,
              "time": "2025-04-05T11:16:56.043000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011441",
        "start_time": "2025-04-05T11:04:32.718000-04:00",
        "end_game_id": "8011460",
        "end_time": "2025-04-05T11:13:19.276000-04:00",
        "length": 20,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011460",
              "crash_point": 19.46,
              "time": "2025-04-05T11:13:19.276000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011439",
        "start_time": "2025-04-05T11:03:26.253000-04:00",
        "end_game_id": "8011440",
        "end_time": "2025-04-05T11:04:20.146000-04:00",
        "length": 2,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011440",
              "crash_point": 12.57,
              "time": "2025-04-05T11:04:20.146000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011427",
        "start_time": "2025-04-05T10:58:37.737000-04:00",
        "end_game_id": "8011438",
        "end_time": "2025-04-05T11:03:01.531000-04:00",
        "length": 12,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011438",
              "crash_point": 22.18,
              "time": "2025-04-05T11:03:01.531000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011406",
        "start_time": "2025-04-05T10:50:10.823000-04:00",
        "end_game_id": "8011426",
        "end_time": "2025-04-05T10:58:21.739000-04:00",
        "length": 21,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011426",
              "crash_point": 16.79,
              "time": "2025-04-05T10:58:21.739000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011386",
        "start_time": "2025-04-05T10:41:30.284000-04:00",
        "end_game_id": "8011405",
        "end_time": "2025-04-05T10:49:36.216000-04:00",
        "length": 20,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011405",
              "crash_point": 10.81,
              "time": "2025-04-05T10:49:36.216000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011370",
        "start_time": "2025-04-05T10:34:11.700000-04:00",
        "end_game_id": "8011385",
        "end_time": "2025-04-05T10:40:43.856000-04:00",
        "length": 16,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011385",
              "crash_point": 13.57,
              "time": "2025-04-05T10:40:43.856000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011352",
        "start_time": "2025-04-05T10:25:24.778000-04:00",
        "end_game_id": "8011369",
        "end_time": "2025-04-05T10:33:52.440000-04:00",
        "length": 18,
        "follow_streak": {
          "count": 1,
          "games": [
            {
              "game_id": "8011369",
              "crash_point": 19.44,
              "time": "2025-04-05T10:33:52.440000-04:00"
            }
          ]
        }
      },
      {
        "start_game_id": "8011351",
        "start_time": "2025-04-05T10:25:02.598000-04:00",
        "end_game_id": "8011351",
        "end_time": "2025-04-05T10:25:02.598000-04:00",
        "length": 1,
        "follow_streak": {
          "count": 0,
          "games": []
        }
      }
    ]
  }
}
```
