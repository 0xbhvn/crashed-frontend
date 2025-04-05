# Get occurrences

```bash
# Get occurrences of crash points >= 10 in 10-minute intervals over 24 hours
curl -X GET "https://crashed-backend-production.up.railway.app/api/analytics/intervals/min-crash-point/10" | jq .

# Get occurrences of crash points >= 10 in 15-minute intervals over 48 hours
curl -X GET "https://crashed-backend-production.up.railway.app/api/analytics/intervals/min-crash-point/10?interval_minutes=15&hours=48" | jq .

# Get occurrences of crash points >= 10 in sets of 10 games over last 1000 games
curl -X GET "https://crashed-backend-production.up.railway.app/api/analytics/intervals/min-crash-point/10/game-sets" | jq . 

# Get occurrences of crash points >= 10 in sets of 20 games over last 2000 games
curl -X GET "https://crashed-backend-production.up.railway.app/api/analytics/intervals/min-crash-point/10/game-sets?games_per_set=20&total_games=2000" | jq .

# Get occurrences of multiple crash points in time intervals (batch request)
curl -X POST "https://crashed-backend-production.up.railway.app/api/analytics/intervals/min-crash-points" \
  -H "Content-Type: application/json" \
  -d '{
    "values": [2, 5, 10, 20],
    "interval_minutes": 15,
    "hours": 24
  }' | jq .

# Get occurrences of multiple crash points in game sets (batch request)
curl -X POST "https://crashed-backend-production.up.railway.app/api/analytics/intervals/min-crash-points/game-sets" \
  -H "Content-Type: application/json" \
  -d '{
    "values": [2, 5, 10, 20],
    "games_per_set": 20,
    "total_games": 1000
  }' | jq .
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 22630  100 22630    0     0  10574      0  0:00:02  0:00:02 --:--:-- 10579
{
  "status": "success",
  "data": {
    "min_value": 10.0,
    "interval_minutes": 10,
    "hours": 24,
    "count": 145,
    "intervals": [
      {
        "interval_start": "2025-04-04T23:20:00+05:30",
        "interval_end": "2025-04-04T23:30:00+05:30",
        "count": 1,
        "total_games": 21,
        "percentage": 4.761904761904762
      },
      {
        "interval_start": "2025-04-04T23:30:00+05:30",
        "interval_end": "2025-04-04T23:40:00+05:30",
        "count": 5,
        "total_games": 17,
        "percentage": 29.411764705882355
      },
      {
        "interval_start": "2025-04-04T23:40:00+05:30",
        "interval_end": "2025-04-04T23:50:00+05:30",
        "count": 1,
        "total_games": 21,
        "percentage": 4.761904761904762
      },
      {
        "interval_start": "2025-04-04T23:50:00+05:30",
        "interval_end": "2025-04-05T00:00:00+05:30",
        "count": 5,
        "total_games": 19,
        "percentage": 26.31578947368421
      },
      {
        "interval_start": "2025-04-05T00:00:00+05:30",
        "interval_end": "2025-04-05T00:10:00+05:30",
        "count": 2,
        "total_games": 22,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-04-05T00:10:00+05:30",
        "interval_end": "2025-04-05T00:20:00+05:30",
        "count": 1,
        "total_games": 23,
        "percentage": 4.3478260869565215
      },
      {
        "interval_start": "2025-04-05T00:20:00+05:30",
        "interval_end": "2025-04-05T00:30:00+05:30",
        "count": 3,
        "total_games": 24,
        "percentage": 12.5
      },
      {
        "interval_start": "2025-04-05T00:30:00+05:30",
        "interval_end": "2025-04-05T00:40:00+05:30",
        "count": 0,
        "total_games": 24,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-04-05T00:40:00+05:30",
        "interval_end": "2025-04-05T00:50:00+05:30",
        "count": 1,
        "total_games": 24,
        "percentage": 4.166666666666666
      },
      {
        "interval_start": "2025-04-05T00:50:00+05:30",
        "interval_end": "2025-04-05T01:00:00+05:30",
        "count": 2,
        "total_games": 18,
        "percentage": 11.11111111111111
      },
      {
        "interval_start": "2025-04-05T01:00:00+05:30",
        "interval_end": "2025-04-05T01:10:00+05:30",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-04-05T01:10:00+05:30",
        "interval_end": "2025-04-05T01:20:00+05:30",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "interval_start": "2025-04-05T01:20:00+05:30",
        "interval_end": "2025-04-05T01:30:00+05:30",
        "count": 4,
        "total_games": 18,
        "percentage": 22.22222222222222
      },
      {
        "interval_start": "2025-04-05T01:30:00+05:30",
        "interval_end": "2025-04-05T01:40:00+05:30",
        "count": 3,
        "total_games": 18,
        "percentage": 16.666666666666664
      },
      {
        "interval_start": "2025-04-05T01:40:00+05:30",
        "interval_end": "2025-04-05T01:50:00+05:30",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-04-05T01:50:00+05:30",
        "interval_end": "2025-04-05T02:00:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-04-05T02:00:00+05:30",
        "interval_end": "2025-04-05T02:10:00+05:30",
        "count": 1,
        "total_games": 21,
        "percentage": 4.761904761904762
      },
      {
        "interval_start": "2025-04-05T02:10:00+05:30",
        "interval_end": "2025-04-05T02:20:00+05:30",
        "count": 3,
        "total_games": 21,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-04-05T02:20:00+05:30",
        "interval_end": "2025-04-05T02:30:00+05:30",
        "count": 2,
        "total_games": 24,
        "percentage": 8.333333333333332
      },
      {
        "interval_start": "2025-04-05T02:30:00+05:30",
        "interval_end": "2025-04-05T02:40:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-04-05T02:40:00+05:30",
        "interval_end": "2025-04-05T02:50:00+05:30",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "interval_start": "2025-04-05T02:50:00+05:30",
        "interval_end": "2025-04-05T03:00:00+05:30",
        "count": 1,
        "total_games": 25,
        "percentage": 4.0
      },
      {
        "interval_start": "2025-04-05T03:00:00+05:30",
        "interval_end": "2025-04-05T03:10:00+05:30",
        "count": 1,
        "total_games": 26,
        "percentage": 3.8461538461538463
      },
      {
        "interval_start": "2025-04-05T03:10:00+05:30",
        "interval_end": "2025-04-05T03:20:00+05:30",
        "count": 4,
        "total_games": 19,
        "percentage": 21.052631578947366
      },
      {
        "interval_start": "2025-04-05T03:20:00+05:30",
        "interval_end": "2025-04-05T03:30:00+05:30",
        "count": 4,
        "total_games": 19,
        "percentage": 21.052631578947366
      },
      {
        "interval_start": "2025-04-05T03:30:00+05:30",
        "interval_end": "2025-04-05T03:40:00+05:30",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "interval_start": "2025-04-05T03:40:00+05:30",
        "interval_end": "2025-04-05T03:50:00+05:30",
        "count": 0,
        "total_games": 22,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-04-05T03:50:00+05:30",
        "interval_end": "2025-04-05T04:00:00+05:30",
        "count": 2,
        "total_games": 25,
        "percentage": 8.0
      },
      {
        "interval_start": "2025-04-05T04:00:00+05:30",
        "interval_end": "2025-04-05T04:10:00+05:30",
        "count": 2,
        "total_games": 19,
        "percentage": 10.526315789473683
      },
      {
        "interval_start": "2025-04-05T04:10:00+05:30",
        "interval_end": "2025-04-05T04:20:00+05:30",
        "count": 1,
        "total_games": 25,
        "percentage": 4.0
      },
      {
        "interval_start": "2025-04-05T04:20:00+05:30",
        "interval_end": "2025-04-05T04:30:00+05:30",
        "count": 1,
        "total_games": 26,
        "percentage": 3.8461538461538463
      },
      {
        "interval_start": "2025-04-05T04:30:00+05:30",
        "interval_end": "2025-04-05T04:40:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-04-05T04:40:00+05:30",
        "interval_end": "2025-04-05T04:50:00+05:30",
        "count": 1,
        "total_games": 21,
        "percentage": 4.761904761904762
      },
      {
        "interval_start": "2025-04-05T04:50:00+05:30",
        "interval_end": "2025-04-05T05:00:00+05:30",
        "count": 3,
        "total_games": 21,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-04-05T05:00:00+05:30",
        "interval_end": "2025-04-05T05:10:00+05:30",
        "count": 6,
        "total_games": 14,
        "percentage": 42.857142857142854
      },
      {
        "interval_start": "2025-04-05T05:10:00+05:30",
        "interval_end": "2025-04-05T05:20:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-04-05T05:20:00+05:30",
        "interval_end": "2025-04-05T05:30:00+05:30",
        "count": 1,
        "total_games": 23,
        "percentage": 4.3478260869565215
      },
      {
        "interval_start": "2025-04-05T05:30:00+05:30",
        "interval_end": "2025-04-05T05:40:00+05:30",
        "count": 1,
        "total_games": 21,
        "percentage": 4.761904761904762
      },
      {
        "interval_start": "2025-04-05T05:40:00+05:30",
        "interval_end": "2025-04-05T05:50:00+05:30",
        "count": 1,
        "total_games": 23,
        "percentage": 4.3478260869565215
      },
      {
        "interval_start": "2025-04-05T05:50:00+05:30",
        "interval_end": "2025-04-05T06:00:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-04-05T06:00:00+05:30",
        "interval_end": "2025-04-05T06:10:00+05:30",
        "count": 2,
        "total_games": 25,
        "percentage": 8.0
      },
      {
        "interval_start": "2025-04-05T06:10:00+05:30",
        "interval_end": "2025-04-05T06:20:00+05:30",
        "count": 2,
        "total_games": 24,
        "percentage": 8.333333333333332
      },
      {
        "interval_start": "2025-04-05T06:20:00+05:30",
        "interval_end": "2025-04-05T06:30:00+05:30",
        "count": 1,
        "total_games": 26,
        "percentage": 3.8461538461538463
      },
      {
        "interval_start": "2025-04-05T06:30:00+05:30",
        "interval_end": "2025-04-05T06:40:00+05:30",
        "count": 1,
        "total_games": 23,
        "percentage": 4.3478260869565215
      },
      {
        "interval_start": "2025-04-05T06:40:00+05:30",
        "interval_end": "2025-04-05T06:50:00+05:30",
        "count": 1,
        "total_games": 24,
        "percentage": 4.166666666666666
      },
      {
        "interval_start": "2025-04-05T06:50:00+05:30",
        "interval_end": "2025-04-05T07:00:00+05:30",
        "count": 3,
        "total_games": 18,
        "percentage": 16.666666666666664
      },
      {
        "interval_start": "2025-04-05T07:00:00+05:30",
        "interval_end": "2025-04-05T07:10:00+05:30",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "interval_start": "2025-04-05T07:10:00+05:30",
        "interval_end": "2025-04-05T07:20:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-04-05T07:20:00+05:30",
        "interval_end": "2025-04-05T07:30:00+05:30",
        "count": 2,
        "total_games": 22,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-04-05T07:30:00+05:30",
        "interval_end": "2025-04-05T07:40:00+05:30",
        "count": 1,
        "total_games": 25,
        "percentage": 4.0
      },
      {
        "interval_start": "2025-04-05T07:40:00+05:30",
        "interval_end": "2025-04-05T07:50:00+05:30",
        "count": 3,
        "total_games": 23,
        "percentage": 13.043478260869565
      },
      {
        "interval_start": "2025-04-05T07:50:00+05:30",
        "interval_end": "2025-04-05T08:00:00+05:30",
        "count": 1,
        "total_games": 22,
        "percentage": 4.545454545454546
      },
      {
        "interval_start": "2025-04-05T08:00:00+05:30",
        "interval_end": "2025-04-05T08:10:00+05:30",
        "count": 1,
        "total_games": 23,
        "percentage": 4.3478260869565215
      },
      {
        "interval_start": "2025-04-05T08:10:00+05:30",
        "interval_end": "2025-04-05T08:20:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-04-05T08:20:00+05:30",
        "interval_end": "2025-04-05T08:30:00+05:30",
        "count": 1,
        "total_games": 23,
        "percentage": 4.3478260869565215
      },
      {
        "interval_start": "2025-04-05T08:30:00+05:30",
        "interval_end": "2025-04-05T08:40:00+05:30",
        "count": 4,
        "total_games": 19,
        "percentage": 21.052631578947366
      },
      {
        "interval_start": "2025-04-05T08:40:00+05:30",
        "interval_end": "2025-04-05T08:50:00+05:30",
        "count": 1,
        "total_games": 24,
        "percentage": 4.166666666666666
      },
      {
        "interval_start": "2025-04-05T08:50:00+05:30",
        "interval_end": "2025-04-05T09:00:00+05:30",
        "count": 2,
        "total_games": 24,
        "percentage": 8.333333333333332
      },
      {
        "interval_start": "2025-04-05T09:00:00+05:30",
        "interval_end": "2025-04-05T09:10:00+05:30",
        "count": 1,
        "total_games": 22,
        "percentage": 4.545454545454546
      },
      {
        "interval_start": "2025-04-05T09:10:00+05:30",
        "interval_end": "2025-04-05T09:20:00+05:30",
        "count": 1,
        "total_games": 27,
        "percentage": 3.7037037037037033
      },
      {
        "interval_start": "2025-04-05T09:20:00+05:30",
        "interval_end": "2025-04-05T09:30:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-04-05T09:30:00+05:30",
        "interval_end": "2025-04-05T09:40:00+05:30",
        "count": 3,
        "total_games": 16,
        "percentage": 18.75
      },
      {
        "interval_start": "2025-04-05T09:40:00+05:30",
        "interval_end": "2025-04-05T09:50:00+05:30",
        "count": 0,
        "total_games": 26,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-04-05T09:50:00+05:30",
        "interval_end": "2025-04-05T10:00:00+05:30",
        "count": 2,
        "total_games": 19,
        "percentage": 10.526315789473683
      },
      {
        "interval_start": "2025-04-05T10:00:00+05:30",
        "interval_end": "2025-04-05T10:10:00+05:30",
        "count": 4,
        "total_games": 18,
        "percentage": 22.22222222222222
      },
      {
        "interval_start": "2025-04-05T10:10:00+05:30",
        "interval_end": "2025-04-05T10:20:00+05:30",
        "count": 1,
        "total_games": 24,
        "percentage": 4.166666666666666
      },
      {
        "interval_start": "2025-04-05T10:20:00+05:30",
        "interval_end": "2025-04-05T10:30:00+05:30",
        "count": 2,
        "total_games": 17,
        "percentage": 11.76470588235294
      },
      {
        "interval_start": "2025-04-05T10:30:00+05:30",
        "interval_end": "2025-04-05T10:40:00+05:30",
        "count": 5,
        "total_games": 17,
        "percentage": 29.411764705882355
      },
      {
        "interval_start": "2025-04-05T10:40:00+05:30",
        "interval_end": "2025-04-05T10:50:00+05:30",
        "count": 1,
        "total_games": 25,
        "percentage": 4.0
      },
      {
        "interval_start": "2025-04-05T10:50:00+05:30",
        "interval_end": "2025-04-05T11:00:00+05:30",
        "count": 3,
        "total_games": 22,
        "percentage": 13.636363636363635
      },
      {
        "interval_start": "2025-04-05T11:00:00+05:30",
        "interval_end": "2025-04-05T11:10:00+05:30",
        "count": 1,
        "total_games": 19,
        "percentage": 5.263157894736842
      },
      {
        "interval_start": "2025-04-05T11:10:00+05:30",
        "interval_end": "2025-04-05T11:20:00+05:30",
        "count": 3,
        "total_games": 18,
        "percentage": 16.666666666666664
      },
      {
        "interval_start": "2025-04-05T11:20:00+05:30",
        "interval_end": "2025-04-05T11:30:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-04-05T11:30:00+05:30",
        "interval_end": "2025-04-05T11:40:00+05:30",
        "count": 3,
        "total_games": 22,
        "percentage": 13.636363636363635
      },
      {
        "interval_start": "2025-04-05T11:40:00+05:30",
        "interval_end": "2025-04-05T11:50:00+05:30",
        "count": 3,
        "total_games": 19,
        "percentage": 15.789473684210526
      },
      {
        "interval_start": "2025-04-05T11:50:00+05:30",
        "interval_end": "2025-04-05T12:00:00+05:30",
        "count": 1,
        "total_games": 24,
        "percentage": 4.166666666666666
      },
      {
        "interval_start": "2025-04-05T12:00:00+05:30",
        "interval_end": "2025-04-05T12:10:00+05:30",
        "count": 2,
        "total_games": 18,
        "percentage": 11.11111111111111
      },
      {
        "interval_start": "2025-04-05T12:10:00+05:30",
        "interval_end": "2025-04-05T12:20:00+05:30",
        "count": 1,
        "total_games": 23,
        "percentage": 4.3478260869565215
      },
      {
        "interval_start": "2025-04-05T12:20:00+05:30",
        "interval_end": "2025-04-05T12:30:00+05:30",
        "count": 2,
        "total_games": 18,
        "percentage": 11.11111111111111
      },
      {
        "interval_start": "2025-04-05T12:30:00+05:30",
        "interval_end": "2025-04-05T12:40:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-04-05T12:40:00+05:30",
        "interval_end": "2025-04-05T12:50:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-04-05T12:50:00+05:30",
        "interval_end": "2025-04-05T13:00:00+05:30",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-04-05T13:00:00+05:30",
        "interval_end": "2025-04-05T13:10:00+05:30",
        "count": 3,
        "total_games": 23,
        "percentage": 13.043478260869565
      },
      {
        "interval_start": "2025-04-05T13:10:00+05:30",
        "interval_end": "2025-04-05T13:20:00+05:30",
        "count": 1,
        "total_games": 21,
        "percentage": 4.761904761904762
      },
      {
        "interval_start": "2025-04-05T13:20:00+05:30",
        "interval_end": "2025-04-05T13:30:00+05:30",
        "count": 1,
        "total_games": 24,
        "percentage": 4.166666666666666
      },
      {
        "interval_start": "2025-04-05T13:30:00+05:30",
        "interval_end": "2025-04-05T13:40:00+05:30",
        "count": 2,
        "total_games": 14,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-04-05T13:40:00+05:30",
        "interval_end": "2025-04-05T13:50:00+05:30",
        "count": 3,
        "total_games": 23,
        "percentage": 13.043478260869565
      },
      {
        "interval_start": "2025-04-05T13:50:00+05:30",
        "interval_end": "2025-04-05T14:00:00+05:30",
        "count": 0,
        "total_games": 21,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-04-05T14:00:00+05:30",
        "interval_end": "2025-04-05T14:10:00+05:30",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-04-05T14:10:00+05:30",
        "interval_end": "2025-04-05T14:20:00+05:30",
        "count": 1,
        "total_games": 19,
        "percentage": 5.263157894736842
      },
      {
        "interval_start": "2025-04-05T14:20:00+05:30",
        "interval_end": "2025-04-05T14:30:00+05:30",
        "count": 2,
        "total_games": 25,
        "percentage": 8.0
      },
      {
        "interval_start": "2025-04-05T14:30:00+05:30",
        "interval_end": "2025-04-05T14:40:00+05:30",
        "count": 2,
        "total_games": 24,
        "percentage": 8.333333333333332
      },
      {
        "interval_start": "2025-04-05T14:40:00+05:30",
        "interval_end": "2025-04-05T14:50:00+05:30",
        "count": 3,
        "total_games": 18,
        "percentage": 16.666666666666664
      },
      {
        "interval_start": "2025-04-05T14:50:00+05:30",
        "interval_end": "2025-04-05T15:00:00+05:30",
        "count": 2,
        "total_games": 22,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-04-05T15:00:00+05:30",
        "interval_end": "2025-04-05T15:10:00+05:30",
        "count": 5,
        "total_games": 14,
        "percentage": 35.714285714285715
      },
      {
        "interval_start": "2025-04-05T15:10:00+05:30",
        "interval_end": "2025-04-05T15:20:00+05:30",
        "count": 3,
        "total_games": 21,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-04-05T15:20:00+05:30",
        "interval_end": "2025-04-05T15:30:00+05:30",
        "count": 2,
        "total_games": 25,
        "percentage": 8.0
      },
      {
        "interval_start": "2025-04-05T15:30:00+05:30",
        "interval_end": "2025-04-05T15:40:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-04-05T15:40:00+05:30",
        "interval_end": "2025-04-05T15:50:00+05:30",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-04-05T15:50:00+05:30",
        "interval_end": "2025-04-05T16:00:00+05:30",
        "count": 3,
        "total_games": 19,
        "percentage": 15.789473684210526
      },
      {
        "interval_start": "2025-04-05T16:00:00+05:30",
        "interval_end": "2025-04-05T16:10:00+05:30",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "interval_start": "2025-04-05T16:10:00+05:30",
        "interval_end": "2025-04-05T16:20:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-04-05T16:20:00+05:30",
        "interval_end": "2025-04-05T16:30:00+05:30",
        "count": 1,
        "total_games": 22,
        "percentage": 4.545454545454546
      },
      {
        "interval_start": "2025-04-05T16:30:00+05:30",
        "interval_end": "2025-04-05T16:40:00+05:30",
        "count": 4,
        "total_games": 16,
        "percentage": 25.0
      },
      {
        "interval_start": "2025-04-05T16:40:00+05:30",
        "interval_end": "2025-04-05T16:50:00+05:30",
        "count": 2,
        "total_games": 17,
        "percentage": 11.76470588235294
      },
      {
        "interval_start": "2025-04-05T16:50:00+05:30",
        "interval_end": "2025-04-05T17:00:00+05:30",
        "count": 3,
        "total_games": 17,
        "percentage": 17.647058823529413
      },
      {
        "interval_start": "2025-04-05T17:00:00+05:30",
        "interval_end": "2025-04-05T17:10:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-04-05T17:10:00+05:30",
        "interval_end": "2025-04-05T17:20:00+05:30",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "interval_start": "2025-04-05T17:20:00+05:30",
        "interval_end": "2025-04-05T17:30:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-04-05T17:30:00+05:30",
        "interval_end": "2025-04-05T17:40:00+05:30",
        "count": 2,
        "total_games": 18,
        "percentage": 11.11111111111111
      },
      {
        "interval_start": "2025-04-05T17:40:00+05:30",
        "interval_end": "2025-04-05T17:50:00+05:30",
        "count": 1,
        "total_games": 26,
        "percentage": 3.8461538461538463
      },
      {
        "interval_start": "2025-04-05T17:50:00+05:30",
        "interval_end": "2025-04-05T18:00:00+05:30",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "interval_start": "2025-04-05T18:00:00+05:30",
        "interval_end": "2025-04-05T18:10:00+05:30",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "interval_start": "2025-04-05T18:10:00+05:30",
        "interval_end": "2025-04-05T18:20:00+05:30",
        "count": 3,
        "total_games": 21,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-04-05T18:20:00+05:30",
        "interval_end": "2025-04-05T18:30:00+05:30",
        "count": 1,
        "total_games": 23,
        "percentage": 4.3478260869565215
      },
      {
        "interval_start": "2025-04-05T18:30:00+05:30",
        "interval_end": "2025-04-05T18:40:00+05:30",
        "count": 0,
        "total_games": 24,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-04-05T18:40:00+05:30",
        "interval_end": "2025-04-05T18:50:00+05:30",
        "count": 1,
        "total_games": 24,
        "percentage": 4.166666666666666
      },
      {
        "interval_start": "2025-04-05T18:50:00+05:30",
        "interval_end": "2025-04-05T19:00:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-04-05T19:00:00+05:30",
        "interval_end": "2025-04-05T19:10:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-04-05T19:10:00+05:30",
        "interval_end": "2025-04-05T19:20:00+05:30",
        "count": 0,
        "total_games": 25,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-04-05T19:20:00+05:30",
        "interval_end": "2025-04-05T19:30:00+05:30",
        "count": 2,
        "total_games": 24,
        "percentage": 8.333333333333332
      },
      {
        "interval_start": "2025-04-05T19:30:00+05:30",
        "interval_end": "2025-04-05T19:40:00+05:30",
        "count": 1,
        "total_games": 24,
        "percentage": 4.166666666666666
      },
      {
        "interval_start": "2025-04-05T19:40:00+05:30",
        "interval_end": "2025-04-05T19:50:00+05:30",
        "count": 2,
        "total_games": 19,
        "percentage": 10.526315789473683
      },
      {
        "interval_start": "2025-04-05T19:50:00+05:30",
        "interval_end": "2025-04-05T20:00:00+05:30",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-04-05T20:00:00+05:30",
        "interval_end": "2025-04-05T20:10:00+05:30",
        "count": 1,
        "total_games": 22,
        "percentage": 4.545454545454546
      },
      {
        "interval_start": "2025-04-05T20:10:00+05:30",
        "interval_end": "2025-04-05T20:20:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-04-05T20:20:00+05:30",
        "interval_end": "2025-04-05T20:30:00+05:30",
        "count": 1,
        "total_games": 26,
        "percentage": 3.8461538461538463
      },
      {
        "interval_start": "2025-04-05T20:30:00+05:30",
        "interval_end": "2025-04-05T20:40:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-04-05T20:40:00+05:30",
        "interval_end": "2025-04-05T20:50:00+05:30",
        "count": 3,
        "total_games": 18,
        "percentage": 16.666666666666664
      },
      {
        "interval_start": "2025-04-05T20:50:00+05:30",
        "interval_end": "2025-04-05T21:00:00+05:30",
        "count": 2,
        "total_games": 22,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-04-05T21:00:00+05:30",
        "interval_end": "2025-04-05T21:10:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-04-05T21:10:00+05:30",
        "interval_end": "2025-04-05T21:20:00+05:30",
        "count": 3,
        "total_games": 21,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-04-05T21:20:00+05:30",
        "interval_end": "2025-04-05T21:30:00+05:30",
        "count": 3,
        "total_games": 21,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-04-05T21:30:00+05:30",
        "interval_end": "2025-04-05T21:40:00+05:30",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "interval_start": "2025-04-05T21:40:00+05:30",
        "interval_end": "2025-04-05T21:50:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-04-05T21:50:00+05:30",
        "interval_end": "2025-04-05T22:00:00+05:30",
        "count": 1,
        "total_games": 27,
        "percentage": 3.7037037037037033
      },
      {
        "interval_start": "2025-04-05T22:00:00+05:30",
        "interval_end": "2025-04-05T22:10:00+05:30",
        "count": 2,
        "total_games": 18,
        "percentage": 11.11111111111111
      },
      {
        "interval_start": "2025-04-05T22:10:00+05:30",
        "interval_end": "2025-04-05T22:20:00+05:30",
        "count": 3,
        "total_games": 17,
        "percentage": 17.647058823529413
      },
      {
        "interval_start": "2025-04-05T22:20:00+05:30",
        "interval_end": "2025-04-05T22:30:00+05:30",
        "count": 2,
        "total_games": 22,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-04-05T22:30:00+05:30",
        "interval_end": "2025-04-05T22:40:00+05:30",
        "count": 1,
        "total_games": 23,
        "percentage": 4.3478260869565215
      },
      {
        "interval_start": "2025-04-05T22:40:00+05:30",
        "interval_end": "2025-04-05T22:50:00+05:30",
        "count": 2,
        "total_games": 17,
        "percentage": 11.76470588235294
      },
      {
        "interval_start": "2025-04-05T22:50:00+05:30",
        "interval_end": "2025-04-05T23:00:00+05:30",
        "count": 3,
        "total_games": 18,
        "percentage": 16.666666666666664
      },
      {
        "interval_start": "2025-04-05T23:00:00+05:30",
        "interval_end": "2025-04-05T23:10:00+05:30",
        "count": 3,
        "total_games": 19,
        "percentage": 15.789473684210526
      },
      {
        "interval_start": "2025-04-05T23:10:00+05:30",
        "interval_end": "2025-04-05T23:20:00+05:30",
        "count": 3,
        "total_games": 19,
        "percentage": 15.789473684210526
      },
      {
        "interval_start": "2025-04-05T23:20:00+05:30",
        "interval_end": "2025-04-05T23:30:00+05:30",
        "count": 0,
        "total_games": 22,
        "percentage": 0.0
      }
    ]
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 30242  100 30242    0     0  25529      0  0:00:01  0:00:01 --:--:-- 25542
{
  "status": "success",
  "data": {
    "min_value": 10.0,
    "interval_minutes": 15,
    "hours": 48,
    "count": 193,
    "intervals": [
      {
        "interval_start": "2025-04-03T23:15:00+05:30",
        "interval_end": "2025-04-03T23:30:00+05:30",
        "count": 1,
        "total_games": 33,
        "percentage": 3.0303030303030303
      },
      {
        "interval_start": "2025-04-03T23:30:00+05:30",
        "interval_end": "2025-04-03T23:45:00+05:30",
        "count": 3,
        "total_games": 35,
        "percentage": 8.571428571428571
      },
      {
        "interval_start": "2025-04-03T23:45:00+05:30",
        "interval_end": "2025-04-04T00:00:00+05:30",
        "count": 5,
        "total_games": 27,
        "percentage": 18.51851851851852
      },
      {
        "interval_start": "2025-04-04T00:00:00+05:30",
        "interval_end": "2025-04-04T00:15:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-04-04T00:15:00+05:30",
        "interval_end": "2025-04-04T00:30:00+05:30",
        "count": 2,
        "total_games": 34,
        "percentage": 5.88235294117647
      },
      {
        "interval_start": "2025-04-04T00:30:00+05:30",
        "interval_end": "2025-04-04T00:45:00+05:30",
        "count": 5,
        "total_games": 26,
        "percentage": 19.230769230769234
      },
      {
        "interval_start": "2025-04-04T00:45:00+05:30",
        "interval_end": "2025-04-04T01:00:00+05:30",
        "count": 4,
        "total_games": 32,
        "percentage": 12.5
      },
      {
        "interval_start": "2025-04-04T01:00:00+05:30",
        "interval_end": "2025-04-04T01:15:00+05:30",
        "count": 6,
        "total_games": 29,
        "percentage": 20.689655172413794
      },
      {
        "interval_start": "2025-04-04T01:15:00+05:30",
        "interval_end": "2025-04-04T01:30:00+05:30",
        "count": 2,
        "total_games": 34,
        "percentage": 5.88235294117647
      },
      {
        "interval_start": "2025-04-04T01:30:00+05:30",
        "interval_end": "2025-04-04T01:45:00+05:30",
        "count": 5,
        "total_games": 34,
        "percentage": 14.705882352941178
      },
      {
        "interval_start": "2025-04-04T01:45:00+05:30",
        "interval_end": "2025-04-04T02:00:00+05:30",
        "count": 1,
        "total_games": 35,
        "percentage": 2.857142857142857
      },
      {
        "interval_start": "2025-04-04T02:00:00+05:30",
        "interval_end": "2025-04-04T02:15:00+05:30",
        "count": 2,
        "total_games": 34,
        "percentage": 5.88235294117647
      },
      {
        "interval_start": "2025-04-04T02:15:00+05:30",
        "interval_end": "2025-04-04T02:30:00+05:30",
        "count": 6,
        "total_games": 28,
        "percentage": 21.428571428571427
      },
      {
        "interval_start": "2025-04-04T02:30:00+05:30",
        "interval_end": "2025-04-04T02:45:00+05:30",
        "count": 3,
        "total_games": 36,
        "percentage": 8.333333333333332
      },
      {
        "interval_start": "2025-04-04T02:45:00+05:30",
        "interval_end": "2025-04-04T03:00:00+05:30",
        "count": 0,
        "total_games": 36,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-04-04T03:00:00+05:30",
        "interval_end": "2025-04-04T03:15:00+05:30",
        "count": 4,
        "total_games": 29,
        "percentage": 13.793103448275861
      },
      {
        "interval_start": "2025-04-04T03:15:00+05:30",
        "interval_end": "2025-04-04T03:30:00+05:30",
        "count": 3,
        "total_games": 30,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-04-04T03:30:00+05:30",
        "interval_end": "2025-04-04T03:45:00+05:30",
        "count": 3,
        "total_games": 30,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-04-04T03:45:00+05:30",
        "interval_end": "2025-04-04T04:00:00+05:30",
        "count": 2,
        "total_games": 30,
        "percentage": 6.666666666666667
      },
      {
        "interval_start": "2025-04-04T04:00:00+05:30",
        "interval_end": "2025-04-04T04:15:00+05:30",
        "count": 5,
        "total_games": 28,
        "percentage": 17.857142857142858
      },
      {
        "interval_start": "2025-04-04T04:15:00+05:30",
        "interval_end": "2025-04-04T04:30:00+05:30",
        "count": 4,
        "total_games": 29,
        "percentage": 13.793103448275861
      },
      {
        "interval_start": "2025-04-04T04:30:00+05:30",
        "interval_end": "2025-04-04T04:45:00+05:30",
        "count": 3,
        "total_games": 34,
        "percentage": 8.823529411764707
      },
      {
        "interval_start": "2025-04-04T04:45:00+05:30",
        "interval_end": "2025-04-04T05:00:00+05:30",
        "count": 2,
        "total_games": 33,
        "percentage": 6.0606060606060606
      },
      {
        "interval_start": "2025-04-04T05:00:00+05:30",
        "interval_end": "2025-04-04T05:15:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-04-04T05:15:00+05:30",
        "interval_end": "2025-04-04T05:30:00+05:30",
        "count": 3,
        "total_games": 31,
        "percentage": 9.67741935483871
      },
      {
        "interval_start": "2025-04-04T05:30:00+05:30",
        "interval_end": "2025-04-04T05:45:00+05:30",
        "count": 4,
        "total_games": 25,
        "percentage": 16.0
      },
      {
        "interval_start": "2025-04-04T05:45:00+05:30",
        "interval_end": "2025-04-04T06:00:00+05:30",
        "count": 4,
        "total_games": 25,
        "percentage": 16.0
      },
      {
        "interval_start": "2025-04-04T06:00:00+05:30",
        "interval_end": "2025-04-04T06:15:00+05:30",
        "count": 4,
        "total_games": 33,
        "percentage": 12.121212121212121
      },
      {
        "interval_start": "2025-04-04T06:15:00+05:30",
        "interval_end": "2025-04-04T06:30:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-04-04T06:30:00+05:30",
        "interval_end": "2025-04-04T06:45:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-04-04T06:45:00+05:30",
        "interval_end": "2025-04-04T07:00:00+05:30",
        "count": 3,
        "total_games": 37,
        "percentage": 8.108108108108109
      },
      {
        "interval_start": "2025-04-04T07:00:00+05:30",
        "interval_end": "2025-04-04T07:15:00+05:30",
        "count": 6,
        "total_games": 28,
        "percentage": 21.428571428571427
      },
      {
        "interval_start": "2025-04-04T07:15:00+05:30",
        "interval_end": "2025-04-04T07:30:00+05:30",
        "count": 5,
        "total_games": 29,
        "percentage": 17.24137931034483
      },
      {
        "interval_start": "2025-04-04T07:30:00+05:30",
        "interval_end": "2025-04-04T07:45:00+05:30",
        "count": 3,
        "total_games": 35,
        "percentage": 8.571428571428571
      },
      {
        "interval_start": "2025-04-04T07:45:00+05:30",
        "interval_end": "2025-04-04T08:00:00+05:30",
        "count": 2,
        "total_games": 30,
        "percentage": 6.666666666666667
      },
      {
        "interval_start": "2025-04-04T08:00:00+05:30",
        "interval_end": "2025-04-04T08:15:00+05:30",
        "count": 1,
        "total_games": 34,
        "percentage": 2.941176470588235
      },
      {
        "interval_start": "2025-04-04T08:15:00+05:30",
        "interval_end": "2025-04-04T08:30:00+05:30",
        "count": 2,
        "total_games": 32,
        "percentage": 6.25
      },
      {
        "interval_start": "2025-04-04T08:30:00+05:30",
        "interval_end": "2025-04-04T08:45:00+05:30",
        "count": 2,
        "total_games": 33,
        "percentage": 6.0606060606060606
      },
      {
        "interval_start": "2025-04-04T08:45:00+05:30",
        "interval_end": "2025-04-04T09:00:00+05:30",
        "count": 3,
        "total_games": 32,
        "percentage": 9.375
      },
      {
        "interval_start": "2025-04-04T09:00:00+05:30",
        "interval_end": "2025-04-04T09:15:00+05:30",
        "count": 3,
        "total_games": 32,
        "percentage": 9.375
      },
      {
        "interval_start": "2025-04-04T09:15:00+05:30",
        "interval_end": "2025-04-04T09:30:00+05:30",
        "count": 4,
        "total_games": 26,
        "percentage": 15.384615384615385
      },
      {
        "interval_start": "2025-04-04T09:30:00+05:30",
        "interval_end": "2025-04-04T09:45:00+05:30",
        "count": 3,
        "total_games": 30,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-04-04T09:45:00+05:30",
        "interval_end": "2025-04-04T10:00:00+05:30",
        "count": 1,
        "total_games": 38,
        "percentage": 2.631578947368421
      },
      {
        "interval_start": "2025-04-04T10:00:00+05:30",
        "interval_end": "2025-04-04T10:15:00+05:30",
        "count": 2,
        "total_games": 35,
        "percentage": 5.714285714285714
      },
      {
        "interval_start": "2025-04-04T10:15:00+05:30",
        "interval_end": "2025-04-04T10:30:00+05:30",
        "count": 2,
        "total_games": 31,
        "percentage": 6.451612903225806
      },
      {
        "interval_start": "2025-04-04T10:30:00+05:30",
        "interval_end": "2025-04-04T10:45:00+05:30",
        "count": 4,
        "total_games": 33,
        "percentage": 12.121212121212121
      },
      {
        "interval_start": "2025-04-04T10:45:00+05:30",
        "interval_end": "2025-04-04T11:00:00+05:30",
        "count": 4,
        "total_games": 30,
        "percentage": 13.333333333333334
      },
      {
        "interval_start": "2025-04-04T11:00:00+05:30",
        "interval_end": "2025-04-04T11:15:00+05:30",
        "count": 3,
        "total_games": 31,
        "percentage": 9.67741935483871
      },
      {
        "interval_start": "2025-04-04T11:15:00+05:30",
        "interval_end": "2025-04-04T11:30:00+05:30",
        "count": 1,
        "total_games": 35,
        "percentage": 2.857142857142857
      },
      {
        "interval_start": "2025-04-04T11:30:00+05:30",
        "interval_end": "2025-04-04T11:45:00+05:30",
        "count": 8,
        "total_games": 22,
        "percentage": 36.36363636363637
      },
      {
        "interval_start": "2025-04-04T11:45:00+05:30",
        "interval_end": "2025-04-04T12:00:00+05:30",
        "count": 2,
        "total_games": 31,
        "percentage": 6.451612903225806
      },
      {
        "interval_start": "2025-04-04T12:00:00+05:30",
        "interval_end": "2025-04-04T12:15:00+05:30",
        "count": 4,
        "total_games": 31,
        "percentage": 12.903225806451612
      },
      {
        "interval_start": "2025-04-04T12:15:00+05:30",
        "interval_end": "2025-04-04T12:30:00+05:30",
        "count": 1,
        "total_games": 35,
        "percentage": 2.857142857142857
      },
      {
        "interval_start": "2025-04-04T12:30:00+05:30",
        "interval_end": "2025-04-04T12:45:00+05:30",
        "count": 2,
        "total_games": 28,
        "percentage": 7.142857142857142
      },
      {
        "interval_start": "2025-04-04T12:45:00+05:30",
        "interval_end": "2025-04-04T13:00:00+05:30",
        "count": 1,
        "total_games": 39,
        "percentage": 2.564102564102564
      },
      {
        "interval_start": "2025-04-04T13:00:00+05:30",
        "interval_end": "2025-04-04T13:15:00+05:30",
        "count": 5,
        "total_games": 27,
        "percentage": 18.51851851851852
      },
      {
        "interval_start": "2025-04-04T13:15:00+05:30",
        "interval_end": "2025-04-04T13:30:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-04-04T13:30:00+05:30",
        "interval_end": "2025-04-04T13:45:00+05:30",
        "count": 4,
        "total_games": 33,
        "percentage": 12.121212121212121
      },
      {
        "interval_start": "2025-04-04T13:45:00+05:30",
        "interval_end": "2025-04-04T14:00:00+05:30",
        "count": 1,
        "total_games": 36,
        "percentage": 2.7777777777777777
      },
      {
        "interval_start": "2025-04-04T14:00:00+05:30",
        "interval_end": "2025-04-04T14:15:00+05:30",
        "count": 2,
        "total_games": 37,
        "percentage": 5.405405405405405
      },
      {
        "interval_start": "2025-04-04T14:15:00+05:30",
        "interval_end": "2025-04-04T14:30:00+05:30",
        "count": 4,
        "total_games": 31,
        "percentage": 12.903225806451612
      },
      {
        "interval_start": "2025-04-04T14:30:00+05:30",
        "interval_end": "2025-04-04T14:45:00+05:30",
        "count": 1,
        "total_games": 34,
        "percentage": 2.941176470588235
      },
      {
        "interval_start": "2025-04-04T14:45:00+05:30",
        "interval_end": "2025-04-04T15:00:00+05:30",
        "count": 6,
        "total_games": 29,
        "percentage": 20.689655172413794
      },
      {
        "interval_start": "2025-04-04T15:00:00+05:30",
        "interval_end": "2025-04-04T15:15:00+05:30",
        "count": 4,
        "total_games": 32,
        "percentage": 12.5
      },
      {
        "interval_start": "2025-04-04T15:15:00+05:30",
        "interval_end": "2025-04-04T15:30:00+05:30",
        "count": 4,
        "total_games": 32,
        "percentage": 12.5
      },
      {
        "interval_start": "2025-04-04T15:30:00+05:30",
        "interval_end": "2025-04-04T15:45:00+05:30",
        "count": 2,
        "total_games": 34,
        "percentage": 5.88235294117647
      },
      {
        "interval_start": "2025-04-04T15:45:00+05:30",
        "interval_end": "2025-04-04T16:00:00+05:30",
        "count": 4,
        "total_games": 31,
        "percentage": 12.903225806451612
      },
      {
        "interval_start": "2025-04-04T16:00:00+05:30",
        "interval_end": "2025-04-04T16:15:00+05:30",
        "count": 2,
        "total_games": 39,
        "percentage": 5.128205128205128
      },
      {
        "interval_start": "2025-04-04T16:15:00+05:30",
        "interval_end": "2025-04-04T16:30:00+05:30",
        "count": 0,
        "total_games": 35,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-04-04T16:30:00+05:30",
        "interval_end": "2025-04-04T16:45:00+05:30",
        "count": 4,
        "total_games": 28,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-04-04T16:45:00+05:30",
        "interval_end": "2025-04-04T17:00:00+05:30",
        "count": 4,
        "total_games": 31,
        "percentage": 12.903225806451612
      },
      {
        "interval_start": "2025-04-04T17:00:00+05:30",
        "interval_end": "2025-04-04T17:15:00+05:30",
        "count": 5,
        "total_games": 22,
        "percentage": 22.727272727272727
      },
      {
        "interval_start": "2025-04-04T17:15:00+05:30",
        "interval_end": "2025-04-04T17:30:00+05:30",
        "count": 7,
        "total_games": 31,
        "percentage": 22.58064516129032
      },
      {
        "interval_start": "2025-04-04T17:30:00+05:30",
        "interval_end": "2025-04-04T17:45:00+05:30",
        "count": 3,
        "total_games": 32,
        "percentage": 9.375
      },
      {
        "interval_start": "2025-04-04T17:45:00+05:30",
        "interval_end": "2025-04-04T18:00:00+05:30",
        "count": 5,
        "total_games": 29,
        "percentage": 17.24137931034483
      },
      {
        "interval_start": "2025-04-04T18:00:00+05:30",
        "interval_end": "2025-04-04T18:15:00+05:30",
        "count": 5,
        "total_games": 32,
        "percentage": 15.625
      },
      {
        "interval_start": "2025-04-04T18:15:00+05:30",
        "interval_end": "2025-04-04T18:30:00+05:30",
        "count": 1,
        "total_games": 40,
        "percentage": 2.5
      },
      {
        "interval_start": "2025-04-04T18:30:00+05:30",
        "interval_end": "2025-04-04T18:45:00+05:30",
        "count": 3,
        "total_games": 31,
        "percentage": 9.67741935483871
      },
      {
        "interval_start": "2025-04-04T18:45:00+05:30",
        "interval_end": "2025-04-04T19:00:00+05:30",
        "count": 4,
        "total_games": 34,
        "percentage": 11.76470588235294
      },
      {
        "interval_start": "2025-04-04T19:00:00+05:30",
        "interval_end": "2025-04-04T19:15:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-04-04T19:15:00+05:30",
        "interval_end": "2025-04-04T19:30:00+05:30",
        "count": 5,
        "total_games": 31,
        "percentage": 16.129032258064516
      },
      {
        "interval_start": "2025-04-04T19:30:00+05:30",
        "interval_end": "2025-04-04T19:45:00+05:30",
        "count": 4,
        "total_games": 27,
        "percentage": 14.814814814814813
      },
      {
        "interval_start": "2025-04-04T19:45:00+05:30",
        "interval_end": "2025-04-04T20:00:00+05:30",
        "count": 2,
        "total_games": 34,
        "percentage": 5.88235294117647
      },
      {
        "interval_start": "2025-04-04T20:00:00+05:30",
        "interval_end": "2025-04-04T20:15:00+05:30",
        "count": 5,
        "total_games": 31,
        "percentage": 16.129032258064516
      },
      {
        "interval_start": "2025-04-04T20:15:00+05:30",
        "interval_end": "2025-04-04T20:30:00+05:30",
        "count": 3,
        "total_games": 32,
        "percentage": 9.375
      },
      {
        "interval_start": "2025-04-04T20:30:00+05:30",
        "interval_end": "2025-04-04T20:45:00+05:30",
        "count": 5,
        "total_games": 28,
        "percentage": 17.857142857142858
      },
      {
        "interval_start": "2025-04-04T20:45:00+05:30",
        "interval_end": "2025-04-04T21:00:00+05:30",
        "count": 1,
        "total_games": 36,
        "percentage": 2.7777777777777777
      },
      {
        "interval_start": "2025-04-04T21:00:00+05:30",
        "interval_end": "2025-04-04T21:15:00+05:30",
        "count": 4,
        "total_games": 31,
        "percentage": 12.903225806451612
      },
      {
        "interval_start": "2025-04-04T21:15:00+05:30",
        "interval_end": "2025-04-04T21:30:00+05:30",
        "count": 4,
        "total_games": 31,
        "percentage": 12.903225806451612
      },
      {
        "interval_start": "2025-04-04T21:30:00+05:30",
        "interval_end": "2025-04-04T21:45:00+05:30",
        "count": 0,
        "total_games": 40,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-04-04T21:45:00+05:30",
        "interval_end": "2025-04-04T22:00:00+05:30",
        "count": 7,
        "total_games": 27,
        "percentage": 25.925925925925924
      },
      {
        "interval_start": "2025-04-04T22:00:00+05:30",
        "interval_end": "2025-04-04T22:15:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-04-04T22:15:00+05:30",
        "interval_end": "2025-04-04T22:30:00+05:30",
        "count": 1,
        "total_games": 31,
        "percentage": 3.225806451612903
      },
      {
        "interval_start": "2025-04-04T22:30:00+05:30",
        "interval_end": "2025-04-04T22:45:00+05:30",
        "count": 3,
        "total_games": 29,
        "percentage": 10.344827586206897
      },
      {
        "interval_start": "2025-04-04T22:45:00+05:30",
        "interval_end": "2025-04-04T23:00:00+05:30",
        "count": 6,
        "total_games": 31,
        "percentage": 19.35483870967742
      },
      {
        "interval_start": "2025-04-04T23:00:00+05:30",
        "interval_end": "2025-04-04T23:15:00+05:30",
        "count": 2,
        "total_games": 34,
        "percentage": 5.88235294117647
      },
      {
        "interval_start": "2025-04-04T23:15:00+05:30",
        "interval_end": "2025-04-04T23:30:00+05:30",
        "count": 3,
        "total_games": 29,
        "percentage": 10.344827586206897
      },
      {
        "interval_start": "2025-04-04T23:30:00+05:30",
        "interval_end": "2025-04-04T23:45:00+05:30",
        "count": 5,
        "total_games": 29,
        "percentage": 17.24137931034483
      },
      {
        "interval_start": "2025-04-04T23:45:00+05:30",
        "interval_end": "2025-04-05T00:00:00+05:30",
        "count": 6,
        "total_games": 28,
        "percentage": 21.428571428571427
      },
      {
        "interval_start": "2025-04-05T00:00:00+05:30",
        "interval_end": "2025-04-05T00:15:00+05:30",
        "count": 3,
        "total_games": 34,
        "percentage": 8.823529411764707
      },
      {
        "interval_start": "2025-04-05T00:15:00+05:30",
        "interval_end": "2025-04-05T00:30:00+05:30",
        "count": 3,
        "total_games": 35,
        "percentage": 8.571428571428571
      },
      {
        "interval_start": "2025-04-05T00:30:00+05:30",
        "interval_end": "2025-04-05T00:45:00+05:30",
        "count": 0,
        "total_games": 38,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-04-05T00:45:00+05:30",
        "interval_end": "2025-04-05T01:00:00+05:30",
        "count": 3,
        "total_games": 28,
        "percentage": 10.714285714285714
      },
      {
        "interval_start": "2025-04-05T01:00:00+05:30",
        "interval_end": "2025-04-05T01:15:00+05:30",
        "count": 4,
        "total_games": 29,
        "percentage": 13.793103448275861
      },
      {
        "interval_start": "2025-04-05T01:15:00+05:30",
        "interval_end": "2025-04-05T01:30:00+05:30",
        "count": 5,
        "total_games": 29,
        "percentage": 17.24137931034483
      },
      {
        "interval_start": "2025-04-05T01:30:00+05:30",
        "interval_end": "2025-04-05T01:45:00+05:30",
        "count": 4,
        "total_games": 28,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-04-05T01:45:00+05:30",
        "interval_end": "2025-04-05T02:00:00+05:30",
        "count": 3,
        "total_games": 31,
        "percentage": 9.67741935483871
      },
      {
        "interval_start": "2025-04-05T02:00:00+05:30",
        "interval_end": "2025-04-05T02:15:00+05:30",
        "count": 2,
        "total_games": 31,
        "percentage": 6.451612903225806
      },
      {
        "interval_start": "2025-04-05T02:15:00+05:30",
        "interval_end": "2025-04-05T02:30:00+05:30",
        "count": 4,
        "total_games": 35,
        "percentage": 11.428571428571429
      },
      {
        "interval_start": "2025-04-05T02:30:00+05:30",
        "interval_end": "2025-04-05T02:45:00+05:30",
        "count": 4,
        "total_games": 33,
        "percentage": 12.121212121212121
      },
      {
        "interval_start": "2025-04-05T02:45:00+05:30",
        "interval_end": "2025-04-05T03:00:00+05:30",
        "count": 2,
        "total_games": 35,
        "percentage": 5.714285714285714
      },
      {
        "interval_start": "2025-04-05T03:00:00+05:30",
        "interval_end": "2025-04-05T03:15:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-04-05T03:15:00+05:30",
        "interval_end": "2025-04-05T03:30:00+05:30",
        "count": 6,
        "total_games": 31,
        "percentage": 19.35483870967742
      },
      {
        "interval_start": "2025-04-05T03:30:00+05:30",
        "interval_end": "2025-04-05T03:45:00+05:30",
        "count": 3,
        "total_games": 31,
        "percentage": 9.67741935483871
      },
      {
        "interval_start": "2025-04-05T03:45:00+05:30",
        "interval_end": "2025-04-05T04:00:00+05:30",
        "count": 2,
        "total_games": 36,
        "percentage": 5.555555555555555
      },
      {
        "interval_start": "2025-04-05T04:00:00+05:30",
        "interval_end": "2025-04-05T04:15:00+05:30",
        "count": 3,
        "total_games": 31,
        "percentage": 9.67741935483871
      },
      {
        "interval_start": "2025-04-05T04:15:00+05:30",
        "interval_end": "2025-04-05T04:30:00+05:30",
        "count": 1,
        "total_games": 39,
        "percentage": 2.564102564102564
      },
      {
        "interval_start": "2025-04-05T04:30:00+05:30",
        "interval_end": "2025-04-05T04:45:00+05:30",
        "count": 3,
        "total_games": 31,
        "percentage": 9.67741935483871
      },
      {
        "interval_start": "2025-04-05T04:45:00+05:30",
        "interval_end": "2025-04-05T05:00:00+05:30",
        "count": 3,
        "total_games": 34,
        "percentage": 8.823529411764707
      },
      {
        "interval_start": "2025-04-05T05:00:00+05:30",
        "interval_end": "2025-04-05T05:15:00+05:30",
        "count": 8,
        "total_games": 26,
        "percentage": 30.76923076923077
      },
      {
        "interval_start": "2025-04-05T05:15:00+05:30",
        "interval_end": "2025-04-05T05:30:00+05:30",
        "count": 1,
        "total_games": 34,
        "percentage": 2.941176470588235
      },
      {
        "interval_start": "2025-04-05T05:30:00+05:30",
        "interval_end": "2025-04-05T05:45:00+05:30",
        "count": 2,
        "total_games": 31,
        "percentage": 6.451612903225806
      },
      {
        "interval_start": "2025-04-05T05:45:00+05:30",
        "interval_end": "2025-04-05T06:00:00+05:30",
        "count": 2,
        "total_games": 34,
        "percentage": 5.88235294117647
      },
      {
        "interval_start": "2025-04-05T06:00:00+05:30",
        "interval_end": "2025-04-05T06:15:00+05:30",
        "count": 3,
        "total_games": 36,
        "percentage": 8.333333333333332
      },
      {
        "interval_start": "2025-04-05T06:15:00+05:30",
        "interval_end": "2025-04-05T06:30:00+05:30",
        "count": 2,
        "total_games": 39,
        "percentage": 5.128205128205128
      },
      {
        "interval_start": "2025-04-05T06:30:00+05:30",
        "interval_end": "2025-04-05T06:45:00+05:30",
        "count": 2,
        "total_games": 35,
        "percentage": 5.714285714285714
      },
      {
        "interval_start": "2025-04-05T06:45:00+05:30",
        "interval_end": "2025-04-05T07:00:00+05:30",
        "count": 3,
        "total_games": 30,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-04-05T07:00:00+05:30",
        "interval_end": "2025-04-05T07:15:00+05:30",
        "count": 4,
        "total_games": 29,
        "percentage": 13.793103448275861
      },
      {
        "interval_start": "2025-04-05T07:15:00+05:30",
        "interval_end": "2025-04-05T07:30:00+05:30",
        "count": 3,
        "total_games": 34,
        "percentage": 8.823529411764707
      },
      {
        "interval_start": "2025-04-05T07:30:00+05:30",
        "interval_end": "2025-04-05T07:45:00+05:30",
        "count": 2,
        "total_games": 34,
        "percentage": 5.88235294117647
      },
      {
        "interval_start": "2025-04-05T07:45:00+05:30",
        "interval_end": "2025-04-05T08:00:00+05:30",
        "count": 3,
        "total_games": 36,
        "percentage": 8.333333333333332
      },
      {
        "interval_start": "2025-04-05T08:00:00+05:30",
        "interval_end": "2025-04-05T08:15:00+05:30",
        "count": 2,
        "total_games": 33,
        "percentage": 6.0606060606060606
      },
      {
        "interval_start": "2025-04-05T08:15:00+05:30",
        "interval_end": "2025-04-05T08:30:00+05:30",
        "count": 2,
        "total_games": 34,
        "percentage": 5.88235294117647
      },
      {
        "interval_start": "2025-04-05T08:30:00+05:30",
        "interval_end": "2025-04-05T08:45:00+05:30",
        "count": 5,
        "total_games": 29,
        "percentage": 17.24137931034483
      },
      {
        "interval_start": "2025-04-05T08:45:00+05:30",
        "interval_end": "2025-04-05T09:00:00+05:30",
        "count": 2,
        "total_games": 38,
        "percentage": 5.263157894736842
      },
      {
        "interval_start": "2025-04-05T09:00:00+05:30",
        "interval_end": "2025-04-05T09:15:00+05:30",
        "count": 2,
        "total_games": 34,
        "percentage": 5.88235294117647
      },
      {
        "interval_start": "2025-04-05T09:15:00+05:30",
        "interval_end": "2025-04-05T09:30:00+05:30",
        "count": 2,
        "total_games": 38,
        "percentage": 5.263157894736842
      },
      {
        "interval_start": "2025-04-05T09:30:00+05:30",
        "interval_end": "2025-04-05T09:45:00+05:30",
        "count": 3,
        "total_games": 29,
        "percentage": 10.344827586206897
      },
      {
        "interval_start": "2025-04-05T09:45:00+05:30",
        "interval_end": "2025-04-05T10:00:00+05:30",
        "count": 2,
        "total_games": 32,
        "percentage": 6.25
      },
      {
        "interval_start": "2025-04-05T10:00:00+05:30",
        "interval_end": "2025-04-05T10:15:00+05:30",
        "count": 4,
        "total_games": 31,
        "percentage": 12.903225806451612
      },
      {
        "interval_start": "2025-04-05T10:15:00+05:30",
        "interval_end": "2025-04-05T10:30:00+05:30",
        "count": 3,
        "total_games": 28,
        "percentage": 10.714285714285714
      },
      {
        "interval_start": "2025-04-05T10:30:00+05:30",
        "interval_end": "2025-04-05T10:45:00+05:30",
        "count": 5,
        "total_games": 31,
        "percentage": 16.129032258064516
      },
      {
        "interval_start": "2025-04-05T10:45:00+05:30",
        "interval_end": "2025-04-05T11:00:00+05:30",
        "count": 4,
        "total_games": 33,
        "percentage": 12.121212121212121
      },
      {
        "interval_start": "2025-04-05T11:00:00+05:30",
        "interval_end": "2025-04-05T11:15:00+05:30",
        "count": 2,
        "total_games": 28,
        "percentage": 7.142857142857142
      },
      {
        "interval_start": "2025-04-05T11:15:00+05:30",
        "interval_end": "2025-04-05T11:30:00+05:30",
        "count": 4,
        "total_games": 30,
        "percentage": 13.333333333333334
      },
      {
        "interval_start": "2025-04-05T11:30:00+05:30",
        "interval_end": "2025-04-05T11:45:00+05:30",
        "count": 5,
        "total_games": 30,
        "percentage": 16.666666666666664
      },
      {
        "interval_start": "2025-04-05T11:45:00+05:30",
        "interval_end": "2025-04-05T12:00:00+05:30",
        "count": 2,
        "total_games": 35,
        "percentage": 5.714285714285714
      },
      {
        "interval_start": "2025-04-05T12:00:00+05:30",
        "interval_end": "2025-04-05T12:15:00+05:30",
        "count": 3,
        "total_games": 28,
        "percentage": 10.714285714285714
      },
      {
        "interval_start": "2025-04-05T12:15:00+05:30",
        "interval_end": "2025-04-05T12:30:00+05:30",
        "count": 2,
        "total_games": 31,
        "percentage": 6.451612903225806
      },
      {
        "interval_start": "2025-04-05T12:30:00+05:30",
        "interval_end": "2025-04-05T12:45:00+05:30",
        "count": 4,
        "total_games": 32,
        "percentage": 12.5
      },
      {
        "interval_start": "2025-04-05T12:45:00+05:30",
        "interval_end": "2025-04-05T13:00:00+05:30",
        "count": 2,
        "total_games": 32,
        "percentage": 6.25
      },
      {
        "interval_start": "2025-04-05T13:00:00+05:30",
        "interval_end": "2025-04-05T13:15:00+05:30",
        "count": 4,
        "total_games": 33,
        "percentage": 12.121212121212121
      },
      {
        "interval_start": "2025-04-05T13:15:00+05:30",
        "interval_end": "2025-04-05T13:30:00+05:30",
        "count": 1,
        "total_games": 35,
        "percentage": 2.857142857142857
      },
      {
        "interval_start": "2025-04-05T13:30:00+05:30",
        "interval_end": "2025-04-05T13:45:00+05:30",
        "count": 4,
        "total_games": 25,
        "percentage": 16.0
      },
      {
        "interval_start": "2025-04-05T13:45:00+05:30",
        "interval_end": "2025-04-05T14:00:00+05:30",
        "count": 1,
        "total_games": 33,
        "percentage": 3.0303030303030303
      },
      {
        "interval_start": "2025-04-05T14:00:00+05:30",
        "interval_end": "2025-04-05T14:15:00+05:30",
        "count": 2,
        "total_games": 30,
        "percentage": 6.666666666666667
      },
      {
        "interval_start": "2025-04-05T14:15:00+05:30",
        "interval_end": "2025-04-05T14:30:00+05:30",
        "count": 3,
        "total_games": 34,
        "percentage": 8.823529411764707
      },
      {
        "interval_start": "2025-04-05T14:30:00+05:30",
        "interval_end": "2025-04-05T14:45:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-04-05T14:45:00+05:30",
        "interval_end": "2025-04-05T15:00:00+05:30",
        "count": 4,
        "total_games": 31,
        "percentage": 12.903225806451612
      },
      {
        "interval_start": "2025-04-05T15:00:00+05:30",
        "interval_end": "2025-04-05T15:15:00+05:30",
        "count": 8,
        "total_games": 23,
        "percentage": 34.78260869565217
      },
      {
        "interval_start": "2025-04-05T15:15:00+05:30",
        "interval_end": "2025-04-05T15:30:00+05:30",
        "count": 2,
        "total_games": 37,
        "percentage": 5.405405405405405
      },
      {
        "interval_start": "2025-04-05T15:30:00+05:30",
        "interval_end": "2025-04-05T15:45:00+05:30",
        "count": 3,
        "total_games": 31,
        "percentage": 9.67741935483871
      },
      {
        "interval_start": "2025-04-05T15:45:00+05:30",
        "interval_end": "2025-04-05T16:00:00+05:30",
        "count": 4,
        "total_games": 29,
        "percentage": 13.793103448275861
      },
      {
        "interval_start": "2025-04-05T16:00:00+05:30",
        "interval_end": "2025-04-05T16:15:00+05:30",
        "count": 4,
        "total_games": 29,
        "percentage": 13.793103448275861
      },
      {
        "interval_start": "2025-04-05T16:15:00+05:30",
        "interval_end": "2025-04-05T16:30:00+05:30",
        "count": 2,
        "total_games": 36,
        "percentage": 5.555555555555555
      },
      {
        "interval_start": "2025-04-05T16:30:00+05:30",
        "interval_end": "2025-04-05T16:45:00+05:30",
        "count": 6,
        "total_games": 23,
        "percentage": 26.08695652173913
      },
      {
        "interval_start": "2025-04-05T16:45:00+05:30",
        "interval_end": "2025-04-05T17:00:00+05:30",
        "count": 3,
        "total_games": 27,
        "percentage": 11.11111111111111
      },
      {
        "interval_start": "2025-04-05T17:00:00+05:30",
        "interval_end": "2025-04-05T17:15:00+05:30",
        "count": 3,
        "total_games": 31,
        "percentage": 9.67741935483871
      },
      {
        "interval_start": "2025-04-05T17:15:00+05:30",
        "interval_end": "2025-04-05T17:30:00+05:30",
        "count": 2,
        "total_games": 33,
        "percentage": 6.0606060606060606
      },
      {
        "interval_start": "2025-04-05T17:30:00+05:30",
        "interval_end": "2025-04-05T17:45:00+05:30",
        "count": 2,
        "total_games": 31,
        "percentage": 6.451612903225806
      },
      {
        "interval_start": "2025-04-05T17:45:00+05:30",
        "interval_end": "2025-04-05T18:00:00+05:30",
        "count": 2,
        "total_games": 33,
        "percentage": 6.0606060606060606
      },
      {
        "interval_start": "2025-04-05T18:00:00+05:30",
        "interval_end": "2025-04-05T18:15:00+05:30",
        "count": 4,
        "total_games": 32,
        "percentage": 12.5
      },
      {
        "interval_start": "2025-04-05T18:15:00+05:30",
        "interval_end": "2025-04-05T18:30:00+05:30",
        "count": 3,
        "total_games": 32,
        "percentage": 9.375
      },
      {
        "interval_start": "2025-04-05T18:30:00+05:30",
        "interval_end": "2025-04-05T18:45:00+05:30",
        "count": 1,
        "total_games": 36,
        "percentage": 2.7777777777777777
      },
      {
        "interval_start": "2025-04-05T18:45:00+05:30",
        "interval_end": "2025-04-05T19:00:00+05:30",
        "count": 2,
        "total_games": 33,
        "percentage": 6.0606060606060606
      },
      {
        "interval_start": "2025-04-05T19:00:00+05:30",
        "interval_end": "2025-04-05T19:15:00+05:30",
        "count": 2,
        "total_games": 33,
        "percentage": 6.0606060606060606
      },
      {
        "interval_start": "2025-04-05T19:15:00+05:30",
        "interval_end": "2025-04-05T19:30:00+05:30",
        "count": 2,
        "total_games": 37,
        "percentage": 5.405405405405405
      },
      {
        "interval_start": "2025-04-05T19:30:00+05:30",
        "interval_end": "2025-04-05T19:45:00+05:30",
        "count": 2,
        "total_games": 32,
        "percentage": 6.25
      },
      {
        "interval_start": "2025-04-05T19:45:00+05:30",
        "interval_end": "2025-04-05T20:00:00+05:30",
        "count": 3,
        "total_games": 31,
        "percentage": 9.67741935483871
      },
      {
        "interval_start": "2025-04-05T20:00:00+05:30",
        "interval_end": "2025-04-05T20:15:00+05:30",
        "count": 2,
        "total_games": 32,
        "percentage": 6.25
      },
      {
        "interval_start": "2025-04-05T20:15:00+05:30",
        "interval_end": "2025-04-05T20:30:00+05:30",
        "count": 2,
        "total_games": 37,
        "percentage": 5.405405405405405
      },
      {
        "interval_start": "2025-04-05T20:30:00+05:30",
        "interval_end": "2025-04-05T20:45:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-04-05T20:45:00+05:30",
        "interval_end": "2025-04-05T21:00:00+05:30",
        "count": 4,
        "total_games": 30,
        "percentage": 13.333333333333334
      },
      {
        "interval_start": "2025-04-05T21:00:00+05:30",
        "interval_end": "2025-04-05T21:15:00+05:30",
        "count": 4,
        "total_games": 32,
        "percentage": 12.5
      },
      {
        "interval_start": "2025-04-05T21:15:00+05:30",
        "interval_end": "2025-04-05T21:30:00+05:30",
        "count": 4,
        "total_games": 33,
        "percentage": 12.121212121212121
      },
      {
        "interval_start": "2025-04-05T21:30:00+05:30",
        "interval_end": "2025-04-05T21:45:00+05:30",
        "count": 1,
        "total_games": 36,
        "percentage": 2.7777777777777777
      },
      {
        "interval_start": "2025-04-05T21:45:00+05:30",
        "interval_end": "2025-04-05T22:00:00+05:30",
        "count": 3,
        "total_games": 34,
        "percentage": 8.823529411764707
      },
      {
        "interval_start": "2025-04-05T22:00:00+05:30",
        "interval_end": "2025-04-05T22:15:00+05:30",
        "count": 4,
        "total_games": 25,
        "percentage": 16.0
      },
      {
        "interval_start": "2025-04-05T22:15:00+05:30",
        "interval_end": "2025-04-05T22:30:00+05:30",
        "count": 3,
        "total_games": 32,
        "percentage": 9.375
      },
      {
        "interval_start": "2025-04-05T22:30:00+05:30",
        "interval_end": "2025-04-05T22:45:00+05:30",
        "count": 1,
        "total_games": 34,
        "percentage": 2.941176470588235
      },
      {
        "interval_start": "2025-04-05T22:45:00+05:30",
        "interval_end": "2025-04-05T23:00:00+05:30",
        "count": 5,
        "total_games": 24,
        "percentage": 20.833333333333336
      },
      {
        "interval_start": "2025-04-05T23:00:00+05:30",
        "interval_end": "2025-04-05T23:15:00+05:30",
        "count": 4,
        "total_games": 28,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-04-05T23:15:00+05:30",
        "interval_end": "2025-04-05T23:30:00+05:30",
        "count": 2,
        "total_games": 32,
        "percentage": 6.25
      }
    ]
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 20966  100 20966    0     0  35218      0 --:--:-- --:--:-- --:--:-- 35177
{
  "status": "success",
  "data": {
    "min_value": 10.0,
    "games_per_set": 10,
    "total_games": 1000,
    "count": 100,
    "intervals": [
      {
        "set_id": 1,
        "start_time": "2025-04-05T23:26:51.499000+05:30",
        "end_time": "2025-04-05T23:28:42.860000+05:30",
        "start_game": 8011801,
        "end_game": 8011810,
        "count": 0,
        "total_games": 5,
        "percentage": 0.0
      },
      {
        "set_id": 2,
        "start_time": "2025-04-05T23:22:50.244000+05:30",
        "end_time": "2025-04-05T23:26:19.156000+05:30",
        "start_game": 8011791,
        "end_game": 8011800,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 3,
        "start_time": "2025-04-05T23:18:40.593000+05:30",
        "end_time": "2025-04-05T23:22:28.396000+05:30",
        "start_game": 8011781,
        "end_game": 8011790,
        "count": 2,
        "total_games": 10,
        "percentage": 20.0
      },
      {
        "set_id": 4,
        "start_time": "2025-04-05T23:13:50.560000+05:30",
        "end_time": "2025-04-05T23:17:48.738000+05:30",
        "start_game": 8011771,
        "end_game": 8011780,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 5,
        "start_time": "2025-04-05T23:07:29.679000+05:30",
        "end_time": "2025-04-05T23:13:12.071000+05:30",
        "start_game": 8011761,
        "end_game": 8011770,
        "count": 4,
        "total_games": 10,
        "percentage": 40.0
      },
      {
        "set_id": 6,
        "start_time": "2025-04-05T23:02:10.605000+05:30",
        "end_time": "2025-04-05T23:06:15.769000+05:30",
        "start_game": 8011751,
        "end_game": 8011760,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 7,
        "start_time": "2025-04-05T22:57:28.414000+05:30",
        "end_time": "2025-04-05T23:01:30.521000+05:30",
        "start_game": 8011741,
        "end_game": 8011750,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 8,
        "start_time": "2025-04-05T22:51:50.011000+05:30",
        "end_time": "2025-04-05T22:57:04.005000+05:30",
        "start_game": 8011731,
        "end_game": 8011740,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 9,
        "start_time": "2025-04-05T22:44:52.810000+05:30",
        "end_time": "2025-04-05T22:51:32.219000+05:30",
        "start_game": 8011721,
        "end_game": 8011730,
        "count": 3,
        "total_games": 10,
        "percentage": 30.0
      },
      {
        "set_id": 10,
        "start_time": "2025-04-05T22:40:26.626000+05:30",
        "end_time": "2025-04-05T22:44:34.789000+05:30",
        "start_game": 8011711,
        "end_game": 8011720,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 11,
        "start_time": "2025-04-05T22:35:40.272000+05:30",
        "end_time": "2025-04-05T22:39:39.031000+05:30",
        "start_game": 8011701,
        "end_game": 8011710,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 12,
        "start_time": "2025-04-05T22:31:33.656000+05:30",
        "end_time": "2025-04-05T22:35:26.306000+05:30",
        "start_game": 8011691,
        "end_game": 8011700,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 13,
        "start_time": "2025-04-05T22:27:34.888000+05:30",
        "end_time": "2025-04-05T22:31:17.852000+05:30",
        "start_game": 8011681,
        "end_game": 8011690,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 14,
        "start_time": "2025-04-05T22:23:12.886000+05:30",
        "end_time": "2025-04-05T22:27:12.868000+05:30",
        "start_game": 8011671,
        "end_game": 8011680,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 15,
        "start_time": "2025-04-05T22:17:07.918000+05:30",
        "end_time": "2025-04-05T22:22:36.939000+05:30",
        "start_game": 8011661,
        "end_game": 8011670,
        "count": 2,
        "total_games": 10,
        "percentage": 20.0
      },
      {
        "set_id": 16,
        "start_time": "2025-04-05T22:13:39.909000+05:30",
        "end_time": "2025-04-05T22:16:49.382000+05:30",
        "start_game": 8011651,
        "end_game": 8011660,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 17,
        "start_time": "2025-04-05T22:05:01.783000+05:30",
        "end_time": "2025-04-05T22:12:51.198000+05:30",
        "start_game": 8011641,
        "end_game": 8011650,
        "count": 4,
        "total_games": 10,
        "percentage": 40.0
      },
      {
        "set_id": 18,
        "start_time": "2025-04-05T22:00:16.154000+05:30",
        "end_time": "2025-04-05T22:04:30.288000+05:30",
        "start_game": 8011631,
        "end_game": 8011640,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 19,
        "start_time": "2025-04-05T21:56:39.665000+05:30",
        "end_time": "2025-04-05T21:59:45.614000+05:30",
        "start_game": 8011621,
        "end_game": 8011630,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 20,
        "start_time": "2025-04-05T21:53:07.857000+05:30",
        "end_time": "2025-04-05T21:56:09.808000+05:30",
        "start_game": 8011611,
        "end_game": 8011620,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 21,
        "start_time": "2025-04-05T21:48:00.702000+05:30",
        "end_time": "2025-04-05T21:52:46.267000+05:30",
        "start_game": 8011601,
        "end_game": 8011610,
        "count": 3,
        "total_games": 10,
        "percentage": 30.0
      },
      {
        "set_id": 22,
        "start_time": "2025-04-05T21:42:59.219000+05:30",
        "end_time": "2025-04-05T21:46:30.841000+05:30",
        "start_game": 8011591,
        "end_game": 8011600,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 23,
        "start_time": "2025-04-05T21:40:07.180000+05:30",
        "end_time": "2025-04-05T21:42:43.786000+05:30",
        "start_game": 8011581,
        "end_game": 8011590,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 24,
        "start_time": "2025-04-05T21:35:15.827000+05:30",
        "end_time": "2025-04-05T21:39:52.664000+05:30",
        "start_game": 8011571,
        "end_game": 8011580,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 25,
        "start_time": "2025-04-05T21:30:48.305000+05:30",
        "end_time": "2025-04-05T21:34:56.313000+05:30",
        "start_game": 8011561,
        "end_game": 8011570,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 26,
        "start_time": "2025-04-05T21:26:23.961000+05:30",
        "end_time": "2025-04-05T21:29:58.919000+05:30",
        "start_game": 8011551,
        "end_game": 8011560,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 27,
        "start_time": "2025-04-05T21:21:13.587000+05:30",
        "end_time": "2025-04-05T21:25:07.866000+05:30",
        "start_game": 8011541,
        "end_game": 8011550,
        "count": 2,
        "total_games": 10,
        "percentage": 20.0
      },
      {
        "set_id": 28,
        "start_time": "2025-04-05T21:16:40.292000+05:30",
        "end_time": "2025-04-05T21:20:03.223000+05:30",
        "start_game": 8011531,
        "end_game": 8011540,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 29,
        "start_time": "2025-04-05T21:12:11.323000+05:30",
        "end_time": "2025-04-05T21:16:21.002000+05:30",
        "start_game": 8011521,
        "end_game": 8011530,
        "count": 2,
        "total_games": 10,
        "percentage": 20.0
      },
      {
        "set_id": 30,
        "start_time": "2025-04-05T21:06:39.164000+05:30",
        "end_time": "2025-04-05T21:11:46.181000+05:30",
        "start_game": 8011511,
        "end_game": 8011520,
        "count": 2,
        "total_games": 10,
        "percentage": 20.0
      },
      {
        "set_id": 31,
        "start_time": "2025-04-05T21:02:02.773000+05:30",
        "end_time": "2025-04-05T21:05:30+05:30",
        "start_game": 8011501,
        "end_game": 8011510,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 32,
        "start_time": "2025-04-05T20:58:00.427000+05:30",
        "end_time": "2025-04-05T21:01:32.956000+05:30",
        "start_game": 8011491,
        "end_game": 8011500,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 33,
        "start_time": "2025-04-05T20:53:49.006000+05:30",
        "end_time": "2025-04-05T20:57:39.296000+05:30",
        "start_game": 8011481,
        "end_game": 8011490,
        "count": 2,
        "total_games": 10,
        "percentage": 20.0
      },
      {
        "set_id": 34,
        "start_time": "2025-04-05T20:48:58.138000+05:30",
        "end_time": "2025-04-05T20:52:54.714000+05:30",
        "start_game": 8011471,
        "end_game": 8011480,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 35,
        "start_time": "2025-04-05T20:43:19.276000+05:30",
        "end_time": "2025-04-05T20:48:23.260000+05:30",
        "start_game": 8011461,
        "end_game": 8011470,
        "count": 3,
        "total_games": 10,
        "percentage": 30.0
      },
      {
        "set_id": 36,
        "start_time": "2025-04-05T20:38:27.040000+05:30",
        "end_time": "2025-04-05T20:42:17.283000+05:30",
        "start_game": 8011451,
        "end_game": 8011460,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 37,
        "start_time": "2025-04-05T20:34:20.146000+05:30",
        "end_time": "2025-04-05T20:37:58.084000+05:30",
        "start_game": 8011441,
        "end_game": 8011450,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 38,
        "start_time": "2025-04-05T20:29:23.391000+05:30",
        "end_time": "2025-04-05T20:33:26.253000+05:30",
        "start_game": 8011431,
        "end_game": 8011440,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 39,
        "start_time": "2025-04-05T20:25:17.835000+05:30",
        "end_time": "2025-04-05T20:29:07.499000+05:30",
        "start_game": 8011421,
        "end_game": 8011430,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 40,
        "start_time": "2025-04-05T20:22:04.020000+05:30",
        "end_time": "2025-04-05T20:24:56.976000+05:30",
        "start_game": 8011411,
        "end_game": 8011420,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 41,
        "start_time": "2025-04-05T20:17:07.834000+05:30",
        "end_time": "2025-04-05T20:21:44.772000+05:30",
        "start_game": 8011401,
        "end_game": 8011410,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 42,
        "start_time": "2025-04-05T20:13:16.809000+05:30",
        "end_time": "2025-04-05T20:16:46.643000+05:30",
        "start_game": 8011391,
        "end_game": 8011400,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 43,
        "start_time": "2025-04-05T20:08:44.781000+05:30",
        "end_time": "2025-04-05T20:12:48.685000+05:30",
        "start_game": 8011381,
        "end_game": 8011390,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 44,
        "start_time": "2025-04-05T20:04:11.700000+05:30",
        "end_time": "2025-04-05T20:08:10.374000+05:30",
        "start_game": 8011371,
        "end_game": 8011380,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 45,
        "start_time": "2025-04-05T19:59:17.371000+05:30",
        "end_time": "2025-04-05T20:03:52.440000+05:30",
        "start_game": 8011361,
        "end_game": 8011370,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 46,
        "start_time": "2025-04-05T19:54:01.334000+05:30",
        "end_time": "2025-04-05T19:58:58.809000+05:30",
        "start_game": 8011351,
        "end_game": 8011360,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 47,
        "start_time": "2025-04-05T19:48:29.406000+05:30",
        "end_time": "2025-04-05T19:53:12.518000+05:30",
        "start_game": 8011341,
        "end_game": 8011350,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 48,
        "start_time": "2025-04-05T19:43:43.153000+05:30",
        "end_time": "2025-04-05T19:48:03.549000+05:30",
        "start_game": 8011331,
        "end_game": 8011340,
        "count": 2,
        "total_games": 10,
        "percentage": 20.0
      },
      {
        "set_id": 49,
        "start_time": "2025-04-05T19:38:22.837000+05:30",
        "end_time": "2025-04-05T19:42:55.339000+05:30",
        "start_game": 8011321,
        "end_game": 8011330,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 50,
        "start_time": "2025-04-05T19:33:34.265000+05:30",
        "end_time": "2025-04-05T19:37:51.828000+05:30",
        "start_game": 8011311,
        "end_game": 8011320,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 51,
        "start_time": "2025-04-05T19:30:09.628000+05:30",
        "end_time": "2025-04-05T19:33:05.852000+05:30",
        "start_game": 8011301,
        "end_game": 8011310,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 52,
        "start_time": "2025-04-05T19:25:54.486000+05:30",
        "end_time": "2025-04-05T19:29:55.194000+05:30",
        "start_game": 8011291,
        "end_game": 8011300,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 53,
        "start_time": "2025-04-05T19:21:57.482000+05:30",
        "end_time": "2025-04-05T19:25:39.360000+05:30",
        "start_game": 8011281,
        "end_game": 8011290,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 54,
        "start_time": "2025-04-05T19:17:52.712000+05:30",
        "end_time": "2025-04-05T19:21:41.417000+05:30",
        "start_game": 8011271,
        "end_game": 8011280,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 55,
        "start_time": "2025-04-05T19:13:24.268000+05:30",
        "end_time": "2025-04-05T19:17:32.514000+05:30",
        "start_game": 8011261,
        "end_game": 8011270,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 56,
        "start_time": "2025-04-05T19:09:49.063000+05:30",
        "end_time": "2025-04-05T19:13:09.969000+05:30",
        "start_game": 8011251,
        "end_game": 8011260,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 57,
        "start_time": "2025-04-05T19:05:24.316000+05:30",
        "end_time": "2025-04-05T19:09:30.299000+05:30",
        "start_game": 8011241,
        "end_game": 8011250,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 58,
        "start_time": "2025-04-05T19:00:37.453000+05:30",
        "end_time": "2025-04-05T19:05:04.054000+05:30",
        "start_game": 8011231,
        "end_game": 8011240,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 59,
        "start_time": "2025-04-05T18:55:26.803000+05:30",
        "end_time": "2025-04-05T18:59:55.880000+05:30",
        "start_game": 8011221,
        "end_game": 8011230,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 60,
        "start_time": "2025-04-05T18:51:01.671000+05:30",
        "end_time": "2025-04-05T18:55:04.797000+05:30",
        "start_game": 8011211,
        "end_game": 8011220,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 61,
        "start_time": "2025-04-05T18:46:01.418000+05:30",
        "end_time": "2025-04-05T18:50:08.719000+05:30",
        "start_game": 8011201,
        "end_game": 8011210,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 62,
        "start_time": "2025-04-05T18:42:22.798000+05:30",
        "end_time": "2025-04-05T18:45:42.536000+05:30",
        "start_game": 8011191,
        "end_game": 8011200,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 63,
        "start_time": "2025-04-05T18:37:57.289000+05:30",
        "end_time": "2025-04-05T18:41:51.956000+05:30",
        "start_game": 8011181,
        "end_game": 8011190,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 64,
        "start_time": "2025-04-05T18:34:26.770000+05:30",
        "end_time": "2025-04-05T18:37:20.644000+05:30",
        "start_game": 8011171,
        "end_game": 8011180,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 65,
        "start_time": "2025-04-05T18:29:58.380000+05:30",
        "end_time": "2025-04-05T18:33:57.907000+05:30",
        "start_game": 8011161,
        "end_game": 8011170,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 66,
        "start_time": "2025-04-05T18:25:53.007000+05:30",
        "end_time": "2025-04-05T18:29:36.723000+05:30",
        "start_game": 8011151,
        "end_game": 8011160,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 67,
        "start_time": "2025-04-05T18:21:29.626000+05:30",
        "end_time": "2025-04-05T18:25:38.357000+05:30",
        "start_game": 8011141,
        "end_game": 8011150,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 68,
        "start_time": "2025-04-05T18:16:11.545000+05:30",
        "end_time": "2025-04-05T18:20:52.491000+05:30",
        "start_game": 8011131,
        "end_game": 8011140,
        "count": 2,
        "total_games": 10,
        "percentage": 20.0
      },
      {
        "set_id": 69,
        "start_time": "2025-04-05T18:11:22.516000+05:30",
        "end_time": "2025-04-05T18:15:12.520000+05:30",
        "start_game": 8011121,
        "end_game": 8011130,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 70,
        "start_time": "2025-04-05T18:06:56.034000+05:30",
        "end_time": "2025-04-05T18:11:09.200000+05:30",
        "start_game": 8011111,
        "end_game": 8011120,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 71,
        "start_time": "2025-04-05T18:02:40.977000+05:30",
        "end_time": "2025-04-05T18:06:39.610000+05:30",
        "start_game": 8011101,
        "end_game": 8011110,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 72,
        "start_time": "2025-04-05T17:57:07.595000+05:30",
        "end_time": "2025-04-05T18:01:22.006000+05:30",
        "start_game": 8011091,
        "end_game": 8011100,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 73,
        "start_time": "2025-04-05T17:51:48.150000+05:30",
        "end_time": "2025-04-05T17:56:52.494000+05:30",
        "start_game": 8011081,
        "end_game": 8011090,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 74,
        "start_time": "2025-04-05T17:48:08.897000+05:30",
        "end_time": "2025-04-05T17:51:28.706000+05:30",
        "start_game": 8011071,
        "end_game": 8011080,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 75,
        "start_time": "2025-04-05T17:43:47.959000+05:30",
        "end_time": "2025-04-05T17:47:54.701000+05:30",
        "start_game": 8011061,
        "end_game": 8011070,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 76,
        "start_time": "2025-04-05T17:39:43.829000+05:30",
        "end_time": "2025-04-05T17:43:23.543000+05:30",
        "start_game": 8011051,
        "end_game": 8011060,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 77,
        "start_time": "2025-04-05T17:33:05.645000+05:30",
        "end_time": "2025-04-05T17:38:31.654000+05:30",
        "start_game": 8011041,
        "end_game": 8011050,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 78,
        "start_time": "2025-04-05T17:29:09.758000+05:30",
        "end_time": "2025-04-05T17:32:39.622000+05:30",
        "start_game": 8011031,
        "end_game": 8011040,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 79,
        "start_time": "2025-04-05T17:24:15.866000+05:30",
        "end_time": "2025-04-05T17:28:50.897000+05:30",
        "start_game": 8011021,
        "end_game": 8011030,
        "count": 2,
        "total_games": 10,
        "percentage": 20.0
      },
      {
        "set_id": 80,
        "start_time": "2025-04-05T17:20:03.624000+05:30",
        "end_time": "2025-04-05T17:23:59.884000+05:30",
        "start_game": 8011011,
        "end_game": 8011020,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 81,
        "start_time": "2025-04-05T17:15:14.260000+05:30",
        "end_time": "2025-04-05T17:19:46.796000+05:30",
        "start_game": 8011001,
        "end_game": 8011010,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 82,
        "start_time": "2025-04-05T17:10:40.149000+05:30",
        "end_time": "2025-04-05T17:14:39.780000+05:30",
        "start_game": 8010991,
        "end_game": 8011000,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 83,
        "start_time": "2025-04-05T17:06:08.546000+05:30",
        "end_time": "2025-04-05T17:09:55.441000+05:30",
        "start_game": 8010981,
        "end_game": 8010990,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 84,
        "start_time": "2025-04-05T17:01:08.246000+05:30",
        "end_time": "2025-04-05T17:05:41.355000+05:30",
        "start_game": 8010971,
        "end_game": 8010980,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 85,
        "start_time": "2025-04-05T16:55:02.653000+05:30",
        "end_time": "2025-04-05T17:00:42.386000+05:30",
        "start_game": 8010961,
        "end_game": 8010970,
        "count": 3,
        "total_games": 10,
        "percentage": 30.0
      },
      {
        "set_id": 86,
        "start_time": "2025-04-05T16:48:49.663000+05:30",
        "end_time": "2025-04-05T16:54:24.958000+05:30",
        "start_game": 8010951,
        "end_game": 8010960,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 87,
        "start_time": "2025-04-05T16:44:29.219000+05:30",
        "end_time": "2025-04-05T16:48:27.959000+05:30",
        "start_game": 8010941,
        "end_game": 8010950,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 88,
        "start_time": "2025-04-05T16:36:47.146000+05:30",
        "end_time": "2025-04-05T16:43:33.015000+05:30",
        "start_game": 8010931,
        "end_game": 8010940,
        "count": 3,
        "total_games": 10,
        "percentage": 30.0
      },
      {
        "set_id": 89,
        "start_time": "2025-04-05T16:30:37.477000+05:30",
        "end_time": "2025-04-05T16:36:34.125000+05:30",
        "start_game": 8010921,
        "end_game": 8010930,
        "count": 2,
        "total_games": 10,
        "percentage": 20.0
      },
      {
        "set_id": 90,
        "start_time": "2025-04-05T16:26:07.391000+05:30",
        "end_time": "2025-04-05T16:30:17.161000+05:30",
        "start_game": 8010911,
        "end_game": 8010920,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 91,
        "start_time": "2025-04-05T16:21:24.243000+05:30",
        "end_time": "2025-04-05T16:25:38.654000+05:30",
        "start_game": 8010901,
        "end_game": 8010910,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 92,
        "start_time": "2025-04-05T16:17:05.912000+05:30",
        "end_time": "2025-04-05T16:21:06.519000+05:30",
        "start_game": 8010891,
        "end_game": 8010900,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 93,
        "start_time": "2025-04-05T16:13:23.932000+05:30",
        "end_time": "2025-04-05T16:16:51.637000+05:30",
        "start_game": 8010881,
        "end_game": 8010890,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 94,
        "start_time": "2025-04-05T16:08:48.352000+05:30",
        "end_time": "2025-04-05T16:13:06.256000+05:30",
        "start_game": 8010871,
        "end_game": 8010880,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 95,
        "start_time": "2025-04-05T16:02:12.413000+05:30",
        "end_time": "2025-04-05T16:08:34.805000+05:30",
        "start_game": 8010861,
        "end_game": 8010870,
        "count": 3,
        "total_games": 10,
        "percentage": 30.0
      },
      {
        "set_id": 96,
        "start_time": "2025-04-05T15:58:04.010000+05:30",
        "end_time": "2025-04-05T16:01:45.514000+05:30",
        "start_game": 8010851,
        "end_game": 8010860,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 97,
        "start_time": "2025-04-05T15:52:09.043000+05:30",
        "end_time": "2025-04-05T15:57:33.001000+05:30",
        "start_game": 8010841,
        "end_game": 8010850,
        "count": 2,
        "total_games": 10,
        "percentage": 20.0
      },
      {
        "set_id": 98,
        "start_time": "2025-04-05T15:48:19.623000+05:30",
        "end_time": "2025-04-05T15:51:51.681000+05:30",
        "start_game": 8010831,
        "end_game": 8010840,
        "count": 0,
        "total_games": 10,
        "percentage": 0.0
      },
      {
        "set_id": 99,
        "start_time": "2025-04-05T15:42:46.280000+05:30",
        "end_time": "2025-04-05T15:48:01.468000+05:30",
        "start_game": 8010821,
        "end_game": 8010830,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      },
      {
        "set_id": 100,
        "start_time": "2025-04-05T15:37:40.538000+05:30",
        "end_time": "2025-04-05T15:42:20.544000+05:30",
        "start_game": 8010811,
        "end_game": 8010820,
        "count": 1,
        "total_games": 10,
        "percentage": 10.0
      }
    ]
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 20972  100 20972    0     0  30320      0 --:--:-- --:--:-- --:--:-- 30350
{
  "status": "success",
  "data": {
    "min_value": 10.0,
    "games_per_set": 20,
    "total_games": 2000,
    "count": 100,
    "intervals": [
      {
        "set_id": 1,
        "start_time": "2025-04-05T23:26:51.499000+05:30",
        "end_time": "2025-04-05T23:28:42.860000+05:30",
        "start_game": 8011801,
        "end_game": 8011820,
        "count": 0,
        "total_games": 5,
        "percentage": 0.0
      },
      {
        "set_id": 2,
        "start_time": "2025-04-05T23:18:40.593000+05:30",
        "end_time": "2025-04-05T23:26:19.156000+05:30",
        "start_game": 8011781,
        "end_game": 8011800,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 3,
        "start_time": "2025-04-05T23:07:29.679000+05:30",
        "end_time": "2025-04-05T23:17:48.738000+05:30",
        "start_game": 8011761,
        "end_game": 8011780,
        "count": 4,
        "total_games": 20,
        "percentage": 20.0
      },
      {
        "set_id": 4,
        "start_time": "2025-04-05T22:57:28.414000+05:30",
        "end_time": "2025-04-05T23:06:15.769000+05:30",
        "start_game": 8011741,
        "end_game": 8011760,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 5,
        "start_time": "2025-04-05T22:44:52.810000+05:30",
        "end_time": "2025-04-05T22:57:04.005000+05:30",
        "start_game": 8011721,
        "end_game": 8011740,
        "count": 4,
        "total_games": 20,
        "percentage": 20.0
      },
      {
        "set_id": 6,
        "start_time": "2025-04-05T22:35:40.272000+05:30",
        "end_time": "2025-04-05T22:44:34.789000+05:30",
        "start_game": 8011701,
        "end_game": 8011720,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 7,
        "start_time": "2025-04-05T22:27:34.888000+05:30",
        "end_time": "2025-04-05T22:35:26.306000+05:30",
        "start_game": 8011681,
        "end_game": 8011700,
        "count": 0,
        "total_games": 20,
        "percentage": 0.0
      },
      {
        "set_id": 8,
        "start_time": "2025-04-05T22:17:07.918000+05:30",
        "end_time": "2025-04-05T22:27:12.868000+05:30",
        "start_game": 8011661,
        "end_game": 8011680,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 9,
        "start_time": "2025-04-05T22:05:01.783000+05:30",
        "end_time": "2025-04-05T22:16:49.382000+05:30",
        "start_game": 8011641,
        "end_game": 8011660,
        "count": 4,
        "total_games": 20,
        "percentage": 20.0
      },
      {
        "set_id": 10,
        "start_time": "2025-04-05T21:56:39.665000+05:30",
        "end_time": "2025-04-05T22:04:30.288000+05:30",
        "start_game": 8011621,
        "end_game": 8011640,
        "count": 0,
        "total_games": 20,
        "percentage": 0.0
      },
      {
        "set_id": 11,
        "start_time": "2025-04-05T21:48:00.702000+05:30",
        "end_time": "2025-04-05T21:56:09.808000+05:30",
        "start_game": 8011601,
        "end_game": 8011620,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 12,
        "start_time": "2025-04-05T21:40:07.180000+05:30",
        "end_time": "2025-04-05T21:46:30.841000+05:30",
        "start_game": 8011581,
        "end_game": 8011600,
        "count": 0,
        "total_games": 20,
        "percentage": 0.0
      },
      {
        "set_id": 13,
        "start_time": "2025-04-05T21:30:48.305000+05:30",
        "end_time": "2025-04-05T21:39:52.664000+05:30",
        "start_game": 8011561,
        "end_game": 8011580,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 14,
        "start_time": "2025-04-05T21:21:13.587000+05:30",
        "end_time": "2025-04-05T21:29:58.919000+05:30",
        "start_game": 8011541,
        "end_game": 8011560,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 15,
        "start_time": "2025-04-05T21:12:11.323000+05:30",
        "end_time": "2025-04-05T21:20:03.223000+05:30",
        "start_game": 8011521,
        "end_game": 8011540,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 16,
        "start_time": "2025-04-05T21:02:02.773000+05:30",
        "end_time": "2025-04-05T21:11:46.181000+05:30",
        "start_game": 8011501,
        "end_game": 8011520,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 17,
        "start_time": "2025-04-05T20:53:49.006000+05:30",
        "end_time": "2025-04-05T21:01:32.956000+05:30",
        "start_game": 8011481,
        "end_game": 8011500,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 18,
        "start_time": "2025-04-05T20:43:19.276000+05:30",
        "end_time": "2025-04-05T20:52:54.714000+05:30",
        "start_game": 8011461,
        "end_game": 8011480,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 19,
        "start_time": "2025-04-05T20:34:20.146000+05:30",
        "end_time": "2025-04-05T20:42:17.283000+05:30",
        "start_game": 8011441,
        "end_game": 8011460,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 20,
        "start_time": "2025-04-05T20:25:17.835000+05:30",
        "end_time": "2025-04-05T20:33:26.253000+05:30",
        "start_game": 8011421,
        "end_game": 8011440,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 21,
        "start_time": "2025-04-05T20:17:07.834000+05:30",
        "end_time": "2025-04-05T20:24:56.976000+05:30",
        "start_game": 8011401,
        "end_game": 8011420,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 22,
        "start_time": "2025-04-05T20:08:44.781000+05:30",
        "end_time": "2025-04-05T20:16:46.643000+05:30",
        "start_game": 8011381,
        "end_game": 8011400,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 23,
        "start_time": "2025-04-05T19:59:17.371000+05:30",
        "end_time": "2025-04-05T20:08:10.374000+05:30",
        "start_game": 8011361,
        "end_game": 8011380,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 24,
        "start_time": "2025-04-05T19:48:29.406000+05:30",
        "end_time": "2025-04-05T19:58:58.809000+05:30",
        "start_game": 8011341,
        "end_game": 8011360,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 25,
        "start_time": "2025-04-05T19:38:22.837000+05:30",
        "end_time": "2025-04-05T19:48:03.549000+05:30",
        "start_game": 8011321,
        "end_game": 8011340,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 26,
        "start_time": "2025-04-05T19:30:09.628000+05:30",
        "end_time": "2025-04-05T19:37:51.828000+05:30",
        "start_game": 8011301,
        "end_game": 8011320,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 27,
        "start_time": "2025-04-05T19:21:57.482000+05:30",
        "end_time": "2025-04-05T19:29:55.194000+05:30",
        "start_game": 8011281,
        "end_game": 8011300,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 28,
        "start_time": "2025-04-05T19:13:24.268000+05:30",
        "end_time": "2025-04-05T19:21:41.417000+05:30",
        "start_game": 8011261,
        "end_game": 8011280,
        "count": 0,
        "total_games": 20,
        "percentage": 0.0
      },
      {
        "set_id": 29,
        "start_time": "2025-04-05T19:05:24.316000+05:30",
        "end_time": "2025-04-05T19:13:09.969000+05:30",
        "start_game": 8011241,
        "end_game": 8011260,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 30,
        "start_time": "2025-04-05T18:55:26.803000+05:30",
        "end_time": "2025-04-05T19:05:04.054000+05:30",
        "start_game": 8011221,
        "end_game": 8011240,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 31,
        "start_time": "2025-04-05T18:46:01.418000+05:30",
        "end_time": "2025-04-05T18:55:04.797000+05:30",
        "start_game": 8011201,
        "end_game": 8011220,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 32,
        "start_time": "2025-04-05T18:37:57.289000+05:30",
        "end_time": "2025-04-05T18:45:42.536000+05:30",
        "start_game": 8011181,
        "end_game": 8011200,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 33,
        "start_time": "2025-04-05T18:29:58.380000+05:30",
        "end_time": "2025-04-05T18:37:20.644000+05:30",
        "start_game": 8011161,
        "end_game": 8011180,
        "count": 0,
        "total_games": 20,
        "percentage": 0.0
      },
      {
        "set_id": 34,
        "start_time": "2025-04-05T18:21:29.626000+05:30",
        "end_time": "2025-04-05T18:29:36.723000+05:30",
        "start_game": 8011141,
        "end_game": 8011160,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 35,
        "start_time": "2025-04-05T18:11:22.516000+05:30",
        "end_time": "2025-04-05T18:20:52.491000+05:30",
        "start_game": 8011121,
        "end_game": 8011140,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 36,
        "start_time": "2025-04-05T18:02:40.977000+05:30",
        "end_time": "2025-04-05T18:11:09.200000+05:30",
        "start_game": 8011101,
        "end_game": 8011120,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 37,
        "start_time": "2025-04-05T17:51:48.150000+05:30",
        "end_time": "2025-04-05T18:01:22.006000+05:30",
        "start_game": 8011081,
        "end_game": 8011100,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 38,
        "start_time": "2025-04-05T17:43:47.959000+05:30",
        "end_time": "2025-04-05T17:51:28.706000+05:30",
        "start_game": 8011061,
        "end_game": 8011080,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 39,
        "start_time": "2025-04-05T17:33:05.645000+05:30",
        "end_time": "2025-04-05T17:43:23.543000+05:30",
        "start_game": 8011041,
        "end_game": 8011060,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 40,
        "start_time": "2025-04-05T17:24:15.866000+05:30",
        "end_time": "2025-04-05T17:32:39.622000+05:30",
        "start_game": 8011021,
        "end_game": 8011040,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 41,
        "start_time": "2025-04-05T17:15:14.260000+05:30",
        "end_time": "2025-04-05T17:23:59.884000+05:30",
        "start_game": 8011001,
        "end_game": 8011020,
        "count": 0,
        "total_games": 20,
        "percentage": 0.0
      },
      {
        "set_id": 42,
        "start_time": "2025-04-05T17:06:08.546000+05:30",
        "end_time": "2025-04-05T17:14:39.780000+05:30",
        "start_game": 8010981,
        "end_game": 8011000,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 43,
        "start_time": "2025-04-05T16:55:02.653000+05:30",
        "end_time": "2025-04-05T17:05:41.355000+05:30",
        "start_game": 8010961,
        "end_game": 8010980,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 44,
        "start_time": "2025-04-05T16:44:29.219000+05:30",
        "end_time": "2025-04-05T16:54:24.958000+05:30",
        "start_game": 8010941,
        "end_game": 8010960,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 45,
        "start_time": "2025-04-05T16:30:37.477000+05:30",
        "end_time": "2025-04-05T16:43:33.015000+05:30",
        "start_game": 8010921,
        "end_game": 8010940,
        "count": 5,
        "total_games": 20,
        "percentage": 25.0
      },
      {
        "set_id": 46,
        "start_time": "2025-04-05T16:21:24.243000+05:30",
        "end_time": "2025-04-05T16:30:17.161000+05:30",
        "start_game": 8010901,
        "end_game": 8010920,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 47,
        "start_time": "2025-04-05T16:13:23.932000+05:30",
        "end_time": "2025-04-05T16:21:06.519000+05:30",
        "start_game": 8010881,
        "end_game": 8010900,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 48,
        "start_time": "2025-04-05T16:02:12.413000+05:30",
        "end_time": "2025-04-05T16:13:06.256000+05:30",
        "start_game": 8010861,
        "end_game": 8010880,
        "count": 4,
        "total_games": 20,
        "percentage": 20.0
      },
      {
        "set_id": 49,
        "start_time": "2025-04-05T15:52:09.043000+05:30",
        "end_time": "2025-04-05T16:01:45.514000+05:30",
        "start_game": 8010841,
        "end_game": 8010860,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 50,
        "start_time": "2025-04-05T15:42:46.280000+05:30",
        "end_time": "2025-04-05T15:51:51.681000+05:30",
        "start_game": 8010821,
        "end_game": 8010840,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 51,
        "start_time": "2025-04-05T15:33:20.901000+05:30",
        "end_time": "2025-04-05T15:42:20.544000+05:30",
        "start_game": 8010801,
        "end_game": 8010820,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 52,
        "start_time": "2025-04-05T15:25:08.525000+05:30",
        "end_time": "2025-04-05T15:32:52.451000+05:30",
        "start_game": 8010781,
        "end_game": 8010800,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 53,
        "start_time": "2025-04-05T15:16:40.265000+05:30",
        "end_time": "2025-04-05T15:24:04.746000+05:30",
        "start_game": 8010761,
        "end_game": 8010780,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 54,
        "start_time": "2025-04-05T15:03:56.171000+05:30",
        "end_time": "2025-04-05T15:16:22.060000+05:30",
        "start_game": 8010741,
        "end_game": 8010760,
        "count": 6,
        "total_games": 20,
        "percentage": 30.0
      },
      {
        "set_id": 55,
        "start_time": "2025-04-05T14:53:46.079000+05:30",
        "end_time": "2025-04-05T15:03:09.490000+05:30",
        "start_game": 8010721,
        "end_game": 8010740,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 56,
        "start_time": "2025-04-05T14:43:49.211000+05:30",
        "end_time": "2025-04-05T14:53:31.275000+05:30",
        "start_game": 8010701,
        "end_game": 8010720,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 57,
        "start_time": "2025-04-05T14:34:21.181000+05:30",
        "end_time": "2025-04-05T14:43:29.205000+05:30",
        "start_game": 8010681,
        "end_game": 8010700,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 58,
        "start_time": "2025-04-05T14:25:11.436000+05:30",
        "end_time": "2025-04-05T14:33:56.331000+05:30",
        "start_game": 8010661,
        "end_game": 8010680,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 59,
        "start_time": "2025-04-05T14:17:59.245000+05:30",
        "end_time": "2025-04-05T14:24:52.479000+05:30",
        "start_game": 8010641,
        "end_game": 8010660,
        "count": 0,
        "total_games": 20,
        "percentage": 0.0
      },
      {
        "set_id": 60,
        "start_time": "2025-04-05T14:08:20.989000+05:30",
        "end_time": "2025-04-05T14:17:46.265000+05:30",
        "start_game": 8010621,
        "end_game": 8010640,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 61,
        "start_time": "2025-04-05T13:57:13.022000+05:30",
        "end_time": "2025-04-05T14:07:56.067000+05:30",
        "start_game": 8010601,
        "end_game": 8010620,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 62,
        "start_time": "2025-04-05T13:48:48.500000+05:30",
        "end_time": "2025-04-05T13:56:50.759000+05:30",
        "start_game": 8010581,
        "end_game": 8010600,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 63,
        "start_time": "2025-04-05T13:38:04.887000+05:30",
        "end_time": "2025-04-05T13:47:04.299000+05:30",
        "start_game": 8010561,
        "end_game": 8010580,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 64,
        "start_time": "2025-04-05T13:27:03.013000+05:30",
        "end_time": "2025-04-05T13:37:20.538000+05:30",
        "start_game": 8010541,
        "end_game": 8010560,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 65,
        "start_time": "2025-04-05T13:18:31.948000+05:30",
        "end_time": "2025-04-05T13:26:51.295000+05:30",
        "start_game": 8010521,
        "end_game": 8010540,
        "count": 0,
        "total_games": 20,
        "percentage": 0.0
      },
      {
        "set_id": 66,
        "start_time": "2025-04-05T13:08:29.612000+05:30",
        "end_time": "2025-04-05T13:18:11.961000+05:30",
        "start_game": 8010501,
        "end_game": 8010520,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 67,
        "start_time": "2025-04-05T13:00:37.433000+05:30",
        "end_time": "2025-04-05T13:07:59.632000+05:30",
        "start_game": 8010481,
        "end_game": 8010500,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 68,
        "start_time": "2025-04-05T12:50:32.290000+05:30",
        "end_time": "2025-04-05T12:59:46.509000+05:30",
        "start_game": 8010461,
        "end_game": 8010480,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 69,
        "start_time": "2025-04-05T12:40:53.582000+05:30",
        "end_time": "2025-04-05T12:49:44.142000+05:30",
        "start_game": 8010441,
        "end_game": 8010460,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 70,
        "start_time": "2025-04-05T12:32:43.854000+05:30",
        "end_time": "2025-04-05T12:40:29.866000+05:30",
        "start_game": 8010421,
        "end_game": 8010440,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 71,
        "start_time": "2025-04-05T12:21:21.759000+05:30",
        "end_time": "2025-04-05T12:32:24.975000+05:30",
        "start_game": 8010401,
        "end_game": 8010420,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 72,
        "start_time": "2025-04-05T12:13:43.543000+05:30",
        "end_time": "2025-04-05T12:20:37.575000+05:30",
        "start_game": 8010381,
        "end_game": 8010400,
        "count": 0,
        "total_games": 20,
        "percentage": 0.0
      },
      {
        "set_id": 73,
        "start_time": "2025-04-05T12:02:32.113000+05:30",
        "end_time": "2025-04-05T12:13:19.229000+05:30",
        "start_game": 8010361,
        "end_game": 8010380,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 74,
        "start_time": "2025-04-05T11:53:49.891000+05:30",
        "end_time": "2025-04-05T12:02:10.956000+05:30",
        "start_game": 8010341,
        "end_game": 8010360,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 75,
        "start_time": "2025-04-05T11:43:28.826000+05:30",
        "end_time": "2025-04-05T11:53:04.701000+05:30",
        "start_game": 8010321,
        "end_game": 8010340,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 76,
        "start_time": "2025-04-05T11:34:07.676000+05:30",
        "end_time": "2025-04-05T11:43:13.010000+05:30",
        "start_game": 8010301,
        "end_game": 8010320,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 77,
        "start_time": "2025-04-05T11:24:14.228000+05:30",
        "end_time": "2025-04-05T11:33:36.026000+05:30",
        "start_game": 8010281,
        "end_game": 8010300,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 78,
        "start_time": "2025-04-05T11:14:26.845000+05:30",
        "end_time": "2025-04-05T11:23:52.029000+05:30",
        "start_game": 8010261,
        "end_game": 8010280,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 79,
        "start_time": "2025-04-05T11:03:21.397000+05:30",
        "end_time": "2025-04-05T11:13:31.684000+05:30",
        "start_game": 8010241,
        "end_game": 8010260,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 80,
        "start_time": "2025-04-05T10:54:36.783000+05:30",
        "end_time": "2025-04-05T11:02:42.045000+05:30",
        "start_game": 8010221,
        "end_game": 8010240,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 81,
        "start_time": "2025-04-05T10:44:38.198000+05:30",
        "end_time": "2025-04-05T10:54:19.329000+05:30",
        "start_game": 8010201,
        "end_game": 8010220,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 82,
        "start_time": "2025-04-05T10:34:58.750000+05:30",
        "end_time": "2025-04-05T10:44:25.825000+05:30",
        "start_game": 8010181,
        "end_game": 8010200,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 83,
        "start_time": "2025-04-05T10:23:11.306000+05:30",
        "end_time": "2025-04-05T10:34:25.756000+05:30",
        "start_game": 8010161,
        "end_game": 8010180,
        "count": 4,
        "total_games": 20,
        "percentage": 20.0
      },
      {
        "set_id": 84,
        "start_time": "2025-04-05T10:13:55.625000+05:30",
        "end_time": "2025-04-05T10:22:46.890000+05:30",
        "start_game": 8010141,
        "end_game": 8010160,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 85,
        "start_time": "2025-04-05T10:04:38.931000+05:30",
        "end_time": "2025-04-05T10:13:37.631000+05:30",
        "start_game": 8010121,
        "end_game": 8010140,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 86,
        "start_time": "2025-04-05T09:54:14.672000+05:30",
        "end_time": "2025-04-05T10:04:14.030000+05:30",
        "start_game": 8010101,
        "end_game": 8010120,
        "count": 4,
        "total_games": 20,
        "percentage": 20.0
      },
      {
        "set_id": 87,
        "start_time": "2025-04-05T09:45:21.458000+05:30",
        "end_time": "2025-04-05T09:53:22.386000+05:30",
        "start_game": 8010081,
        "end_game": 8010100,
        "count": 0,
        "total_games": 20,
        "percentage": 0.0
      },
      {
        "set_id": 88,
        "start_time": "2025-04-05T09:36:24.428000+05:30",
        "end_time": "2025-04-05T09:45:03.892000+05:30",
        "start_game": 8010061,
        "end_game": 8010080,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 89,
        "start_time": "2025-04-05T09:26:15.540000+05:30",
        "end_time": "2025-04-05T09:34:20.402000+05:30",
        "start_game": 8010041,
        "end_game": 8010060,
        "count": 0,
        "total_games": 20,
        "percentage": 0.0
      },
      {
        "set_id": 90,
        "start_time": "2025-04-05T09:17:56.617000+05:30",
        "end_time": "2025-04-05T09:25:39.540000+05:30",
        "start_game": 8010021,
        "end_game": 8010040,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 91,
        "start_time": "2025-04-05T09:10:21.266000+05:30",
        "end_time": "2025-04-05T09:17:43.941000+05:30",
        "start_game": 8010001,
        "end_game": 8010020,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 92,
        "start_time": "2025-04-05T09:00:49.665000+05:30",
        "end_time": "2025-04-05T09:09:54.663000+05:30",
        "start_game": 8009981,
        "end_game": 8010000,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 93,
        "start_time": "2025-04-05T08:52:18.496000+05:30",
        "end_time": "2025-04-05T09:00:27.631000+05:30",
        "start_game": 8009961,
        "end_game": 8009980,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 94,
        "start_time": "2025-04-05T08:45:22.152000+05:30",
        "end_time": "2025-04-05T08:51:43.121000+05:30",
        "start_game": 8009941,
        "end_game": 8009960,
        "count": 0,
        "total_games": 20,
        "percentage": 0.0
      },
      {
        "set_id": 95,
        "start_time": "2025-04-05T08:34:17.035000+05:30",
        "end_time": "2025-04-05T08:44:46.115000+05:30",
        "start_game": 8009921,
        "end_game": 8009940,
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "set_id": 96,
        "start_time": "2025-04-05T08:25:34.127000+05:30",
        "end_time": "2025-04-05T08:34:04.337000+05:30",
        "start_game": 8009901,
        "end_game": 8009920,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 97,
        "start_time": "2025-04-05T08:16:23.729000+05:30",
        "end_time": "2025-04-05T08:24:53.967000+05:30",
        "start_game": 8009881,
        "end_game": 8009900,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "set_id": 98,
        "start_time": "2025-04-05T08:07:42.384000+05:30",
        "end_time": "2025-04-05T08:15:58.710000+05:30",
        "start_game": 8009861,
        "end_game": 8009880,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 99,
        "start_time": "2025-04-05T07:59:02.036000+05:30",
        "end_time": "2025-04-05T08:07:15.346000+05:30",
        "start_game": 8009841,
        "end_game": 8009860,
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "set_id": 100,
        "start_time": "2025-04-05T07:48:49.953000+05:30",
        "end_time": "2025-04-05T07:58:29.586000+05:30",
        "start_game": 8009821,
        "end_game": 8009840,
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      }
    ]
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 60775  100 60696  100    79  35907     46  0:00:01  0:00:01 --:--:-- 35940
{
  "status": "success",
  "data": {
    "values": [
      2.0,
      5.0,
      10.0,
      20.0
    ],
    "interval_minutes": 15,
    "hours": 24,
    "intervals_by_value": {
      "2.0": [
        {
          "interval_start": "2025-04-04T23:15:00+05:30",
          "interval_end": "2025-04-04T23:30:00+05:30",
          "count": 20,
          "total_games": 29,
          "percentage": 68.96551724137932
        },
        {
          "interval_start": "2025-04-04T23:30:00+05:30",
          "interval_end": "2025-04-04T23:45:00+05:30",
          "count": 16,
          "total_games": 29,
          "percentage": 55.172413793103445
        },
        {
          "interval_start": "2025-04-04T23:45:00+05:30",
          "interval_end": "2025-04-05T00:00:00+05:30",
          "count": 15,
          "total_games": 28,
          "percentage": 53.57142857142857
        },
        {
          "interval_start": "2025-04-05T00:00:00+05:30",
          "interval_end": "2025-04-05T00:15:00+05:30",
          "count": 13,
          "total_games": 34,
          "percentage": 38.23529411764706
        },
        {
          "interval_start": "2025-04-05T00:15:00+05:30",
          "interval_end": "2025-04-05T00:30:00+05:30",
          "count": 11,
          "total_games": 35,
          "percentage": 31.428571428571427
        },
        {
          "interval_start": "2025-04-05T00:30:00+05:30",
          "interval_end": "2025-04-05T00:45:00+05:30",
          "count": 18,
          "total_games": 38,
          "percentage": 47.368421052631575
        },
        {
          "interval_start": "2025-04-05T00:45:00+05:30",
          "interval_end": "2025-04-05T01:00:00+05:30",
          "count": 14,
          "total_games": 28,
          "percentage": 50.0
        },
        {
          "interval_start": "2025-04-05T01:00:00+05:30",
          "interval_end": "2025-04-05T01:15:00+05:30",
          "count": 15,
          "total_games": 29,
          "percentage": 51.724137931034484
        },
        {
          "interval_start": "2025-04-05T01:15:00+05:30",
          "interval_end": "2025-04-05T01:30:00+05:30",
          "count": 15,
          "total_games": 29,
          "percentage": 51.724137931034484
        },
        {
          "interval_start": "2025-04-05T01:30:00+05:30",
          "interval_end": "2025-04-05T01:45:00+05:30",
          "count": 17,
          "total_games": 28,
          "percentage": 60.71428571428571
        },
        {
          "interval_start": "2025-04-05T01:45:00+05:30",
          "interval_end": "2025-04-05T02:00:00+05:30",
          "count": 15,
          "total_games": 31,
          "percentage": 48.38709677419355
        },
        {
          "interval_start": "2025-04-05T02:00:00+05:30",
          "interval_end": "2025-04-05T02:15:00+05:30",
          "count": 14,
          "total_games": 31,
          "percentage": 45.16129032258064
        },
        {
          "interval_start": "2025-04-05T02:15:00+05:30",
          "interval_end": "2025-04-05T02:30:00+05:30",
          "count": 15,
          "total_games": 35,
          "percentage": 42.857142857142854
        },
        {
          "interval_start": "2025-04-05T02:30:00+05:30",
          "interval_end": "2025-04-05T02:45:00+05:30",
          "count": 18,
          "total_games": 33,
          "percentage": 54.54545454545454
        },
        {
          "interval_start": "2025-04-05T02:45:00+05:30",
          "interval_end": "2025-04-05T03:00:00+05:30",
          "count": 14,
          "total_games": 35,
          "percentage": 40.0
        },
        {
          "interval_start": "2025-04-05T03:00:00+05:30",
          "interval_end": "2025-04-05T03:15:00+05:30",
          "count": 12,
          "total_games": 33,
          "percentage": 36.36363636363637
        },
        {
          "interval_start": "2025-04-05T03:15:00+05:30",
          "interval_end": "2025-04-05T03:30:00+05:30",
          "count": 17,
          "total_games": 31,
          "percentage": 54.83870967741935
        },
        {
          "interval_start": "2025-04-05T03:30:00+05:30",
          "interval_end": "2025-04-05T03:45:00+05:30",
          "count": 16,
          "total_games": 31,
          "percentage": 51.61290322580645
        },
        {
          "interval_start": "2025-04-05T03:45:00+05:30",
          "interval_end": "2025-04-05T04:00:00+05:30",
          "count": 15,
          "total_games": 36,
          "percentage": 41.66666666666667
        },
        {
          "interval_start": "2025-04-05T04:00:00+05:30",
          "interval_end": "2025-04-05T04:15:00+05:30",
          "count": 15,
          "total_games": 31,
          "percentage": 48.38709677419355
        },
        {
          "interval_start": "2025-04-05T04:15:00+05:30",
          "interval_end": "2025-04-05T04:30:00+05:30",
          "count": 16,
          "total_games": 39,
          "percentage": 41.02564102564102
        },
        {
          "interval_start": "2025-04-05T04:30:00+05:30",
          "interval_end": "2025-04-05T04:45:00+05:30",
          "count": 16,
          "total_games": 31,
          "percentage": 51.61290322580645
        },
        {
          "interval_start": "2025-04-05T04:45:00+05:30",
          "interval_end": "2025-04-05T05:00:00+05:30",
          "count": 17,
          "total_games": 34,
          "percentage": 50.0
        },
        {
          "interval_start": "2025-04-05T05:00:00+05:30",
          "interval_end": "2025-04-05T05:15:00+05:30",
          "count": 15,
          "total_games": 26,
          "percentage": 57.692307692307686
        },
        {
          "interval_start": "2025-04-05T05:15:00+05:30",
          "interval_end": "2025-04-05T05:30:00+05:30",
          "count": 15,
          "total_games": 34,
          "percentage": 44.11764705882353
        },
        {
          "interval_start": "2025-04-05T05:30:00+05:30",
          "interval_end": "2025-04-05T05:45:00+05:30",
          "count": 20,
          "total_games": 31,
          "percentage": 64.51612903225806
        },
        {
          "interval_start": "2025-04-05T05:45:00+05:30",
          "interval_end": "2025-04-05T06:00:00+05:30",
          "count": 16,
          "total_games": 34,
          "percentage": 47.05882352941176
        },
        {
          "interval_start": "2025-04-05T06:00:00+05:30",
          "interval_end": "2025-04-05T06:15:00+05:30",
          "count": 16,
          "total_games": 36,
          "percentage": 44.44444444444444
        },
        {
          "interval_start": "2025-04-05T06:15:00+05:30",
          "interval_end": "2025-04-05T06:30:00+05:30",
          "count": 17,
          "total_games": 39,
          "percentage": 43.58974358974359
        },
        {
          "interval_start": "2025-04-05T06:30:00+05:30",
          "interval_end": "2025-04-05T06:45:00+05:30",
          "count": 16,
          "total_games": 35,
          "percentage": 45.714285714285715
        },
        {
          "interval_start": "2025-04-05T06:45:00+05:30",
          "interval_end": "2025-04-05T07:00:00+05:30",
          "count": 13,
          "total_games": 30,
          "percentage": 43.333333333333336
        },
        {
          "interval_start": "2025-04-05T07:00:00+05:30",
          "interval_end": "2025-04-05T07:15:00+05:30",
          "count": 17,
          "total_games": 29,
          "percentage": 58.620689655172406
        },
        {
          "interval_start": "2025-04-05T07:15:00+05:30",
          "interval_end": "2025-04-05T07:30:00+05:30",
          "count": 15,
          "total_games": 34,
          "percentage": 44.11764705882353
        },
        {
          "interval_start": "2025-04-05T07:30:00+05:30",
          "interval_end": "2025-04-05T07:45:00+05:30",
          "count": 16,
          "total_games": 34,
          "percentage": 47.05882352941176
        },
        {
          "interval_start": "2025-04-05T07:45:00+05:30",
          "interval_end": "2025-04-05T08:00:00+05:30",
          "count": 16,
          "total_games": 36,
          "percentage": 44.44444444444444
        },
        {
          "interval_start": "2025-04-05T08:00:00+05:30",
          "interval_end": "2025-04-05T08:15:00+05:30",
          "count": 19,
          "total_games": 33,
          "percentage": 57.57575757575758
        },
        {
          "interval_start": "2025-04-05T08:15:00+05:30",
          "interval_end": "2025-04-05T08:30:00+05:30",
          "count": 14,
          "total_games": 34,
          "percentage": 41.17647058823529
        },
        {
          "interval_start": "2025-04-05T08:30:00+05:30",
          "interval_end": "2025-04-05T08:45:00+05:30",
          "count": 15,
          "total_games": 29,
          "percentage": 51.724137931034484
        },
        {
          "interval_start": "2025-04-05T08:45:00+05:30",
          "interval_end": "2025-04-05T09:00:00+05:30",
          "count": 14,
          "total_games": 38,
          "percentage": 36.84210526315789
        },
        {
          "interval_start": "2025-04-05T09:00:00+05:30",
          "interval_end": "2025-04-05T09:15:00+05:30",
          "count": 18,
          "total_games": 34,
          "percentage": 52.94117647058824
        },
        {
          "interval_start": "2025-04-05T09:15:00+05:30",
          "interval_end": "2025-04-05T09:30:00+05:30",
          "count": 15,
          "total_games": 38,
          "percentage": 39.473684210526315
        },
        {
          "interval_start": "2025-04-05T09:30:00+05:30",
          "interval_end": "2025-04-05T09:45:00+05:30",
          "count": 11,
          "total_games": 29,
          "percentage": 37.93103448275862
        },
        {
          "interval_start": "2025-04-05T09:45:00+05:30",
          "interval_end": "2025-04-05T10:00:00+05:30",
          "count": 15,
          "total_games": 32,
          "percentage": 46.875
        },
        {
          "interval_start": "2025-04-05T10:00:00+05:30",
          "interval_end": "2025-04-05T10:15:00+05:30",
          "count": 15,
          "total_games": 31,
          "percentage": 48.38709677419355
        },
        {
          "interval_start": "2025-04-05T10:15:00+05:30",
          "interval_end": "2025-04-05T10:30:00+05:30",
          "count": 15,
          "total_games": 28,
          "percentage": 53.57142857142857
        },
        {
          "interval_start": "2025-04-05T10:30:00+05:30",
          "interval_end": "2025-04-05T10:45:00+05:30",
          "count": 11,
          "total_games": 31,
          "percentage": 35.483870967741936
        },
        {
          "interval_start": "2025-04-05T10:45:00+05:30",
          "interval_end": "2025-04-05T11:00:00+05:30",
          "count": 17,
          "total_games": 33,
          "percentage": 51.515151515151516
        },
        {
          "interval_start": "2025-04-05T11:00:00+05:30",
          "interval_end": "2025-04-05T11:15:00+05:30",
          "count": 16,
          "total_games": 28,
          "percentage": 57.14285714285714
        },
        {
          "interval_start": "2025-04-05T11:15:00+05:30",
          "interval_end": "2025-04-05T11:30:00+05:30",
          "count": 17,
          "total_games": 30,
          "percentage": 56.666666666666664
        },
        {
          "interval_start": "2025-04-05T11:30:00+05:30",
          "interval_end": "2025-04-05T11:45:00+05:30",
          "count": 14,
          "total_games": 30,
          "percentage": 46.666666666666664
        },
        {
          "interval_start": "2025-04-05T11:45:00+05:30",
          "interval_end": "2025-04-05T12:00:00+05:30",
          "count": 16,
          "total_games": 35,
          "percentage": 45.714285714285715
        },
        {
          "interval_start": "2025-04-05T12:00:00+05:30",
          "interval_end": "2025-04-05T12:15:00+05:30",
          "count": 16,
          "total_games": 28,
          "percentage": 57.14285714285714
        },
        {
          "interval_start": "2025-04-05T12:15:00+05:30",
          "interval_end": "2025-04-05T12:30:00+05:30",
          "count": 14,
          "total_games": 31,
          "percentage": 45.16129032258064
        },
        {
          "interval_start": "2025-04-05T12:30:00+05:30",
          "interval_end": "2025-04-05T12:45:00+05:30",
          "count": 15,
          "total_games": 32,
          "percentage": 46.875
        },
        {
          "interval_start": "2025-04-05T12:45:00+05:30",
          "interval_end": "2025-04-05T13:00:00+05:30",
          "count": 16,
          "total_games": 32,
          "percentage": 50.0
        },
        {
          "interval_start": "2025-04-05T13:00:00+05:30",
          "interval_end": "2025-04-05T13:15:00+05:30",
          "count": 14,
          "total_games": 33,
          "percentage": 42.42424242424242
        },
        {
          "interval_start": "2025-04-05T13:15:00+05:30",
          "interval_end": "2025-04-05T13:30:00+05:30",
          "count": 18,
          "total_games": 35,
          "percentage": 51.42857142857142
        },
        {
          "interval_start": "2025-04-05T13:30:00+05:30",
          "interval_end": "2025-04-05T13:45:00+05:30",
          "count": 17,
          "total_games": 25,
          "percentage": 68.0
        },
        {
          "interval_start": "2025-04-05T13:45:00+05:30",
          "interval_end": "2025-04-05T14:00:00+05:30",
          "count": 13,
          "total_games": 33,
          "percentage": 39.39393939393939
        },
        {
          "interval_start": "2025-04-05T14:00:00+05:30",
          "interval_end": "2025-04-05T14:15:00+05:30",
          "count": 17,
          "total_games": 30,
          "percentage": 56.666666666666664
        },
        {
          "interval_start": "2025-04-05T14:15:00+05:30",
          "interval_end": "2025-04-05T14:30:00+05:30",
          "count": 15,
          "total_games": 34,
          "percentage": 44.11764705882353
        },
        {
          "interval_start": "2025-04-05T14:30:00+05:30",
          "interval_end": "2025-04-05T14:45:00+05:30",
          "count": 12,
          "total_games": 33,
          "percentage": 36.36363636363637
        },
        {
          "interval_start": "2025-04-05T14:45:00+05:30",
          "interval_end": "2025-04-05T15:00:00+05:30",
          "count": 16,
          "total_games": 31,
          "percentage": 51.61290322580645
        },
        {
          "interval_start": "2025-04-05T15:00:00+05:30",
          "interval_end": "2025-04-05T15:15:00+05:30",
          "count": 18,
          "total_games": 23,
          "percentage": 78.26086956521739
        },
        {
          "interval_start": "2025-04-05T15:15:00+05:30",
          "interval_end": "2025-04-05T15:30:00+05:30",
          "count": 13,
          "total_games": 37,
          "percentage": 35.13513513513514
        },
        {
          "interval_start": "2025-04-05T15:30:00+05:30",
          "interval_end": "2025-04-05T15:45:00+05:30",
          "count": 18,
          "total_games": 31,
          "percentage": 58.06451612903226
        },
        {
          "interval_start": "2025-04-05T15:45:00+05:30",
          "interval_end": "2025-04-05T16:00:00+05:30",
          "count": 18,
          "total_games": 29,
          "percentage": 62.06896551724138
        },
        {
          "interval_start": "2025-04-05T16:00:00+05:30",
          "interval_end": "2025-04-05T16:15:00+05:30",
          "count": 13,
          "total_games": 29,
          "percentage": 44.827586206896555
        },
        {
          "interval_start": "2025-04-05T16:15:00+05:30",
          "interval_end": "2025-04-05T16:30:00+05:30",
          "count": 13,
          "total_games": 36,
          "percentage": 36.11111111111111
        },
        {
          "interval_start": "2025-04-05T16:30:00+05:30",
          "interval_end": "2025-04-05T16:45:00+05:30",
          "count": 16,
          "total_games": 23,
          "percentage": 69.56521739130434
        },
        {
          "interval_start": "2025-04-05T16:45:00+05:30",
          "interval_end": "2025-04-05T17:00:00+05:30",
          "count": 17,
          "total_games": 27,
          "percentage": 62.96296296296296
        },
        {
          "interval_start": "2025-04-05T17:00:00+05:30",
          "interval_end": "2025-04-05T17:15:00+05:30",
          "count": 15,
          "total_games": 31,
          "percentage": 48.38709677419355
        },
        {
          "interval_start": "2025-04-05T17:15:00+05:30",
          "interval_end": "2025-04-05T17:30:00+05:30",
          "count": 16,
          "total_games": 33,
          "percentage": 48.484848484848484
        },
        {
          "interval_start": "2025-04-05T17:30:00+05:30",
          "interval_end": "2025-04-05T17:45:00+05:30",
          "count": 18,
          "total_games": 31,
          "percentage": 58.06451612903226
        },
        {
          "interval_start": "2025-04-05T17:45:00+05:30",
          "interval_end": "2025-04-05T18:00:00+05:30",
          "count": 17,
          "total_games": 33,
          "percentage": 51.515151515151516
        },
        {
          "interval_start": "2025-04-05T18:00:00+05:30",
          "interval_end": "2025-04-05T18:15:00+05:30",
          "count": 16,
          "total_games": 32,
          "percentage": 50.0
        },
        {
          "interval_start": "2025-04-05T18:15:00+05:30",
          "interval_end": "2025-04-05T18:30:00+05:30",
          "count": 18,
          "total_games": 32,
          "percentage": 56.25
        },
        {
          "interval_start": "2025-04-05T18:30:00+05:30",
          "interval_end": "2025-04-05T18:45:00+05:30",
          "count": 17,
          "total_games": 36,
          "percentage": 47.22222222222222
        },
        {
          "interval_start": "2025-04-05T18:45:00+05:30",
          "interval_end": "2025-04-05T19:00:00+05:30",
          "count": 18,
          "total_games": 33,
          "percentage": 54.54545454545454
        },
        {
          "interval_start": "2025-04-05T19:00:00+05:30",
          "interval_end": "2025-04-05T19:15:00+05:30",
          "count": 14,
          "total_games": 33,
          "percentage": 42.42424242424242
        },
        {
          "interval_start": "2025-04-05T19:15:00+05:30",
          "interval_end": "2025-04-05T19:30:00+05:30",
          "count": 15,
          "total_games": 37,
          "percentage": 40.54054054054054
        },
        {
          "interval_start": "2025-04-05T19:30:00+05:30",
          "interval_end": "2025-04-05T19:45:00+05:30",
          "count": 17,
          "total_games": 32,
          "percentage": 53.125
        },
        {
          "interval_start": "2025-04-05T19:45:00+05:30",
          "interval_end": "2025-04-05T20:00:00+05:30",
          "count": 16,
          "total_games": 31,
          "percentage": 51.61290322580645
        },
        {
          "interval_start": "2025-04-05T20:00:00+05:30",
          "interval_end": "2025-04-05T20:15:00+05:30",
          "count": 18,
          "total_games": 32,
          "percentage": 56.25
        },
        {
          "interval_start": "2025-04-05T20:15:00+05:30",
          "interval_end": "2025-04-05T20:30:00+05:30",
          "count": 14,
          "total_games": 37,
          "percentage": 37.83783783783784
        },
        {
          "interval_start": "2025-04-05T20:30:00+05:30",
          "interval_end": "2025-04-05T20:45:00+05:30",
          "count": 16,
          "total_games": 33,
          "percentage": 48.484848484848484
        },
        {
          "interval_start": "2025-04-05T20:45:00+05:30",
          "interval_end": "2025-04-05T21:00:00+05:30",
          "count": 18,
          "total_games": 30,
          "percentage": 60.0
        },
        {
          "interval_start": "2025-04-05T21:00:00+05:30",
          "interval_end": "2025-04-05T21:15:00+05:30",
          "count": 13,
          "total_games": 32,
          "percentage": 40.625
        },
        {
          "interval_start": "2025-04-05T21:15:00+05:30",
          "interval_end": "2025-04-05T21:30:00+05:30",
          "count": 16,
          "total_games": 33,
          "percentage": 48.484848484848484
        },
        {
          "interval_start": "2025-04-05T21:30:00+05:30",
          "interval_end": "2025-04-05T21:45:00+05:30",
          "count": 13,
          "total_games": 36,
          "percentage": 36.11111111111111
        },
        {
          "interval_start": "2025-04-05T21:45:00+05:30",
          "interval_end": "2025-04-05T22:00:00+05:30",
          "count": 15,
          "total_games": 34,
          "percentage": 44.11764705882353
        },
        {
          "interval_start": "2025-04-05T22:00:00+05:30",
          "interval_end": "2025-04-05T22:15:00+05:30",
          "count": 15,
          "total_games": 25,
          "percentage": 60.0
        },
        {
          "interval_start": "2025-04-05T22:15:00+05:30",
          "interval_end": "2025-04-05T22:30:00+05:30",
          "count": 16,
          "total_games": 32,
          "percentage": 50.0
        },
        {
          "interval_start": "2025-04-05T22:30:00+05:30",
          "interval_end": "2025-04-05T22:45:00+05:30",
          "count": 16,
          "total_games": 34,
          "percentage": 47.05882352941176
        },
        {
          "interval_start": "2025-04-05T22:45:00+05:30",
          "interval_end": "2025-04-05T23:00:00+05:30",
          "count": 13,
          "total_games": 24,
          "percentage": 54.166666666666664
        },
        {
          "interval_start": "2025-04-05T23:00:00+05:30",
          "interval_end": "2025-04-05T23:15:00+05:30",
          "count": 16,
          "total_games": 28,
          "percentage": 57.14285714285714
        },
        {
          "interval_start": "2025-04-05T23:15:00+05:30",
          "interval_end": "2025-04-05T23:30:00+05:30",
          "count": 18,
          "total_games": 32,
          "percentage": 56.25
        }
      ],
      "5.0": [
        {
          "interval_start": "2025-04-04T23:15:00+05:30",
          "interval_end": "2025-04-04T23:30:00+05:30",
          "count": 9,
          "total_games": 29,
          "percentage": 31.03448275862069
        },
        {
          "interval_start": "2025-04-04T23:30:00+05:30",
          "interval_end": "2025-04-04T23:45:00+05:30",
          "count": 6,
          "total_games": 29,
          "percentage": 20.689655172413794
        },
        {
          "interval_start": "2025-04-04T23:45:00+05:30",
          "interval_end": "2025-04-05T00:00:00+05:30",
          "count": 7,
          "total_games": 28,
          "percentage": 25.0
        },
        {
          "interval_start": "2025-04-05T00:00:00+05:30",
          "interval_end": "2025-04-05T00:15:00+05:30",
          "count": 7,
          "total_games": 34,
          "percentage": 20.588235294117645
        },
        {
          "interval_start": "2025-04-05T00:15:00+05:30",
          "interval_end": "2025-04-05T00:30:00+05:30",
          "count": 6,
          "total_games": 35,
          "percentage": 17.142857142857142
        },
        {
          "interval_start": "2025-04-05T00:30:00+05:30",
          "interval_end": "2025-04-05T00:45:00+05:30",
          "count": 2,
          "total_games": 38,
          "percentage": 5.263157894736842
        },
        {
          "interval_start": "2025-04-05T00:45:00+05:30",
          "interval_end": "2025-04-05T01:00:00+05:30",
          "count": 7,
          "total_games": 28,
          "percentage": 25.0
        },
        {
          "interval_start": "2025-04-05T01:00:00+05:30",
          "interval_end": "2025-04-05T01:15:00+05:30",
          "count": 7,
          "total_games": 29,
          "percentage": 24.137931034482758
        },
        {
          "interval_start": "2025-04-05T01:15:00+05:30",
          "interval_end": "2025-04-05T01:30:00+05:30",
          "count": 8,
          "total_games": 29,
          "percentage": 27.586206896551722
        },
        {
          "interval_start": "2025-04-05T01:30:00+05:30",
          "interval_end": "2025-04-05T01:45:00+05:30",
          "count": 10,
          "total_games": 28,
          "percentage": 35.714285714285715
        },
        {
          "interval_start": "2025-04-05T01:45:00+05:30",
          "interval_end": "2025-04-05T02:00:00+05:30",
          "count": 4,
          "total_games": 31,
          "percentage": 12.903225806451612
        },
        {
          "interval_start": "2025-04-05T02:00:00+05:30",
          "interval_end": "2025-04-05T02:15:00+05:30",
          "count": 11,
          "total_games": 31,
          "percentage": 35.483870967741936
        },
        {
          "interval_start": "2025-04-05T02:15:00+05:30",
          "interval_end": "2025-04-05T02:30:00+05:30",
          "count": 6,
          "total_games": 35,
          "percentage": 17.142857142857142
        },
        {
          "interval_start": "2025-04-05T02:30:00+05:30",
          "interval_end": "2025-04-05T02:45:00+05:30",
          "count": 7,
          "total_games": 33,
          "percentage": 21.21212121212121
        },
        {
          "interval_start": "2025-04-05T02:45:00+05:30",
          "interval_end": "2025-04-05T03:00:00+05:30",
          "count": 5,
          "total_games": 35,
          "percentage": 14.285714285714285
        },
        {
          "interval_start": "2025-04-05T03:00:00+05:30",
          "interval_end": "2025-04-05T03:15:00+05:30",
          "count": 6,
          "total_games": 33,
          "percentage": 18.181818181818183
        },
        {
          "interval_start": "2025-04-05T03:15:00+05:30",
          "interval_end": "2025-04-05T03:30:00+05:30",
          "count": 9,
          "total_games": 31,
          "percentage": 29.03225806451613
        },
        {
          "interval_start": "2025-04-05T03:30:00+05:30",
          "interval_end": "2025-04-05T03:45:00+05:30",
          "count": 8,
          "total_games": 31,
          "percentage": 25.806451612903224
        },
        {
          "interval_start": "2025-04-05T03:45:00+05:30",
          "interval_end": "2025-04-05T04:00:00+05:30",
          "count": 3,
          "total_games": 36,
          "percentage": 8.333333333333332
        },
        {
          "interval_start": "2025-04-05T04:00:00+05:30",
          "interval_end": "2025-04-05T04:15:00+05:30",
          "count": 9,
          "total_games": 31,
          "percentage": 29.03225806451613
        },
        {
          "interval_start": "2025-04-05T04:15:00+05:30",
          "interval_end": "2025-04-05T04:30:00+05:30",
          "count": 2,
          "total_games": 39,
          "percentage": 5.128205128205128
        },
        {
          "interval_start": "2025-04-05T04:30:00+05:30",
          "interval_end": "2025-04-05T04:45:00+05:30",
          "count": 8,
          "total_games": 31,
          "percentage": 25.806451612903224
        },
        {
          "interval_start": "2025-04-05T04:45:00+05:30",
          "interval_end": "2025-04-05T05:00:00+05:30",
          "count": 8,
          "total_games": 34,
          "percentage": 23.52941176470588
        },
        {
          "interval_start": "2025-04-05T05:00:00+05:30",
          "interval_end": "2025-04-05T05:15:00+05:30",
          "count": 10,
          "total_games": 26,
          "percentage": 38.46153846153847
        },
        {
          "interval_start": "2025-04-05T05:15:00+05:30",
          "interval_end": "2025-04-05T05:30:00+05:30",
          "count": 6,
          "total_games": 34,
          "percentage": 17.647058823529413
        },
        {
          "interval_start": "2025-04-05T05:30:00+05:30",
          "interval_end": "2025-04-05T05:45:00+05:30",
          "count": 7,
          "total_games": 31,
          "percentage": 22.58064516129032
        },
        {
          "interval_start": "2025-04-05T05:45:00+05:30",
          "interval_end": "2025-04-05T06:00:00+05:30",
          "count": 4,
          "total_games": 34,
          "percentage": 11.76470588235294
        },
        {
          "interval_start": "2025-04-05T06:00:00+05:30",
          "interval_end": "2025-04-05T06:15:00+05:30",
          "count": 5,
          "total_games": 36,
          "percentage": 13.88888888888889
        },
        {
          "interval_start": "2025-04-05T06:15:00+05:30",
          "interval_end": "2025-04-05T06:30:00+05:30",
          "count": 2,
          "total_games": 39,
          "percentage": 5.128205128205128
        },
        {
          "interval_start": "2025-04-05T06:30:00+05:30",
          "interval_end": "2025-04-05T06:45:00+05:30",
          "count": 6,
          "total_games": 35,
          "percentage": 17.142857142857142
        },
        {
          "interval_start": "2025-04-05T06:45:00+05:30",
          "interval_end": "2025-04-05T07:00:00+05:30",
          "count": 5,
          "total_games": 30,
          "percentage": 16.666666666666664
        },
        {
          "interval_start": "2025-04-05T07:00:00+05:30",
          "interval_end": "2025-04-05T07:15:00+05:30",
          "count": 8,
          "total_games": 29,
          "percentage": 27.586206896551722
        },
        {
          "interval_start": "2025-04-05T07:15:00+05:30",
          "interval_end": "2025-04-05T07:30:00+05:30",
          "count": 5,
          "total_games": 34,
          "percentage": 14.705882352941178
        },
        {
          "interval_start": "2025-04-05T07:30:00+05:30",
          "interval_end": "2025-04-05T07:45:00+05:30",
          "count": 4,
          "total_games": 34,
          "percentage": 11.76470588235294
        },
        {
          "interval_start": "2025-04-05T07:45:00+05:30",
          "interval_end": "2025-04-05T08:00:00+05:30",
          "count": 6,
          "total_games": 36,
          "percentage": 16.666666666666664
        },
        {
          "interval_start": "2025-04-05T08:00:00+05:30",
          "interval_end": "2025-04-05T08:15:00+05:30",
          "count": 6,
          "total_games": 33,
          "percentage": 18.181818181818183
        },
        {
          "interval_start": "2025-04-05T08:15:00+05:30",
          "interval_end": "2025-04-05T08:30:00+05:30",
          "count": 5,
          "total_games": 34,
          "percentage": 14.705882352941178
        },
        {
          "interval_start": "2025-04-05T08:30:00+05:30",
          "interval_end": "2025-04-05T08:45:00+05:30",
          "count": 9,
          "total_games": 29,
          "percentage": 31.03448275862069
        },
        {
          "interval_start": "2025-04-05T08:45:00+05:30",
          "interval_end": "2025-04-05T09:00:00+05:30",
          "count": 3,
          "total_games": 38,
          "percentage": 7.894736842105263
        },
        {
          "interval_start": "2025-04-05T09:00:00+05:30",
          "interval_end": "2025-04-05T09:15:00+05:30",
          "count": 4,
          "total_games": 34,
          "percentage": 11.76470588235294
        },
        {
          "interval_start": "2025-04-05T09:15:00+05:30",
          "interval_end": "2025-04-05T09:30:00+05:30",
          "count": 3,
          "total_games": 38,
          "percentage": 7.894736842105263
        },
        {
          "interval_start": "2025-04-05T09:30:00+05:30",
          "interval_end": "2025-04-05T09:45:00+05:30",
          "count": 6,
          "total_games": 29,
          "percentage": 20.689655172413794
        },
        {
          "interval_start": "2025-04-05T09:45:00+05:30",
          "interval_end": "2025-04-05T10:00:00+05:30",
          "count": 7,
          "total_games": 32,
          "percentage": 21.875
        },
        {
          "interval_start": "2025-04-05T10:00:00+05:30",
          "interval_end": "2025-04-05T10:15:00+05:30",
          "count": 7,
          "total_games": 31,
          "percentage": 22.58064516129032
        },
        {
          "interval_start": "2025-04-05T10:15:00+05:30",
          "interval_end": "2025-04-05T10:30:00+05:30",
          "count": 10,
          "total_games": 28,
          "percentage": 35.714285714285715
        },
        {
          "interval_start": "2025-04-05T10:30:00+05:30",
          "interval_end": "2025-04-05T10:45:00+05:30",
          "count": 5,
          "total_games": 31,
          "percentage": 16.129032258064516
        },
        {
          "interval_start": "2025-04-05T10:45:00+05:30",
          "interval_end": "2025-04-05T11:00:00+05:30",
          "count": 5,
          "total_games": 33,
          "percentage": 15.151515151515152
        },
        {
          "interval_start": "2025-04-05T11:00:00+05:30",
          "interval_end": "2025-04-05T11:15:00+05:30",
          "count": 10,
          "total_games": 28,
          "percentage": 35.714285714285715
        },
        {
          "interval_start": "2025-04-05T11:15:00+05:30",
          "interval_end": "2025-04-05T11:30:00+05:30",
          "count": 7,
          "total_games": 30,
          "percentage": 23.333333333333332
        },
        {
          "interval_start": "2025-04-05T11:30:00+05:30",
          "interval_end": "2025-04-05T11:45:00+05:30",
          "count": 5,
          "total_games": 30,
          "percentage": 16.666666666666664
        },
        {
          "interval_start": "2025-04-05T11:45:00+05:30",
          "interval_end": "2025-04-05T12:00:00+05:30",
          "count": 7,
          "total_games": 35,
          "percentage": 20.0
        },
        {
          "interval_start": "2025-04-05T12:00:00+05:30",
          "interval_end": "2025-04-05T12:15:00+05:30",
          "count": 7,
          "total_games": 28,
          "percentage": 25.0
        },
        {
          "interval_start": "2025-04-05T12:15:00+05:30",
          "interval_end": "2025-04-05T12:30:00+05:30",
          "count": 5,
          "total_games": 31,
          "percentage": 16.129032258064516
        },
        {
          "interval_start": "2025-04-05T12:30:00+05:30",
          "interval_end": "2025-04-05T12:45:00+05:30",
          "count": 6,
          "total_games": 32,
          "percentage": 18.75
        },
        {
          "interval_start": "2025-04-05T12:45:00+05:30",
          "interval_end": "2025-04-05T13:00:00+05:30",
          "count": 8,
          "total_games": 32,
          "percentage": 25.0
        },
        {
          "interval_start": "2025-04-05T13:00:00+05:30",
          "interval_end": "2025-04-05T13:15:00+05:30",
          "count": 5,
          "total_games": 33,
          "percentage": 15.151515151515152
        },
        {
          "interval_start": "2025-04-05T13:15:00+05:30",
          "interval_end": "2025-04-05T13:30:00+05:30",
          "count": 4,
          "total_games": 35,
          "percentage": 11.428571428571429
        },
        {
          "interval_start": "2025-04-05T13:30:00+05:30",
          "interval_end": "2025-04-05T13:45:00+05:30",
          "count": 7,
          "total_games": 25,
          "percentage": 28.000000000000004
        },
        {
          "interval_start": "2025-04-05T13:45:00+05:30",
          "interval_end": "2025-04-05T14:00:00+05:30",
          "count": 5,
          "total_games": 33,
          "percentage": 15.151515151515152
        },
        {
          "interval_start": "2025-04-05T14:00:00+05:30",
          "interval_end": "2025-04-05T14:15:00+05:30",
          "count": 7,
          "total_games": 30,
          "percentage": 23.333333333333332
        },
        {
          "interval_start": "2025-04-05T14:15:00+05:30",
          "interval_end": "2025-04-05T14:30:00+05:30",
          "count": 7,
          "total_games": 34,
          "percentage": 20.588235294117645
        },
        {
          "interval_start": "2025-04-05T14:30:00+05:30",
          "interval_end": "2025-04-05T14:45:00+05:30",
          "count": 5,
          "total_games": 33,
          "percentage": 15.151515151515152
        },
        {
          "interval_start": "2025-04-05T14:45:00+05:30",
          "interval_end": "2025-04-05T15:00:00+05:30",
          "count": 5,
          "total_games": 31,
          "percentage": 16.129032258064516
        },
        {
          "interval_start": "2025-04-05T15:00:00+05:30",
          "interval_end": "2025-04-05T15:15:00+05:30",
          "count": 10,
          "total_games": 23,
          "percentage": 43.47826086956522
        },
        {
          "interval_start": "2025-04-05T15:15:00+05:30",
          "interval_end": "2025-04-05T15:30:00+05:30",
          "count": 5,
          "total_games": 37,
          "percentage": 13.513513513513514
        },
        {
          "interval_start": "2025-04-05T15:30:00+05:30",
          "interval_end": "2025-04-05T15:45:00+05:30",
          "count": 7,
          "total_games": 31,
          "percentage": 22.58064516129032
        },
        {
          "interval_start": "2025-04-05T15:45:00+05:30",
          "interval_end": "2025-04-05T16:00:00+05:30",
          "count": 8,
          "total_games": 29,
          "percentage": 27.586206896551722
        },
        {
          "interval_start": "2025-04-05T16:00:00+05:30",
          "interval_end": "2025-04-05T16:15:00+05:30",
          "count": 5,
          "total_games": 29,
          "percentage": 17.24137931034483
        },
        {
          "interval_start": "2025-04-05T16:15:00+05:30",
          "interval_end": "2025-04-05T16:30:00+05:30",
          "count": 4,
          "total_games": 36,
          "percentage": 11.11111111111111
        },
        {
          "interval_start": "2025-04-05T16:30:00+05:30",
          "interval_end": "2025-04-05T16:45:00+05:30",
          "count": 8,
          "total_games": 23,
          "percentage": 34.78260869565217
        },
        {
          "interval_start": "2025-04-05T16:45:00+05:30",
          "interval_end": "2025-04-05T17:00:00+05:30",
          "count": 9,
          "total_games": 27,
          "percentage": 33.33333333333333
        },
        {
          "interval_start": "2025-04-05T17:00:00+05:30",
          "interval_end": "2025-04-05T17:15:00+05:30",
          "count": 9,
          "total_games": 31,
          "percentage": 29.03225806451613
        },
        {
          "interval_start": "2025-04-05T17:15:00+05:30",
          "interval_end": "2025-04-05T17:30:00+05:30",
          "count": 5,
          "total_games": 33,
          "percentage": 15.151515151515152
        },
        {
          "interval_start": "2025-04-05T17:30:00+05:30",
          "interval_end": "2025-04-05T17:45:00+05:30",
          "count": 10,
          "total_games": 31,
          "percentage": 32.25806451612903
        },
        {
          "interval_start": "2025-04-05T17:45:00+05:30",
          "interval_end": "2025-04-05T18:00:00+05:30",
          "count": 5,
          "total_games": 33,
          "percentage": 15.151515151515152
        },
        {
          "interval_start": "2025-04-05T18:00:00+05:30",
          "interval_end": "2025-04-05T18:15:00+05:30",
          "count": 7,
          "total_games": 32,
          "percentage": 21.875
        },
        {
          "interval_start": "2025-04-05T18:15:00+05:30",
          "interval_end": "2025-04-05T18:30:00+05:30",
          "count": 5,
          "total_games": 32,
          "percentage": 15.625
        },
        {
          "interval_start": "2025-04-05T18:30:00+05:30",
          "interval_end": "2025-04-05T18:45:00+05:30",
          "count": 6,
          "total_games": 36,
          "percentage": 16.666666666666664
        },
        {
          "interval_start": "2025-04-05T18:45:00+05:30",
          "interval_end": "2025-04-05T19:00:00+05:30",
          "count": 6,
          "total_games": 33,
          "percentage": 18.181818181818183
        },
        {
          "interval_start": "2025-04-05T19:00:00+05:30",
          "interval_end": "2025-04-05T19:15:00+05:30",
          "count": 6,
          "total_games": 33,
          "percentage": 18.181818181818183
        },
        {
          "interval_start": "2025-04-05T19:15:00+05:30",
          "interval_end": "2025-04-05T19:30:00+05:30",
          "count": 5,
          "total_games": 37,
          "percentage": 13.513513513513514
        },
        {
          "interval_start": "2025-04-05T19:30:00+05:30",
          "interval_end": "2025-04-05T19:45:00+05:30",
          "count": 7,
          "total_games": 32,
          "percentage": 21.875
        },
        {
          "interval_start": "2025-04-05T19:45:00+05:30",
          "interval_end": "2025-04-05T20:00:00+05:30",
          "count": 5,
          "total_games": 31,
          "percentage": 16.129032258064516
        },
        {
          "interval_start": "2025-04-05T20:00:00+05:30",
          "interval_end": "2025-04-05T20:15:00+05:30",
          "count": 5,
          "total_games": 32,
          "percentage": 15.625
        },
        {
          "interval_start": "2025-04-05T20:15:00+05:30",
          "interval_end": "2025-04-05T20:30:00+05:30",
          "count": 4,
          "total_games": 37,
          "percentage": 10.81081081081081
        },
        {
          "interval_start": "2025-04-05T20:30:00+05:30",
          "interval_end": "2025-04-05T20:45:00+05:30",
          "count": 6,
          "total_games": 33,
          "percentage": 18.181818181818183
        },
        {
          "interval_start": "2025-04-05T20:45:00+05:30",
          "interval_end": "2025-04-05T21:00:00+05:30",
          "count": 6,
          "total_games": 30,
          "percentage": 20.0
        },
        {
          "interval_start": "2025-04-05T21:00:00+05:30",
          "interval_end": "2025-04-05T21:15:00+05:30",
          "count": 8,
          "total_games": 32,
          "percentage": 25.0
        },
        {
          "interval_start": "2025-04-05T21:15:00+05:30",
          "interval_end": "2025-04-05T21:30:00+05:30",
          "count": 5,
          "total_games": 33,
          "percentage": 15.151515151515152
        },
        {
          "interval_start": "2025-04-05T21:30:00+05:30",
          "interval_end": "2025-04-05T21:45:00+05:30",
          "count": 5,
          "total_games": 36,
          "percentage": 13.88888888888889
        },
        {
          "interval_start": "2025-04-05T21:45:00+05:30",
          "interval_end": "2025-04-05T22:00:00+05:30",
          "count": 3,
          "total_games": 34,
          "percentage": 8.823529411764707
        },
        {
          "interval_start": "2025-04-05T22:00:00+05:30",
          "interval_end": "2025-04-05T22:15:00+05:30",
          "count": 6,
          "total_games": 25,
          "percentage": 24.0
        },
        {
          "interval_start": "2025-04-05T22:15:00+05:30",
          "interval_end": "2025-04-05T22:30:00+05:30",
          "count": 5,
          "total_games": 32,
          "percentage": 15.625
        },
        {
          "interval_start": "2025-04-05T22:30:00+05:30",
          "interval_end": "2025-04-05T22:45:00+05:30",
          "count": 6,
          "total_games": 34,
          "percentage": 17.647058823529413
        },
        {
          "interval_start": "2025-04-05T22:45:00+05:30",
          "interval_end": "2025-04-05T23:00:00+05:30",
          "count": 8,
          "total_games": 24,
          "percentage": 33.33333333333333
        },
        {
          "interval_start": "2025-04-05T23:00:00+05:30",
          "interval_end": "2025-04-05T23:15:00+05:30",
          "count": 10,
          "total_games": 28,
          "percentage": 35.714285714285715
        },
        {
          "interval_start": "2025-04-05T23:15:00+05:30",
          "interval_end": "2025-04-05T23:30:00+05:30",
          "count": 4,
          "total_games": 32,
          "percentage": 12.5
        }
      ],
      "10.0": [
        {
          "interval_start": "2025-04-04T23:15:00+05:30",
          "interval_end": "2025-04-04T23:30:00+05:30",
          "count": 3,
          "total_games": 29,
          "percentage": 10.344827586206897
        },
        {
          "interval_start": "2025-04-04T23:30:00+05:30",
          "interval_end": "2025-04-04T23:45:00+05:30",
          "count": 5,
          "total_games": 29,
          "percentage": 17.24137931034483
        },
        {
          "interval_start": "2025-04-04T23:45:00+05:30",
          "interval_end": "2025-04-05T00:00:00+05:30",
          "count": 6,
          "total_games": 28,
          "percentage": 21.428571428571427
        },
        {
          "interval_start": "2025-04-05T00:00:00+05:30",
          "interval_end": "2025-04-05T00:15:00+05:30",
          "count": 3,
          "total_games": 34,
          "percentage": 8.823529411764707
        },
        {
          "interval_start": "2025-04-05T00:15:00+05:30",
          "interval_end": "2025-04-05T00:30:00+05:30",
          "count": 3,
          "total_games": 35,
          "percentage": 8.571428571428571
        },
        {
          "interval_start": "2025-04-05T00:30:00+05:30",
          "interval_end": "2025-04-05T00:45:00+05:30",
          "count": 0,
          "total_games": 38,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T00:45:00+05:30",
          "interval_end": "2025-04-05T01:00:00+05:30",
          "count": 3,
          "total_games": 28,
          "percentage": 10.714285714285714
        },
        {
          "interval_start": "2025-04-05T01:00:00+05:30",
          "interval_end": "2025-04-05T01:15:00+05:30",
          "count": 4,
          "total_games": 29,
          "percentage": 13.793103448275861
        },
        {
          "interval_start": "2025-04-05T01:15:00+05:30",
          "interval_end": "2025-04-05T01:30:00+05:30",
          "count": 5,
          "total_games": 29,
          "percentage": 17.24137931034483
        },
        {
          "interval_start": "2025-04-05T01:30:00+05:30",
          "interval_end": "2025-04-05T01:45:00+05:30",
          "count": 4,
          "total_games": 28,
          "percentage": 14.285714285714285
        },
        {
          "interval_start": "2025-04-05T01:45:00+05:30",
          "interval_end": "2025-04-05T02:00:00+05:30",
          "count": 3,
          "total_games": 31,
          "percentage": 9.67741935483871
        },
        {
          "interval_start": "2025-04-05T02:00:00+05:30",
          "interval_end": "2025-04-05T02:15:00+05:30",
          "count": 2,
          "total_games": 31,
          "percentage": 6.451612903225806
        },
        {
          "interval_start": "2025-04-05T02:15:00+05:30",
          "interval_end": "2025-04-05T02:30:00+05:30",
          "count": 4,
          "total_games": 35,
          "percentage": 11.428571428571429
        },
        {
          "interval_start": "2025-04-05T02:30:00+05:30",
          "interval_end": "2025-04-05T02:45:00+05:30",
          "count": 4,
          "total_games": 33,
          "percentage": 12.121212121212121
        },
        {
          "interval_start": "2025-04-05T02:45:00+05:30",
          "interval_end": "2025-04-05T03:00:00+05:30",
          "count": 2,
          "total_games": 35,
          "percentage": 5.714285714285714
        },
        {
          "interval_start": "2025-04-05T03:00:00+05:30",
          "interval_end": "2025-04-05T03:15:00+05:30",
          "count": 3,
          "total_games": 33,
          "percentage": 9.090909090909092
        },
        {
          "interval_start": "2025-04-05T03:15:00+05:30",
          "interval_end": "2025-04-05T03:30:00+05:30",
          "count": 6,
          "total_games": 31,
          "percentage": 19.35483870967742
        },
        {
          "interval_start": "2025-04-05T03:30:00+05:30",
          "interval_end": "2025-04-05T03:45:00+05:30",
          "count": 3,
          "total_games": 31,
          "percentage": 9.67741935483871
        },
        {
          "interval_start": "2025-04-05T03:45:00+05:30",
          "interval_end": "2025-04-05T04:00:00+05:30",
          "count": 2,
          "total_games": 36,
          "percentage": 5.555555555555555
        },
        {
          "interval_start": "2025-04-05T04:00:00+05:30",
          "interval_end": "2025-04-05T04:15:00+05:30",
          "count": 3,
          "total_games": 31,
          "percentage": 9.67741935483871
        },
        {
          "interval_start": "2025-04-05T04:15:00+05:30",
          "interval_end": "2025-04-05T04:30:00+05:30",
          "count": 1,
          "total_games": 39,
          "percentage": 2.564102564102564
        },
        {
          "interval_start": "2025-04-05T04:30:00+05:30",
          "interval_end": "2025-04-05T04:45:00+05:30",
          "count": 3,
          "total_games": 31,
          "percentage": 9.67741935483871
        },
        {
          "interval_start": "2025-04-05T04:45:00+05:30",
          "interval_end": "2025-04-05T05:00:00+05:30",
          "count": 3,
          "total_games": 34,
          "percentage": 8.823529411764707
        },
        {
          "interval_start": "2025-04-05T05:00:00+05:30",
          "interval_end": "2025-04-05T05:15:00+05:30",
          "count": 8,
          "total_games": 26,
          "percentage": 30.76923076923077
        },
        {
          "interval_start": "2025-04-05T05:15:00+05:30",
          "interval_end": "2025-04-05T05:30:00+05:30",
          "count": 1,
          "total_games": 34,
          "percentage": 2.941176470588235
        },
        {
          "interval_start": "2025-04-05T05:30:00+05:30",
          "interval_end": "2025-04-05T05:45:00+05:30",
          "count": 2,
          "total_games": 31,
          "percentage": 6.451612903225806
        },
        {
          "interval_start": "2025-04-05T05:45:00+05:30",
          "interval_end": "2025-04-05T06:00:00+05:30",
          "count": 2,
          "total_games": 34,
          "percentage": 5.88235294117647
        },
        {
          "interval_start": "2025-04-05T06:00:00+05:30",
          "interval_end": "2025-04-05T06:15:00+05:30",
          "count": 3,
          "total_games": 36,
          "percentage": 8.333333333333332
        },
        {
          "interval_start": "2025-04-05T06:15:00+05:30",
          "interval_end": "2025-04-05T06:30:00+05:30",
          "count": 2,
          "total_games": 39,
          "percentage": 5.128205128205128
        },
        {
          "interval_start": "2025-04-05T06:30:00+05:30",
          "interval_end": "2025-04-05T06:45:00+05:30",
          "count": 2,
          "total_games": 35,
          "percentage": 5.714285714285714
        },
        {
          "interval_start": "2025-04-05T06:45:00+05:30",
          "interval_end": "2025-04-05T07:00:00+05:30",
          "count": 3,
          "total_games": 30,
          "percentage": 10.0
        },
        {
          "interval_start": "2025-04-05T07:00:00+05:30",
          "interval_end": "2025-04-05T07:15:00+05:30",
          "count": 4,
          "total_games": 29,
          "percentage": 13.793103448275861
        },
        {
          "interval_start": "2025-04-05T07:15:00+05:30",
          "interval_end": "2025-04-05T07:30:00+05:30",
          "count": 3,
          "total_games": 34,
          "percentage": 8.823529411764707
        },
        {
          "interval_start": "2025-04-05T07:30:00+05:30",
          "interval_end": "2025-04-05T07:45:00+05:30",
          "count": 2,
          "total_games": 34,
          "percentage": 5.88235294117647
        },
        {
          "interval_start": "2025-04-05T07:45:00+05:30",
          "interval_end": "2025-04-05T08:00:00+05:30",
          "count": 3,
          "total_games": 36,
          "percentage": 8.333333333333332
        },
        {
          "interval_start": "2025-04-05T08:00:00+05:30",
          "interval_end": "2025-04-05T08:15:00+05:30",
          "count": 2,
          "total_games": 33,
          "percentage": 6.0606060606060606
        },
        {
          "interval_start": "2025-04-05T08:15:00+05:30",
          "interval_end": "2025-04-05T08:30:00+05:30",
          "count": 2,
          "total_games": 34,
          "percentage": 5.88235294117647
        },
        {
          "interval_start": "2025-04-05T08:30:00+05:30",
          "interval_end": "2025-04-05T08:45:00+05:30",
          "count": 5,
          "total_games": 29,
          "percentage": 17.24137931034483
        },
        {
          "interval_start": "2025-04-05T08:45:00+05:30",
          "interval_end": "2025-04-05T09:00:00+05:30",
          "count": 2,
          "total_games": 38,
          "percentage": 5.263157894736842
        },
        {
          "interval_start": "2025-04-05T09:00:00+05:30",
          "interval_end": "2025-04-05T09:15:00+05:30",
          "count": 2,
          "total_games": 34,
          "percentage": 5.88235294117647
        },
        {
          "interval_start": "2025-04-05T09:15:00+05:30",
          "interval_end": "2025-04-05T09:30:00+05:30",
          "count": 2,
          "total_games": 38,
          "percentage": 5.263157894736842
        },
        {
          "interval_start": "2025-04-05T09:30:00+05:30",
          "interval_end": "2025-04-05T09:45:00+05:30",
          "count": 3,
          "total_games": 29,
          "percentage": 10.344827586206897
        },
        {
          "interval_start": "2025-04-05T09:45:00+05:30",
          "interval_end": "2025-04-05T10:00:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        },
        {
          "interval_start": "2025-04-05T10:00:00+05:30",
          "interval_end": "2025-04-05T10:15:00+05:30",
          "count": 4,
          "total_games": 31,
          "percentage": 12.903225806451612
        },
        {
          "interval_start": "2025-04-05T10:15:00+05:30",
          "interval_end": "2025-04-05T10:30:00+05:30",
          "count": 3,
          "total_games": 28,
          "percentage": 10.714285714285714
        },
        {
          "interval_start": "2025-04-05T10:30:00+05:30",
          "interval_end": "2025-04-05T10:45:00+05:30",
          "count": 5,
          "total_games": 31,
          "percentage": 16.129032258064516
        },
        {
          "interval_start": "2025-04-05T10:45:00+05:30",
          "interval_end": "2025-04-05T11:00:00+05:30",
          "count": 4,
          "total_games": 33,
          "percentage": 12.121212121212121
        },
        {
          "interval_start": "2025-04-05T11:00:00+05:30",
          "interval_end": "2025-04-05T11:15:00+05:30",
          "count": 2,
          "total_games": 28,
          "percentage": 7.142857142857142
        },
        {
          "interval_start": "2025-04-05T11:15:00+05:30",
          "interval_end": "2025-04-05T11:30:00+05:30",
          "count": 4,
          "total_games": 30,
          "percentage": 13.333333333333334
        },
        {
          "interval_start": "2025-04-05T11:30:00+05:30",
          "interval_end": "2025-04-05T11:45:00+05:30",
          "count": 5,
          "total_games": 30,
          "percentage": 16.666666666666664
        },
        {
          "interval_start": "2025-04-05T11:45:00+05:30",
          "interval_end": "2025-04-05T12:00:00+05:30",
          "count": 2,
          "total_games": 35,
          "percentage": 5.714285714285714
        },
        {
          "interval_start": "2025-04-05T12:00:00+05:30",
          "interval_end": "2025-04-05T12:15:00+05:30",
          "count": 3,
          "total_games": 28,
          "percentage": 10.714285714285714
        },
        {
          "interval_start": "2025-04-05T12:15:00+05:30",
          "interval_end": "2025-04-05T12:30:00+05:30",
          "count": 2,
          "total_games": 31,
          "percentage": 6.451612903225806
        },
        {
          "interval_start": "2025-04-05T12:30:00+05:30",
          "interval_end": "2025-04-05T12:45:00+05:30",
          "count": 4,
          "total_games": 32,
          "percentage": 12.5
        },
        {
          "interval_start": "2025-04-05T12:45:00+05:30",
          "interval_end": "2025-04-05T13:00:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        },
        {
          "interval_start": "2025-04-05T13:00:00+05:30",
          "interval_end": "2025-04-05T13:15:00+05:30",
          "count": 4,
          "total_games": 33,
          "percentage": 12.121212121212121
        },
        {
          "interval_start": "2025-04-05T13:15:00+05:30",
          "interval_end": "2025-04-05T13:30:00+05:30",
          "count": 1,
          "total_games": 35,
          "percentage": 2.857142857142857
        },
        {
          "interval_start": "2025-04-05T13:30:00+05:30",
          "interval_end": "2025-04-05T13:45:00+05:30",
          "count": 4,
          "total_games": 25,
          "percentage": 16.0
        },
        {
          "interval_start": "2025-04-05T13:45:00+05:30",
          "interval_end": "2025-04-05T14:00:00+05:30",
          "count": 1,
          "total_games": 33,
          "percentage": 3.0303030303030303
        },
        {
          "interval_start": "2025-04-05T14:00:00+05:30",
          "interval_end": "2025-04-05T14:15:00+05:30",
          "count": 2,
          "total_games": 30,
          "percentage": 6.666666666666667
        },
        {
          "interval_start": "2025-04-05T14:15:00+05:30",
          "interval_end": "2025-04-05T14:30:00+05:30",
          "count": 3,
          "total_games": 34,
          "percentage": 8.823529411764707
        },
        {
          "interval_start": "2025-04-05T14:30:00+05:30",
          "interval_end": "2025-04-05T14:45:00+05:30",
          "count": 3,
          "total_games": 33,
          "percentage": 9.090909090909092
        },
        {
          "interval_start": "2025-04-05T14:45:00+05:30",
          "interval_end": "2025-04-05T15:00:00+05:30",
          "count": 4,
          "total_games": 31,
          "percentage": 12.903225806451612
        },
        {
          "interval_start": "2025-04-05T15:00:00+05:30",
          "interval_end": "2025-04-05T15:15:00+05:30",
          "count": 8,
          "total_games": 23,
          "percentage": 34.78260869565217
        },
        {
          "interval_start": "2025-04-05T15:15:00+05:30",
          "interval_end": "2025-04-05T15:30:00+05:30",
          "count": 2,
          "total_games": 37,
          "percentage": 5.405405405405405
        },
        {
          "interval_start": "2025-04-05T15:30:00+05:30",
          "interval_end": "2025-04-05T15:45:00+05:30",
          "count": 3,
          "total_games": 31,
          "percentage": 9.67741935483871
        },
        {
          "interval_start": "2025-04-05T15:45:00+05:30",
          "interval_end": "2025-04-05T16:00:00+05:30",
          "count": 4,
          "total_games": 29,
          "percentage": 13.793103448275861
        },
        {
          "interval_start": "2025-04-05T16:00:00+05:30",
          "interval_end": "2025-04-05T16:15:00+05:30",
          "count": 4,
          "total_games": 29,
          "percentage": 13.793103448275861
        },
        {
          "interval_start": "2025-04-05T16:15:00+05:30",
          "interval_end": "2025-04-05T16:30:00+05:30",
          "count": 2,
          "total_games": 36,
          "percentage": 5.555555555555555
        },
        {
          "interval_start": "2025-04-05T16:30:00+05:30",
          "interval_end": "2025-04-05T16:45:00+05:30",
          "count": 6,
          "total_games": 23,
          "percentage": 26.08695652173913
        },
        {
          "interval_start": "2025-04-05T16:45:00+05:30",
          "interval_end": "2025-04-05T17:00:00+05:30",
          "count": 3,
          "total_games": 27,
          "percentage": 11.11111111111111
        },
        {
          "interval_start": "2025-04-05T17:00:00+05:30",
          "interval_end": "2025-04-05T17:15:00+05:30",
          "count": 3,
          "total_games": 31,
          "percentage": 9.67741935483871
        },
        {
          "interval_start": "2025-04-05T17:15:00+05:30",
          "interval_end": "2025-04-05T17:30:00+05:30",
          "count": 2,
          "total_games": 33,
          "percentage": 6.0606060606060606
        },
        {
          "interval_start": "2025-04-05T17:30:00+05:30",
          "interval_end": "2025-04-05T17:45:00+05:30",
          "count": 2,
          "total_games": 31,
          "percentage": 6.451612903225806
        },
        {
          "interval_start": "2025-04-05T17:45:00+05:30",
          "interval_end": "2025-04-05T18:00:00+05:30",
          "count": 2,
          "total_games": 33,
          "percentage": 6.0606060606060606
        },
        {
          "interval_start": "2025-04-05T18:00:00+05:30",
          "interval_end": "2025-04-05T18:15:00+05:30",
          "count": 4,
          "total_games": 32,
          "percentage": 12.5
        },
        {
          "interval_start": "2025-04-05T18:15:00+05:30",
          "interval_end": "2025-04-05T18:30:00+05:30",
          "count": 3,
          "total_games": 32,
          "percentage": 9.375
        },
        {
          "interval_start": "2025-04-05T18:30:00+05:30",
          "interval_end": "2025-04-05T18:45:00+05:30",
          "count": 1,
          "total_games": 36,
          "percentage": 2.7777777777777777
        },
        {
          "interval_start": "2025-04-05T18:45:00+05:30",
          "interval_end": "2025-04-05T19:00:00+05:30",
          "count": 2,
          "total_games": 33,
          "percentage": 6.0606060606060606
        },
        {
          "interval_start": "2025-04-05T19:00:00+05:30",
          "interval_end": "2025-04-05T19:15:00+05:30",
          "count": 2,
          "total_games": 33,
          "percentage": 6.0606060606060606
        },
        {
          "interval_start": "2025-04-05T19:15:00+05:30",
          "interval_end": "2025-04-05T19:30:00+05:30",
          "count": 2,
          "total_games": 37,
          "percentage": 5.405405405405405
        },
        {
          "interval_start": "2025-04-05T19:30:00+05:30",
          "interval_end": "2025-04-05T19:45:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        },
        {
          "interval_start": "2025-04-05T19:45:00+05:30",
          "interval_end": "2025-04-05T20:00:00+05:30",
          "count": 3,
          "total_games": 31,
          "percentage": 9.67741935483871
        },
        {
          "interval_start": "2025-04-05T20:00:00+05:30",
          "interval_end": "2025-04-05T20:15:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        },
        {
          "interval_start": "2025-04-05T20:15:00+05:30",
          "interval_end": "2025-04-05T20:30:00+05:30",
          "count": 2,
          "total_games": 37,
          "percentage": 5.405405405405405
        },
        {
          "interval_start": "2025-04-05T20:30:00+05:30",
          "interval_end": "2025-04-05T20:45:00+05:30",
          "count": 3,
          "total_games": 33,
          "percentage": 9.090909090909092
        },
        {
          "interval_start": "2025-04-05T20:45:00+05:30",
          "interval_end": "2025-04-05T21:00:00+05:30",
          "count": 4,
          "total_games": 30,
          "percentage": 13.333333333333334
        },
        {
          "interval_start": "2025-04-05T21:00:00+05:30",
          "interval_end": "2025-04-05T21:15:00+05:30",
          "count": 4,
          "total_games": 32,
          "percentage": 12.5
        },
        {
          "interval_start": "2025-04-05T21:15:00+05:30",
          "interval_end": "2025-04-05T21:30:00+05:30",
          "count": 4,
          "total_games": 33,
          "percentage": 12.121212121212121
        },
        {
          "interval_start": "2025-04-05T21:30:00+05:30",
          "interval_end": "2025-04-05T21:45:00+05:30",
          "count": 1,
          "total_games": 36,
          "percentage": 2.7777777777777777
        },
        {
          "interval_start": "2025-04-05T21:45:00+05:30",
          "interval_end": "2025-04-05T22:00:00+05:30",
          "count": 3,
          "total_games": 34,
          "percentage": 8.823529411764707
        },
        {
          "interval_start": "2025-04-05T22:00:00+05:30",
          "interval_end": "2025-04-05T22:15:00+05:30",
          "count": 4,
          "total_games": 25,
          "percentage": 16.0
        },
        {
          "interval_start": "2025-04-05T22:15:00+05:30",
          "interval_end": "2025-04-05T22:30:00+05:30",
          "count": 3,
          "total_games": 32,
          "percentage": 9.375
        },
        {
          "interval_start": "2025-04-05T22:30:00+05:30",
          "interval_end": "2025-04-05T22:45:00+05:30",
          "count": 1,
          "total_games": 34,
          "percentage": 2.941176470588235
        },
        {
          "interval_start": "2025-04-05T22:45:00+05:30",
          "interval_end": "2025-04-05T23:00:00+05:30",
          "count": 5,
          "total_games": 24,
          "percentage": 20.833333333333336
        },
        {
          "interval_start": "2025-04-05T23:00:00+05:30",
          "interval_end": "2025-04-05T23:15:00+05:30",
          "count": 4,
          "total_games": 28,
          "percentage": 14.285714285714285
        },
        {
          "interval_start": "2025-04-05T23:15:00+05:30",
          "interval_end": "2025-04-05T23:30:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        }
      ],
      "20.0": [
        {
          "interval_start": "2025-04-04T23:15:00+05:30",
          "interval_end": "2025-04-04T23:30:00+05:30",
          "count": 2,
          "total_games": 29,
          "percentage": 6.896551724137931
        },
        {
          "interval_start": "2025-04-04T23:30:00+05:30",
          "interval_end": "2025-04-04T23:45:00+05:30",
          "count": 2,
          "total_games": 29,
          "percentage": 6.896551724137931
        },
        {
          "interval_start": "2025-04-04T23:45:00+05:30",
          "interval_end": "2025-04-05T00:00:00+05:30",
          "count": 5,
          "total_games": 28,
          "percentage": 17.857142857142858
        },
        {
          "interval_start": "2025-04-05T00:00:00+05:30",
          "interval_end": "2025-04-05T00:15:00+05:30",
          "count": 2,
          "total_games": 34,
          "percentage": 5.88235294117647
        },
        {
          "interval_start": "2025-04-05T00:15:00+05:30",
          "interval_end": "2025-04-05T00:30:00+05:30",
          "count": 1,
          "total_games": 35,
          "percentage": 2.857142857142857
        },
        {
          "interval_start": "2025-04-05T00:30:00+05:30",
          "interval_end": "2025-04-05T00:45:00+05:30",
          "count": 0,
          "total_games": 38,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T00:45:00+05:30",
          "interval_end": "2025-04-05T01:00:00+05:30",
          "count": 3,
          "total_games": 28,
          "percentage": 10.714285714285714
        },
        {
          "interval_start": "2025-04-05T01:00:00+05:30",
          "interval_end": "2025-04-05T01:15:00+05:30",
          "count": 2,
          "total_games": 29,
          "percentage": 6.896551724137931
        },
        {
          "interval_start": "2025-04-05T01:15:00+05:30",
          "interval_end": "2025-04-05T01:30:00+05:30",
          "count": 3,
          "total_games": 29,
          "percentage": 10.344827586206897
        },
        {
          "interval_start": "2025-04-05T01:30:00+05:30",
          "interval_end": "2025-04-05T01:45:00+05:30",
          "count": 1,
          "total_games": 28,
          "percentage": 3.571428571428571
        },
        {
          "interval_start": "2025-04-05T01:45:00+05:30",
          "interval_end": "2025-04-05T02:00:00+05:30",
          "count": 3,
          "total_games": 31,
          "percentage": 9.67741935483871
        },
        {
          "interval_start": "2025-04-05T02:00:00+05:30",
          "interval_end": "2025-04-05T02:15:00+05:30",
          "count": 0,
          "total_games": 31,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T02:15:00+05:30",
          "interval_end": "2025-04-05T02:30:00+05:30",
          "count": 0,
          "total_games": 35,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T02:30:00+05:30",
          "interval_end": "2025-04-05T02:45:00+05:30",
          "count": 0,
          "total_games": 33,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T02:45:00+05:30",
          "interval_end": "2025-04-05T03:00:00+05:30",
          "count": 1,
          "total_games": 35,
          "percentage": 2.857142857142857
        },
        {
          "interval_start": "2025-04-05T03:00:00+05:30",
          "interval_end": "2025-04-05T03:15:00+05:30",
          "count": 2,
          "total_games": 33,
          "percentage": 6.0606060606060606
        },
        {
          "interval_start": "2025-04-05T03:15:00+05:30",
          "interval_end": "2025-04-05T03:30:00+05:30",
          "count": 4,
          "total_games": 31,
          "percentage": 12.903225806451612
        },
        {
          "interval_start": "2025-04-05T03:30:00+05:30",
          "interval_end": "2025-04-05T03:45:00+05:30",
          "count": 1,
          "total_games": 31,
          "percentage": 3.225806451612903
        },
        {
          "interval_start": "2025-04-05T03:45:00+05:30",
          "interval_end": "2025-04-05T04:00:00+05:30",
          "count": 2,
          "total_games": 36,
          "percentage": 5.555555555555555
        },
        {
          "interval_start": "2025-04-05T04:00:00+05:30",
          "interval_end": "2025-04-05T04:15:00+05:30",
          "count": 1,
          "total_games": 31,
          "percentage": 3.225806451612903
        },
        {
          "interval_start": "2025-04-05T04:15:00+05:30",
          "interval_end": "2025-04-05T04:30:00+05:30",
          "count": 1,
          "total_games": 39,
          "percentage": 2.564102564102564
        },
        {
          "interval_start": "2025-04-05T04:30:00+05:30",
          "interval_end": "2025-04-05T04:45:00+05:30",
          "count": 1,
          "total_games": 31,
          "percentage": 3.225806451612903
        },
        {
          "interval_start": "2025-04-05T04:45:00+05:30",
          "interval_end": "2025-04-05T05:00:00+05:30",
          "count": 1,
          "total_games": 34,
          "percentage": 2.941176470588235
        },
        {
          "interval_start": "2025-04-05T05:00:00+05:30",
          "interval_end": "2025-04-05T05:15:00+05:30",
          "count": 3,
          "total_games": 26,
          "percentage": 11.538461538461538
        },
        {
          "interval_start": "2025-04-05T05:15:00+05:30",
          "interval_end": "2025-04-05T05:30:00+05:30",
          "count": 0,
          "total_games": 34,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T05:30:00+05:30",
          "interval_end": "2025-04-05T05:45:00+05:30",
          "count": 1,
          "total_games": 31,
          "percentage": 3.225806451612903
        },
        {
          "interval_start": "2025-04-05T05:45:00+05:30",
          "interval_end": "2025-04-05T06:00:00+05:30",
          "count": 2,
          "total_games": 34,
          "percentage": 5.88235294117647
        },
        {
          "interval_start": "2025-04-05T06:00:00+05:30",
          "interval_end": "2025-04-05T06:15:00+05:30",
          "count": 0,
          "total_games": 36,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T06:15:00+05:30",
          "interval_end": "2025-04-05T06:30:00+05:30",
          "count": 2,
          "total_games": 39,
          "percentage": 5.128205128205128
        },
        {
          "interval_start": "2025-04-05T06:30:00+05:30",
          "interval_end": "2025-04-05T06:45:00+05:30",
          "count": 0,
          "total_games": 35,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T06:45:00+05:30",
          "interval_end": "2025-04-05T07:00:00+05:30",
          "count": 2,
          "total_games": 30,
          "percentage": 6.666666666666667
        },
        {
          "interval_start": "2025-04-05T07:00:00+05:30",
          "interval_end": "2025-04-05T07:15:00+05:30",
          "count": 2,
          "total_games": 29,
          "percentage": 6.896551724137931
        },
        {
          "interval_start": "2025-04-05T07:15:00+05:30",
          "interval_end": "2025-04-05T07:30:00+05:30",
          "count": 1,
          "total_games": 34,
          "percentage": 2.941176470588235
        },
        {
          "interval_start": "2025-04-05T07:30:00+05:30",
          "interval_end": "2025-04-05T07:45:00+05:30",
          "count": 1,
          "total_games": 34,
          "percentage": 2.941176470588235
        },
        {
          "interval_start": "2025-04-05T07:45:00+05:30",
          "interval_end": "2025-04-05T08:00:00+05:30",
          "count": 1,
          "total_games": 36,
          "percentage": 2.7777777777777777
        },
        {
          "interval_start": "2025-04-05T08:00:00+05:30",
          "interval_end": "2025-04-05T08:15:00+05:30",
          "count": 0,
          "total_games": 33,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T08:15:00+05:30",
          "interval_end": "2025-04-05T08:30:00+05:30",
          "count": 0,
          "total_games": 34,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T08:30:00+05:30",
          "interval_end": "2025-04-05T08:45:00+05:30",
          "count": 3,
          "total_games": 29,
          "percentage": 10.344827586206897
        },
        {
          "interval_start": "2025-04-05T08:45:00+05:30",
          "interval_end": "2025-04-05T09:00:00+05:30",
          "count": 2,
          "total_games": 38,
          "percentage": 5.263157894736842
        },
        {
          "interval_start": "2025-04-05T09:00:00+05:30",
          "interval_end": "2025-04-05T09:15:00+05:30",
          "count": 1,
          "total_games": 34,
          "percentage": 2.941176470588235
        },
        {
          "interval_start": "2025-04-05T09:15:00+05:30",
          "interval_end": "2025-04-05T09:30:00+05:30",
          "count": 1,
          "total_games": 38,
          "percentage": 2.631578947368421
        },
        {
          "interval_start": "2025-04-05T09:30:00+05:30",
          "interval_end": "2025-04-05T09:45:00+05:30",
          "count": 2,
          "total_games": 29,
          "percentage": 6.896551724137931
        },
        {
          "interval_start": "2025-04-05T09:45:00+05:30",
          "interval_end": "2025-04-05T10:00:00+05:30",
          "count": 1,
          "total_games": 32,
          "percentage": 3.125
        },
        {
          "interval_start": "2025-04-05T10:00:00+05:30",
          "interval_end": "2025-04-05T10:15:00+05:30",
          "count": 1,
          "total_games": 31,
          "percentage": 3.225806451612903
        },
        {
          "interval_start": "2025-04-05T10:15:00+05:30",
          "interval_end": "2025-04-05T10:30:00+05:30",
          "count": 3,
          "total_games": 28,
          "percentage": 10.714285714285714
        },
        {
          "interval_start": "2025-04-05T10:30:00+05:30",
          "interval_end": "2025-04-05T10:45:00+05:30",
          "count": 5,
          "total_games": 31,
          "percentage": 16.129032258064516
        },
        {
          "interval_start": "2025-04-05T10:45:00+05:30",
          "interval_end": "2025-04-05T11:00:00+05:30",
          "count": 2,
          "total_games": 33,
          "percentage": 6.0606060606060606
        },
        {
          "interval_start": "2025-04-05T11:00:00+05:30",
          "interval_end": "2025-04-05T11:15:00+05:30",
          "count": 1,
          "total_games": 28,
          "percentage": 3.571428571428571
        },
        {
          "interval_start": "2025-04-05T11:15:00+05:30",
          "interval_end": "2025-04-05T11:30:00+05:30",
          "count": 1,
          "total_games": 30,
          "percentage": 3.3333333333333335
        },
        {
          "interval_start": "2025-04-05T11:30:00+05:30",
          "interval_end": "2025-04-05T11:45:00+05:30",
          "count": 2,
          "total_games": 30,
          "percentage": 6.666666666666667
        },
        {
          "interval_start": "2025-04-05T11:45:00+05:30",
          "interval_end": "2025-04-05T12:00:00+05:30",
          "count": 1,
          "total_games": 35,
          "percentage": 2.857142857142857
        },
        {
          "interval_start": "2025-04-05T12:00:00+05:30",
          "interval_end": "2025-04-05T12:15:00+05:30",
          "count": 3,
          "total_games": 28,
          "percentage": 10.714285714285714
        },
        {
          "interval_start": "2025-04-05T12:15:00+05:30",
          "interval_end": "2025-04-05T12:30:00+05:30",
          "count": 1,
          "total_games": 31,
          "percentage": 3.225806451612903
        },
        {
          "interval_start": "2025-04-05T12:30:00+05:30",
          "interval_end": "2025-04-05T12:45:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        },
        {
          "interval_start": "2025-04-05T12:45:00+05:30",
          "interval_end": "2025-04-05T13:00:00+05:30",
          "count": 0,
          "total_games": 32,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T13:00:00+05:30",
          "interval_end": "2025-04-05T13:15:00+05:30",
          "count": 1,
          "total_games": 33,
          "percentage": 3.0303030303030303
        },
        {
          "interval_start": "2025-04-05T13:15:00+05:30",
          "interval_end": "2025-04-05T13:30:00+05:30",
          "count": 0,
          "total_games": 35,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T13:30:00+05:30",
          "interval_end": "2025-04-05T13:45:00+05:30",
          "count": 2,
          "total_games": 25,
          "percentage": 8.0
        },
        {
          "interval_start": "2025-04-05T13:45:00+05:30",
          "interval_end": "2025-04-05T14:00:00+05:30",
          "count": 1,
          "total_games": 33,
          "percentage": 3.0303030303030303
        },
        {
          "interval_start": "2025-04-05T14:00:00+05:30",
          "interval_end": "2025-04-05T14:15:00+05:30",
          "count": 0,
          "total_games": 30,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T14:15:00+05:30",
          "interval_end": "2025-04-05T14:30:00+05:30",
          "count": 0,
          "total_games": 34,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T14:30:00+05:30",
          "interval_end": "2025-04-05T14:45:00+05:30",
          "count": 3,
          "total_games": 33,
          "percentage": 9.090909090909092
        },
        {
          "interval_start": "2025-04-05T14:45:00+05:30",
          "interval_end": "2025-04-05T15:00:00+05:30",
          "count": 3,
          "total_games": 31,
          "percentage": 9.67741935483871
        },
        {
          "interval_start": "2025-04-05T15:00:00+05:30",
          "interval_end": "2025-04-05T15:15:00+05:30",
          "count": 3,
          "total_games": 23,
          "percentage": 13.043478260869565
        },
        {
          "interval_start": "2025-04-05T15:15:00+05:30",
          "interval_end": "2025-04-05T15:30:00+05:30",
          "count": 1,
          "total_games": 37,
          "percentage": 2.7027027027027026
        },
        {
          "interval_start": "2025-04-05T15:30:00+05:30",
          "interval_end": "2025-04-05T15:45:00+05:30",
          "count": 1,
          "total_games": 31,
          "percentage": 3.225806451612903
        },
        {
          "interval_start": "2025-04-05T15:45:00+05:30",
          "interval_end": "2025-04-05T16:00:00+05:30",
          "count": 1,
          "total_games": 29,
          "percentage": 3.4482758620689653
        },
        {
          "interval_start": "2025-04-05T16:00:00+05:30",
          "interval_end": "2025-04-05T16:15:00+05:30",
          "count": 2,
          "total_games": 29,
          "percentage": 6.896551724137931
        },
        {
          "interval_start": "2025-04-05T16:15:00+05:30",
          "interval_end": "2025-04-05T16:30:00+05:30",
          "count": 1,
          "total_games": 36,
          "percentage": 2.7777777777777777
        },
        {
          "interval_start": "2025-04-05T16:30:00+05:30",
          "interval_end": "2025-04-05T16:45:00+05:30",
          "count": 2,
          "total_games": 23,
          "percentage": 8.695652173913043
        },
        {
          "interval_start": "2025-04-05T16:45:00+05:30",
          "interval_end": "2025-04-05T17:00:00+05:30",
          "count": 1,
          "total_games": 27,
          "percentage": 3.7037037037037033
        },
        {
          "interval_start": "2025-04-05T17:00:00+05:30",
          "interval_end": "2025-04-05T17:15:00+05:30",
          "count": 1,
          "total_games": 31,
          "percentage": 3.225806451612903
        },
        {
          "interval_start": "2025-04-05T17:15:00+05:30",
          "interval_end": "2025-04-05T17:30:00+05:30",
          "count": 0,
          "total_games": 33,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T17:30:00+05:30",
          "interval_end": "2025-04-05T17:45:00+05:30",
          "count": 1,
          "total_games": 31,
          "percentage": 3.225806451612903
        },
        {
          "interval_start": "2025-04-05T17:45:00+05:30",
          "interval_end": "2025-04-05T18:00:00+05:30",
          "count": 1,
          "total_games": 33,
          "percentage": 3.0303030303030303
        },
        {
          "interval_start": "2025-04-05T18:00:00+05:30",
          "interval_end": "2025-04-05T18:15:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        },
        {
          "interval_start": "2025-04-05T18:15:00+05:30",
          "interval_end": "2025-04-05T18:30:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        },
        {
          "interval_start": "2025-04-05T18:30:00+05:30",
          "interval_end": "2025-04-05T18:45:00+05:30",
          "count": 0,
          "total_games": 36,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T18:45:00+05:30",
          "interval_end": "2025-04-05T19:00:00+05:30",
          "count": 1,
          "total_games": 33,
          "percentage": 3.0303030303030303
        },
        {
          "interval_start": "2025-04-05T19:00:00+05:30",
          "interval_end": "2025-04-05T19:15:00+05:30",
          "count": 0,
          "total_games": 33,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T19:15:00+05:30",
          "interval_end": "2025-04-05T19:30:00+05:30",
          "count": 1,
          "total_games": 37,
          "percentage": 2.7027027027027026
        },
        {
          "interval_start": "2025-04-05T19:30:00+05:30",
          "interval_end": "2025-04-05T19:45:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        },
        {
          "interval_start": "2025-04-05T19:45:00+05:30",
          "interval_end": "2025-04-05T20:00:00+05:30",
          "count": 0,
          "total_games": 31,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T20:00:00+05:30",
          "interval_end": "2025-04-05T20:15:00+05:30",
          "count": 0,
          "total_games": 32,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T20:15:00+05:30",
          "interval_end": "2025-04-05T20:30:00+05:30",
          "count": 0,
          "total_games": 37,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T20:30:00+05:30",
          "interval_end": "2025-04-05T20:45:00+05:30",
          "count": 1,
          "total_games": 33,
          "percentage": 3.0303030303030303
        },
        {
          "interval_start": "2025-04-05T20:45:00+05:30",
          "interval_end": "2025-04-05T21:00:00+05:30",
          "count": 1,
          "total_games": 30,
          "percentage": 3.3333333333333335
        },
        {
          "interval_start": "2025-04-05T21:00:00+05:30",
          "interval_end": "2025-04-05T21:15:00+05:30",
          "count": 3,
          "total_games": 32,
          "percentage": 9.375
        },
        {
          "interval_start": "2025-04-05T21:15:00+05:30",
          "interval_end": "2025-04-05T21:30:00+05:30",
          "count": 2,
          "total_games": 33,
          "percentage": 6.0606060606060606
        },
        {
          "interval_start": "2025-04-05T21:30:00+05:30",
          "interval_end": "2025-04-05T21:45:00+05:30",
          "count": 1,
          "total_games": 36,
          "percentage": 2.7777777777777777
        },
        {
          "interval_start": "2025-04-05T21:45:00+05:30",
          "interval_end": "2025-04-05T22:00:00+05:30",
          "count": 2,
          "total_games": 34,
          "percentage": 5.88235294117647
        },
        {
          "interval_start": "2025-04-05T22:00:00+05:30",
          "interval_end": "2025-04-05T22:15:00+05:30",
          "count": 4,
          "total_games": 25,
          "percentage": 16.0
        },
        {
          "interval_start": "2025-04-05T22:15:00+05:30",
          "interval_end": "2025-04-05T22:30:00+05:30",
          "count": 1,
          "total_games": 32,
          "percentage": 3.125
        },
        {
          "interval_start": "2025-04-05T22:30:00+05:30",
          "interval_end": "2025-04-05T22:45:00+05:30",
          "count": 0,
          "total_games": 34,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-04-05T22:45:00+05:30",
          "interval_end": "2025-04-05T23:00:00+05:30",
          "count": 3,
          "total_games": 24,
          "percentage": 12.5
        },
        {
          "interval_start": "2025-04-05T23:00:00+05:30",
          "interval_end": "2025-04-05T23:15:00+05:30",
          "count": 3,
          "total_games": 28,
          "percentage": 10.714285714285714
        },
        {
          "interval_start": "2025-04-05T23:15:00+05:30",
          "interval_end": "2025-04-05T23:30:00+05:30",
          "count": 0,
          "total_games": 32,
          "percentage": 0.0
        }
      ]
    }
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 42051  100 41967  100    84  32197     64  0:00:01  0:00:01 --:--:-- 32272
{
  "status": "success",
  "data": {
    "values": [
      2.0,
      5.0,
      10.0,
      20.0
    ],
    "games_per_set": 20,
    "total_games": 1000,
    "intervals_by_value": {
      "2.0": [
        {
          "set_id": 0,
          "start_time": "2025-04-05T23:26:51.499000+05:30",
          "end_time": "2025-04-05T23:28:42.860000+05:30",
          "start_game": 8011801,
          "end_game": 8011820,
          "count": 3,
          "total_games": 5,
          "percentage": 60.0
        },
        {
          "set_id": 1,
          "start_time": "2025-04-05T23:18:40.593000+05:30",
          "end_time": "2025-04-05T23:26:19.156000+05:30",
          "start_game": 8011781,
          "end_game": 8011800,
          "count": 10,
          "total_games": 20,
          "percentage": 50.0
        },
        {
          "set_id": 2,
          "start_time": "2025-04-05T23:07:29.679000+05:30",
          "end_time": "2025-04-05T23:17:48.738000+05:30",
          "start_game": 8011761,
          "end_game": 8011780,
          "count": 14,
          "total_games": 20,
          "percentage": 70.0
        },
        {
          "set_id": 3,
          "start_time": "2025-04-05T22:57:28.414000+05:30",
          "end_time": "2025-04-05T23:06:15.769000+05:30",
          "start_game": 8011741,
          "end_game": 8011760,
          "count": 9,
          "total_games": 20,
          "percentage": 45.0
        },
        {
          "set_id": 4,
          "start_time": "2025-04-05T22:44:52.810000+05:30",
          "end_time": "2025-04-05T22:57:04.005000+05:30",
          "start_game": 8011721,
          "end_game": 8011740,
          "count": 11,
          "total_games": 20,
          "percentage": 55.00000000000001
        },
        {
          "set_id": 5,
          "start_time": "2025-04-05T22:35:40.272000+05:30",
          "end_time": "2025-04-05T22:44:34.789000+05:30",
          "start_game": 8011701,
          "end_game": 8011720,
          "count": 10,
          "total_games": 20,
          "percentage": 50.0
        },
        {
          "set_id": 6,
          "start_time": "2025-04-05T22:27:34.888000+05:30",
          "end_time": "2025-04-05T22:35:26.306000+05:30",
          "start_game": 8011681,
          "end_game": 8011700,
          "count": 8,
          "total_games": 20,
          "percentage": 40.0
        },
        {
          "set_id": 7,
          "start_time": "2025-04-05T22:17:07.918000+05:30",
          "end_time": "2025-04-05T22:27:12.868000+05:30",
          "start_game": 8011661,
          "end_game": 8011680,
          "count": 12,
          "total_games": 20,
          "percentage": 60.0
        },
        {
          "set_id": 8,
          "start_time": "2025-04-05T22:05:01.783000+05:30",
          "end_time": "2025-04-05T22:16:49.382000+05:30",
          "start_game": 8011641,
          "end_game": 8011660,
          "count": 10,
          "total_games": 20,
          "percentage": 50.0
        },
        {
          "set_id": 9,
          "start_time": "2025-04-05T21:56:39.665000+05:30",
          "end_time": "2025-04-05T22:04:30.288000+05:30",
          "start_game": 8011621,
          "end_game": 8011640,
          "count": 11,
          "total_games": 20,
          "percentage": 55.00000000000001
        },
        {
          "set_id": 10,
          "start_time": "2025-04-05T21:48:00.702000+05:30",
          "end_time": "2025-04-05T21:56:09.808000+05:30",
          "start_game": 8011601,
          "end_game": 8011620,
          "count": 9,
          "total_games": 20,
          "percentage": 45.0
        },
        {
          "set_id": 11,
          "start_time": "2025-04-05T21:40:07.180000+05:30",
          "end_time": "2025-04-05T21:46:30.841000+05:30",
          "start_game": 8011581,
          "end_game": 8011600,
          "count": 5,
          "total_games": 20,
          "percentage": 25.0
        },
        {
          "set_id": 12,
          "start_time": "2025-04-05T21:30:48.305000+05:30",
          "end_time": "2025-04-05T21:39:52.664000+05:30",
          "start_game": 8011561,
          "end_game": 8011580,
          "count": 10,
          "total_games": 20,
          "percentage": 50.0
        },
        {
          "set_id": 13,
          "start_time": "2025-04-05T21:21:13.587000+05:30",
          "end_time": "2025-04-05T21:29:58.919000+05:30",
          "start_game": 8011541,
          "end_game": 8011560,
          "count": 10,
          "total_games": 20,
          "percentage": 50.0
        },
        {
          "set_id": 14,
          "start_time": "2025-04-05T21:12:11.323000+05:30",
          "end_time": "2025-04-05T21:20:03.223000+05:30",
          "start_game": 8011521,
          "end_game": 8011540,
          "count": 8,
          "total_games": 20,
          "percentage": 40.0
        },
        {
          "set_id": 15,
          "start_time": "2025-04-05T21:02:02.773000+05:30",
          "end_time": "2025-04-05T21:11:46.181000+05:30",
          "start_game": 8011501,
          "end_game": 8011520,
          "count": 10,
          "total_games": 20,
          "percentage": 50.0
        },
        {
          "set_id": 16,
          "start_time": "2025-04-05T20:53:49.006000+05:30",
          "end_time": "2025-04-05T21:01:32.956000+05:30",
          "start_game": 8011481,
          "end_game": 8011500,
          "count": 9,
          "total_games": 20,
          "percentage": 45.0
        },
        {
          "set_id": 17,
          "start_time": "2025-04-05T20:43:19.276000+05:30",
          "end_time": "2025-04-05T20:52:54.714000+05:30",
          "start_game": 8011461,
          "end_game": 8011480,
          "count": 12,
          "total_games": 20,
          "percentage": 60.0
        },
        {
          "set_id": 18,
          "start_time": "2025-04-05T20:34:20.146000+05:30",
          "end_time": "2025-04-05T20:42:17.283000+05:30",
          "start_game": 8011441,
          "end_game": 8011460,
          "count": 11,
          "total_games": 20,
          "percentage": 55.00000000000001
        },
        {
          "set_id": 19,
          "start_time": "2025-04-05T20:25:17.835000+05:30",
          "end_time": "2025-04-05T20:33:26.253000+05:30",
          "start_game": 8011421,
          "end_game": 8011440,
          "count": 7,
          "total_games": 20,
          "percentage": 35.0
        },
        {
          "set_id": 20,
          "start_time": "2025-04-05T20:17:07.834000+05:30",
          "end_time": "2025-04-05T20:24:56.976000+05:30",
          "start_game": 8011401,
          "end_game": 8011420,
          "count": 9,
          "total_games": 20,
          "percentage": 45.0
        },
        {
          "set_id": 21,
          "start_time": "2025-04-05T20:08:44.781000+05:30",
          "end_time": "2025-04-05T20:16:46.643000+05:30",
          "start_game": 8011381,
          "end_game": 8011400,
          "count": 10,
          "total_games": 20,
          "percentage": 50.0
        },
        {
          "set_id": 22,
          "start_time": "2025-04-05T19:59:17.371000+05:30",
          "end_time": "2025-04-05T20:08:10.374000+05:30",
          "start_game": 8011361,
          "end_game": 8011380,
          "count": 10,
          "total_games": 20,
          "percentage": 50.0
        },
        {
          "set_id": 23,
          "start_time": "2025-04-05T19:48:29.406000+05:30",
          "end_time": "2025-04-05T19:58:58.809000+05:30",
          "start_game": 8011341,
          "end_game": 8011360,
          "count": 13,
          "total_games": 20,
          "percentage": 65.0
        },
        {
          "set_id": 24,
          "start_time": "2025-04-05T19:38:22.837000+05:30",
          "end_time": "2025-04-05T19:48:03.549000+05:30",
          "start_game": 8011321,
          "end_game": 8011340,
          "count": 12,
          "total_games": 20,
          "percentage": 60.0
        },
        {
          "set_id": 25,
          "start_time": "2025-04-05T19:30:09.628000+05:30",
          "end_time": "2025-04-05T19:37:51.828000+05:30",
          "start_game": 8011301,
          "end_game": 8011320,
          "count": 7,
          "total_games": 20,
          "percentage": 35.0
        },
        {
          "set_id": 26,
          "start_time": "2025-04-05T19:21:57.482000+05:30",
          "end_time": "2025-04-05T19:29:55.194000+05:30",
          "start_game": 8011281,
          "end_game": 8011300,
          "count": 8,
          "total_games": 20,
          "percentage": 40.0
        },
        {
          "set_id": 27,
          "start_time": "2025-04-05T19:13:24.268000+05:30",
          "end_time": "2025-04-05T19:21:41.417000+05:30",
          "start_game": 8011261,
          "end_game": 8011280,
          "count": 9,
          "total_games": 20,
          "percentage": 45.0
        },
        {
          "set_id": 28,
          "start_time": "2025-04-05T19:05:24.316000+05:30",
          "end_time": "2025-04-05T19:13:09.969000+05:30",
          "start_game": 8011241,
          "end_game": 8011260,
          "count": 7,
          "total_games": 20,
          "percentage": 35.0
        },
        {
          "set_id": 29,
          "start_time": "2025-04-05T18:55:26.803000+05:30",
          "end_time": "2025-04-05T19:05:04.054000+05:30",
          "start_game": 8011221,
          "end_game": 8011240,
          "count": 10,
          "total_games": 20,
          "percentage": 50.0
        },
        {
          "set_id": 30,
          "start_time": "2025-04-05T18:46:01.418000+05:30",
          "end_time": "2025-04-05T18:55:04.797000+05:30",
          "start_game": 8011201,
          "end_game": 8011220,
          "count": 12,
          "total_games": 20,
          "percentage": 60.0
        },
        {
          "set_id": 31,
          "start_time": "2025-04-05T18:37:57.289000+05:30",
          "end_time": "2025-04-05T18:45:42.536000+05:30",
          "start_game": 8011181,
          "end_game": 8011200,
          "count": 9,
          "total_games": 20,
          "percentage": 45.0
        },
        {
          "set_id": 32,
          "start_time": "2025-04-05T18:29:58.380000+05:30",
          "end_time": "2025-04-05T18:37:20.644000+05:30",
          "start_game": 8011161,
          "end_game": 8011180,
          "count": 9,
          "total_games": 20,
          "percentage": 45.0
        },
        {
          "set_id": 33,
          "start_time": "2025-04-05T18:21:29.626000+05:30",
          "end_time": "2025-04-05T18:29:36.723000+05:30",
          "start_game": 8011141,
          "end_game": 8011160,
          "count": 10,
          "total_games": 20,
          "percentage": 50.0
        },
        {
          "set_id": 34,
          "start_time": "2025-04-05T18:11:22.516000+05:30",
          "end_time": "2025-04-05T18:20:52.491000+05:30",
          "start_game": 8011121,
          "end_game": 8011140,
          "count": 11,
          "total_games": 20,
          "percentage": 55.00000000000001
        },
        {
          "set_id": 35,
          "start_time": "2025-04-05T18:02:40.977000+05:30",
          "end_time": "2025-04-05T18:11:09.200000+05:30",
          "start_game": 8011101,
          "end_game": 8011120,
          "count": 11,
          "total_games": 20,
          "percentage": 55.00000000000001
        },
        {
          "set_id": 36,
          "start_time": "2025-04-05T17:51:48.150000+05:30",
          "end_time": "2025-04-05T18:01:22.006000+05:30",
          "start_game": 8011081,
          "end_game": 8011100,
          "count": 12,
          "total_games": 20,
          "percentage": 60.0
        },
        {
          "set_id": 37,
          "start_time": "2025-04-05T17:43:47.959000+05:30",
          "end_time": "2025-04-05T17:51:28.706000+05:30",
          "start_game": 8011061,
          "end_game": 8011080,
          "count": 9,
          "total_games": 20,
          "percentage": 45.0
        },
        {
          "set_id": 38,
          "start_time": "2025-04-05T17:33:05.645000+05:30",
          "end_time": "2025-04-05T17:43:23.543000+05:30",
          "start_game": 8011041,
          "end_game": 8011060,
          "count": 13,
          "total_games": 20,
          "percentage": 65.0
        },
        {
          "set_id": 39,
          "start_time": "2025-04-05T17:24:15.866000+05:30",
          "end_time": "2025-04-05T17:32:39.622000+05:30",
          "start_game": 8011021,
          "end_game": 8011040,
          "count": 8,
          "total_games": 20,
          "percentage": 40.0
        },
        {
          "set_id": 40,
          "start_time": "2025-04-05T17:15:14.260000+05:30",
          "end_time": "2025-04-05T17:23:59.884000+05:30",
          "start_game": 8011001,
          "end_game": 8011020,
          "count": 11,
          "total_games": 20,
          "percentage": 55.00000000000001
        },
        {
          "set_id": 41,
          "start_time": "2025-04-05T17:06:08.546000+05:30",
          "end_time": "2025-04-05T17:14:39.780000+05:30",
          "start_game": 8010981,
          "end_game": 8011000,
          "count": 7,
          "total_games": 20,
          "percentage": 35.0
        },
        {
          "set_id": 42,
          "start_time": "2025-04-05T16:55:02.653000+05:30",
          "end_time": "2025-04-05T17:05:41.355000+05:30",
          "start_game": 8010961,
          "end_game": 8010980,
          "count": 13,
          "total_games": 20,
          "percentage": 65.0
        },
        {
          "set_id": 43,
          "start_time": "2025-04-05T16:44:29.219000+05:30",
          "end_time": "2025-04-05T16:54:24.958000+05:30",
          "start_game": 8010941,
          "end_game": 8010960,
          "count": 13,
          "total_games": 20,
          "percentage": 65.0
        },
        {
          "set_id": 44,
          "start_time": "2025-04-05T16:30:37.477000+05:30",
          "end_time": "2025-04-05T16:43:33.015000+05:30",
          "start_game": 8010921,
          "end_game": 8010940,
          "count": 14,
          "total_games": 20,
          "percentage": 70.0
        },
        {
          "set_id": 45,
          "start_time": "2025-04-05T16:21:24.243000+05:30",
          "end_time": "2025-04-05T16:30:17.161000+05:30",
          "start_game": 8010901,
          "end_game": 8010920,
          "count": 9,
          "total_games": 20,
          "percentage": 45.0
        },
        {
          "set_id": 46,
          "start_time": "2025-04-05T16:13:23.932000+05:30",
          "end_time": "2025-04-05T16:21:06.519000+05:30",
          "start_game": 8010881,
          "end_game": 8010900,
          "count": 7,
          "total_games": 20,
          "percentage": 35.0
        },
        {
          "set_id": 47,
          "start_time": "2025-04-05T16:02:12.413000+05:30",
          "end_time": "2025-04-05T16:13:06.256000+05:30",
          "start_game": 8010861,
          "end_game": 8010880,
          "count": 10,
          "total_games": 20,
          "percentage": 50.0
        },
        {
          "set_id": 48,
          "start_time": "2025-04-05T15:52:09.043000+05:30",
          "end_time": "2025-04-05T16:01:45.514000+05:30",
          "start_game": 8010841,
          "end_game": 8010860,
          "count": 10,
          "total_games": 20,
          "percentage": 50.0
        },
        {
          "set_id": 49,
          "start_time": "2025-04-05T15:42:46.280000+05:30",
          "end_time": "2025-04-05T15:51:51.681000+05:30",
          "start_game": 8010821,
          "end_game": 8010840,
          "count": 13,
          "total_games": 20,
          "percentage": 65.0
        }
      ],
      "5.0": [
        {
          "set_id": 0,
          "start_time": "2025-04-05T23:26:51.499000+05:30",
          "end_time": "2025-04-05T23:28:42.860000+05:30",
          "start_game": 8011801,
          "end_game": 8011820,
          "count": 1,
          "total_games": 5,
          "percentage": 20.0
        },
        {
          "set_id": 1,
          "start_time": "2025-04-05T23:18:40.593000+05:30",
          "end_time": "2025-04-05T23:26:19.156000+05:30",
          "start_game": 8011781,
          "end_game": 8011800,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 2,
          "start_time": "2025-04-05T23:07:29.679000+05:30",
          "end_time": "2025-04-05T23:17:48.738000+05:30",
          "start_game": 8011761,
          "end_game": 8011780,
          "count": 6,
          "total_games": 20,
          "percentage": 30.0
        },
        {
          "set_id": 3,
          "start_time": "2025-04-05T22:57:28.414000+05:30",
          "end_time": "2025-04-05T23:06:15.769000+05:30",
          "start_game": 8011741,
          "end_game": 8011760,
          "count": 5,
          "total_games": 20,
          "percentage": 25.0
        },
        {
          "set_id": 4,
          "start_time": "2025-04-05T22:44:52.810000+05:30",
          "end_time": "2025-04-05T22:57:04.005000+05:30",
          "start_game": 8011721,
          "end_game": 8011740,
          "count": 7,
          "total_games": 20,
          "percentage": 35.0
        },
        {
          "set_id": 5,
          "start_time": "2025-04-05T22:35:40.272000+05:30",
          "end_time": "2025-04-05T22:44:34.789000+05:30",
          "start_game": 8011701,
          "end_game": 8011720,
          "count": 4,
          "total_games": 20,
          "percentage": 20.0
        },
        {
          "set_id": 6,
          "start_time": "2025-04-05T22:27:34.888000+05:30",
          "end_time": "2025-04-05T22:35:26.306000+05:30",
          "start_game": 8011681,
          "end_game": 8011700,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 7,
          "start_time": "2025-04-05T22:17:07.918000+05:30",
          "end_time": "2025-04-05T22:27:12.868000+05:30",
          "start_game": 8011661,
          "end_game": 8011680,
          "count": 5,
          "total_games": 20,
          "percentage": 25.0
        },
        {
          "set_id": 8,
          "start_time": "2025-04-05T22:05:01.783000+05:30",
          "end_time": "2025-04-05T22:16:49.382000+05:30",
          "start_game": 8011641,
          "end_game": 8011660,
          "count": 5,
          "total_games": 20,
          "percentage": 25.0
        },
        {
          "set_id": 9,
          "start_time": "2025-04-05T21:56:39.665000+05:30",
          "end_time": "2025-04-05T22:04:30.288000+05:30",
          "start_game": 8011621,
          "end_game": 8011640,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 10,
          "start_time": "2025-04-05T21:48:00.702000+05:30",
          "end_time": "2025-04-05T21:56:09.808000+05:30",
          "start_game": 8011601,
          "end_game": 8011620,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 11,
          "start_time": "2025-04-05T21:40:07.180000+05:30",
          "end_time": "2025-04-05T21:46:30.841000+05:30",
          "start_game": 8011581,
          "end_game": 8011600,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 12,
          "start_time": "2025-04-05T21:30:48.305000+05:30",
          "end_time": "2025-04-05T21:39:52.664000+05:30",
          "start_game": 8011561,
          "end_game": 8011580,
          "count": 5,
          "total_games": 20,
          "percentage": 25.0
        },
        {
          "set_id": 13,
          "start_time": "2025-04-05T21:21:13.587000+05:30",
          "end_time": "2025-04-05T21:29:58.919000+05:30",
          "start_game": 8011541,
          "end_game": 8011560,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 14,
          "start_time": "2025-04-05T21:12:11.323000+05:30",
          "end_time": "2025-04-05T21:20:03.223000+05:30",
          "start_game": 8011521,
          "end_game": 8011540,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 15,
          "start_time": "2025-04-05T21:02:02.773000+05:30",
          "end_time": "2025-04-05T21:11:46.181000+05:30",
          "start_game": 8011501,
          "end_game": 8011520,
          "count": 6,
          "total_games": 20,
          "percentage": 30.0
        },
        {
          "set_id": 16,
          "start_time": "2025-04-05T20:53:49.006000+05:30",
          "end_time": "2025-04-05T21:01:32.956000+05:30",
          "start_game": 8011481,
          "end_game": 8011500,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 17,
          "start_time": "2025-04-05T20:43:19.276000+05:30",
          "end_time": "2025-04-05T20:52:54.714000+05:30",
          "start_game": 8011461,
          "end_game": 8011480,
          "count": 6,
          "total_games": 20,
          "percentage": 30.0
        },
        {
          "set_id": 18,
          "start_time": "2025-04-05T20:34:20.146000+05:30",
          "end_time": "2025-04-05T20:42:17.283000+05:30",
          "start_game": 8011441,
          "end_game": 8011460,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 19,
          "start_time": "2025-04-05T20:25:17.835000+05:30",
          "end_time": "2025-04-05T20:33:26.253000+05:30",
          "start_game": 8011421,
          "end_game": 8011440,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 20,
          "start_time": "2025-04-05T20:17:07.834000+05:30",
          "end_time": "2025-04-05T20:24:56.976000+05:30",
          "start_game": 8011401,
          "end_game": 8011420,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 21,
          "start_time": "2025-04-05T20:08:44.781000+05:30",
          "end_time": "2025-04-05T20:16:46.643000+05:30",
          "start_game": 8011381,
          "end_game": 8011400,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 22,
          "start_time": "2025-04-05T19:59:17.371000+05:30",
          "end_time": "2025-04-05T20:08:10.374000+05:30",
          "start_game": 8011361,
          "end_game": 8011380,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 23,
          "start_time": "2025-04-05T19:48:29.406000+05:30",
          "end_time": "2025-04-05T19:58:58.809000+05:30",
          "start_game": 8011341,
          "end_game": 8011360,
          "count": 4,
          "total_games": 20,
          "percentage": 20.0
        },
        {
          "set_id": 24,
          "start_time": "2025-04-05T19:38:22.837000+05:30",
          "end_time": "2025-04-05T19:48:03.549000+05:30",
          "start_game": 8011321,
          "end_game": 8011340,
          "count": 6,
          "total_games": 20,
          "percentage": 30.0
        },
        {
          "set_id": 25,
          "start_time": "2025-04-05T19:30:09.628000+05:30",
          "end_time": "2025-04-05T19:37:51.828000+05:30",
          "start_game": 8011301,
          "end_game": 8011320,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 26,
          "start_time": "2025-04-05T19:21:57.482000+05:30",
          "end_time": "2025-04-05T19:29:55.194000+05:30",
          "start_game": 8011281,
          "end_game": 8011300,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 27,
          "start_time": "2025-04-05T19:13:24.268000+05:30",
          "end_time": "2025-04-05T19:21:41.417000+05:30",
          "start_game": 8011261,
          "end_game": 8011280,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 28,
          "start_time": "2025-04-05T19:05:24.316000+05:30",
          "end_time": "2025-04-05T19:13:09.969000+05:30",
          "start_game": 8011241,
          "end_game": 8011260,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 29,
          "start_time": "2025-04-05T18:55:26.803000+05:30",
          "end_time": "2025-04-05T19:05:04.054000+05:30",
          "start_game": 8011221,
          "end_game": 8011240,
          "count": 5,
          "total_games": 20,
          "percentage": 25.0
        },
        {
          "set_id": 30,
          "start_time": "2025-04-05T18:46:01.418000+05:30",
          "end_time": "2025-04-05T18:55:04.797000+05:30",
          "start_game": 8011201,
          "end_game": 8011220,
          "count": 4,
          "total_games": 20,
          "percentage": 20.0
        },
        {
          "set_id": 31,
          "start_time": "2025-04-05T18:37:57.289000+05:30",
          "end_time": "2025-04-05T18:45:42.536000+05:30",
          "start_game": 8011181,
          "end_game": 8011200,
          "count": 4,
          "total_games": 20,
          "percentage": 20.0
        },
        {
          "set_id": 32,
          "start_time": "2025-04-05T18:29:58.380000+05:30",
          "end_time": "2025-04-05T18:37:20.644000+05:30",
          "start_game": 8011161,
          "end_game": 8011180,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 33,
          "start_time": "2025-04-05T18:21:29.626000+05:30",
          "end_time": "2025-04-05T18:29:36.723000+05:30",
          "start_game": 8011141,
          "end_game": 8011160,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 34,
          "start_time": "2025-04-05T18:11:22.516000+05:30",
          "end_time": "2025-04-05T18:20:52.491000+05:30",
          "start_game": 8011121,
          "end_game": 8011140,
          "count": 5,
          "total_games": 20,
          "percentage": 25.0
        },
        {
          "set_id": 35,
          "start_time": "2025-04-05T18:02:40.977000+05:30",
          "end_time": "2025-04-05T18:11:09.200000+05:30",
          "start_game": 8011101,
          "end_game": 8011120,
          "count": 4,
          "total_games": 20,
          "percentage": 20.0
        },
        {
          "set_id": 36,
          "start_time": "2025-04-05T17:51:48.150000+05:30",
          "end_time": "2025-04-05T18:01:22.006000+05:30",
          "start_game": 8011081,
          "end_game": 8011100,
          "count": 5,
          "total_games": 20,
          "percentage": 25.0
        },
        {
          "set_id": 37,
          "start_time": "2025-04-05T17:43:47.959000+05:30",
          "end_time": "2025-04-05T17:51:28.706000+05:30",
          "start_game": 8011061,
          "end_game": 8011080,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 38,
          "start_time": "2025-04-05T17:33:05.645000+05:30",
          "end_time": "2025-04-05T17:43:23.543000+05:30",
          "start_game": 8011041,
          "end_game": 8011060,
          "count": 7,
          "total_games": 20,
          "percentage": 35.0
        },
        {
          "set_id": 39,
          "start_time": "2025-04-05T17:24:15.866000+05:30",
          "end_time": "2025-04-05T17:32:39.622000+05:30",
          "start_game": 8011021,
          "end_game": 8011040,
          "count": 5,
          "total_games": 20,
          "percentage": 25.0
        },
        {
          "set_id": 40,
          "start_time": "2025-04-05T17:15:14.260000+05:30",
          "end_time": "2025-04-05T17:23:59.884000+05:30",
          "start_game": 8011001,
          "end_game": 8011020,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 41,
          "start_time": "2025-04-05T17:06:08.546000+05:30",
          "end_time": "2025-04-05T17:14:39.780000+05:30",
          "start_game": 8010981,
          "end_game": 8011000,
          "count": 5,
          "total_games": 20,
          "percentage": 25.0
        },
        {
          "set_id": 42,
          "start_time": "2025-04-05T16:55:02.653000+05:30",
          "end_time": "2025-04-05T17:05:41.355000+05:30",
          "start_game": 8010961,
          "end_game": 8010980,
          "count": 8,
          "total_games": 20,
          "percentage": 40.0
        },
        {
          "set_id": 43,
          "start_time": "2025-04-05T16:44:29.219000+05:30",
          "end_time": "2025-04-05T16:54:24.958000+05:30",
          "start_game": 8010941,
          "end_game": 8010960,
          "count": 6,
          "total_games": 20,
          "percentage": 30.0
        },
        {
          "set_id": 44,
          "start_time": "2025-04-05T16:30:37.477000+05:30",
          "end_time": "2025-04-05T16:43:33.015000+05:30",
          "start_game": 8010921,
          "end_game": 8010940,
          "count": 7,
          "total_games": 20,
          "percentage": 35.0
        },
        {
          "set_id": 45,
          "start_time": "2025-04-05T16:21:24.243000+05:30",
          "end_time": "2025-04-05T16:30:17.161000+05:30",
          "start_game": 8010901,
          "end_game": 8010920,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 46,
          "start_time": "2025-04-05T16:13:23.932000+05:30",
          "end_time": "2025-04-05T16:21:06.519000+05:30",
          "start_game": 8010881,
          "end_game": 8010900,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 47,
          "start_time": "2025-04-05T16:02:12.413000+05:30",
          "end_time": "2025-04-05T16:13:06.256000+05:30",
          "start_game": 8010861,
          "end_game": 8010880,
          "count": 5,
          "total_games": 20,
          "percentage": 25.0
        },
        {
          "set_id": 48,
          "start_time": "2025-04-05T15:52:09.043000+05:30",
          "end_time": "2025-04-05T16:01:45.514000+05:30",
          "start_game": 8010841,
          "end_game": 8010860,
          "count": 4,
          "total_games": 20,
          "percentage": 20.0
        },
        {
          "set_id": 49,
          "start_time": "2025-04-05T15:42:46.280000+05:30",
          "end_time": "2025-04-05T15:51:51.681000+05:30",
          "start_game": 8010821,
          "end_game": 8010840,
          "count": 5,
          "total_games": 20,
          "percentage": 25.0
        }
      ],
      "10.0": [
        {
          "set_id": 0,
          "start_time": "2025-04-05T23:26:51.499000+05:30",
          "end_time": "2025-04-05T23:28:42.860000+05:30",
          "start_game": 8011801,
          "end_game": 8011820,
          "count": 0,
          "total_games": 5,
          "percentage": 0.0
        },
        {
          "set_id": 1,
          "start_time": "2025-04-05T23:18:40.593000+05:30",
          "end_time": "2025-04-05T23:26:19.156000+05:30",
          "start_game": 8011781,
          "end_game": 8011800,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 2,
          "start_time": "2025-04-05T23:07:29.679000+05:30",
          "end_time": "2025-04-05T23:17:48.738000+05:30",
          "start_game": 8011761,
          "end_game": 8011780,
          "count": 4,
          "total_games": 20,
          "percentage": 20.0
        },
        {
          "set_id": 3,
          "start_time": "2025-04-05T22:57:28.414000+05:30",
          "end_time": "2025-04-05T23:06:15.769000+05:30",
          "start_game": 8011741,
          "end_game": 8011760,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 4,
          "start_time": "2025-04-05T22:44:52.810000+05:30",
          "end_time": "2025-04-05T22:57:04.005000+05:30",
          "start_game": 8011721,
          "end_game": 8011740,
          "count": 4,
          "total_games": 20,
          "percentage": 20.0
        },
        {
          "set_id": 5,
          "start_time": "2025-04-05T22:35:40.272000+05:30",
          "end_time": "2025-04-05T22:44:34.789000+05:30",
          "start_game": 8011701,
          "end_game": 8011720,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 6,
          "start_time": "2025-04-05T22:27:34.888000+05:30",
          "end_time": "2025-04-05T22:35:26.306000+05:30",
          "start_game": 8011681,
          "end_game": 8011700,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 7,
          "start_time": "2025-04-05T22:17:07.918000+05:30",
          "end_time": "2025-04-05T22:27:12.868000+05:30",
          "start_game": 8011661,
          "end_game": 8011680,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 8,
          "start_time": "2025-04-05T22:05:01.783000+05:30",
          "end_time": "2025-04-05T22:16:49.382000+05:30",
          "start_game": 8011641,
          "end_game": 8011660,
          "count": 4,
          "total_games": 20,
          "percentage": 20.0
        },
        {
          "set_id": 9,
          "start_time": "2025-04-05T21:56:39.665000+05:30",
          "end_time": "2025-04-05T22:04:30.288000+05:30",
          "start_game": 8011621,
          "end_game": 8011640,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 10,
          "start_time": "2025-04-05T21:48:00.702000+05:30",
          "end_time": "2025-04-05T21:56:09.808000+05:30",
          "start_game": 8011601,
          "end_game": 8011620,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 11,
          "start_time": "2025-04-05T21:40:07.180000+05:30",
          "end_time": "2025-04-05T21:46:30.841000+05:30",
          "start_game": 8011581,
          "end_game": 8011600,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 12,
          "start_time": "2025-04-05T21:30:48.305000+05:30",
          "end_time": "2025-04-05T21:39:52.664000+05:30",
          "start_game": 8011561,
          "end_game": 8011580,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 13,
          "start_time": "2025-04-05T21:21:13.587000+05:30",
          "end_time": "2025-04-05T21:29:58.919000+05:30",
          "start_game": 8011541,
          "end_game": 8011560,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 14,
          "start_time": "2025-04-05T21:12:11.323000+05:30",
          "end_time": "2025-04-05T21:20:03.223000+05:30",
          "start_game": 8011521,
          "end_game": 8011540,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 15,
          "start_time": "2025-04-05T21:02:02.773000+05:30",
          "end_time": "2025-04-05T21:11:46.181000+05:30",
          "start_game": 8011501,
          "end_game": 8011520,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 16,
          "start_time": "2025-04-05T20:53:49.006000+05:30",
          "end_time": "2025-04-05T21:01:32.956000+05:30",
          "start_game": 8011481,
          "end_game": 8011500,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 17,
          "start_time": "2025-04-05T20:43:19.276000+05:30",
          "end_time": "2025-04-05T20:52:54.714000+05:30",
          "start_game": 8011461,
          "end_game": 8011480,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 18,
          "start_time": "2025-04-05T20:34:20.146000+05:30",
          "end_time": "2025-04-05T20:42:17.283000+05:30",
          "start_game": 8011441,
          "end_game": 8011460,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 19,
          "start_time": "2025-04-05T20:25:17.835000+05:30",
          "end_time": "2025-04-05T20:33:26.253000+05:30",
          "start_game": 8011421,
          "end_game": 8011440,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 20,
          "start_time": "2025-04-05T20:17:07.834000+05:30",
          "end_time": "2025-04-05T20:24:56.976000+05:30",
          "start_game": 8011401,
          "end_game": 8011420,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 21,
          "start_time": "2025-04-05T20:08:44.781000+05:30",
          "end_time": "2025-04-05T20:16:46.643000+05:30",
          "start_game": 8011381,
          "end_game": 8011400,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 22,
          "start_time": "2025-04-05T19:59:17.371000+05:30",
          "end_time": "2025-04-05T20:08:10.374000+05:30",
          "start_game": 8011361,
          "end_game": 8011380,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 23,
          "start_time": "2025-04-05T19:48:29.406000+05:30",
          "end_time": "2025-04-05T19:58:58.809000+05:30",
          "start_game": 8011341,
          "end_game": 8011360,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 24,
          "start_time": "2025-04-05T19:38:22.837000+05:30",
          "end_time": "2025-04-05T19:48:03.549000+05:30",
          "start_game": 8011321,
          "end_game": 8011340,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 25,
          "start_time": "2025-04-05T19:30:09.628000+05:30",
          "end_time": "2025-04-05T19:37:51.828000+05:30",
          "start_game": 8011301,
          "end_game": 8011320,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 26,
          "start_time": "2025-04-05T19:21:57.482000+05:30",
          "end_time": "2025-04-05T19:29:55.194000+05:30",
          "start_game": 8011281,
          "end_game": 8011300,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 27,
          "start_time": "2025-04-05T19:13:24.268000+05:30",
          "end_time": "2025-04-05T19:21:41.417000+05:30",
          "start_game": 8011261,
          "end_game": 8011280,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 28,
          "start_time": "2025-04-05T19:05:24.316000+05:30",
          "end_time": "2025-04-05T19:13:09.969000+05:30",
          "start_game": 8011241,
          "end_game": 8011260,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 29,
          "start_time": "2025-04-05T18:55:26.803000+05:30",
          "end_time": "2025-04-05T19:05:04.054000+05:30",
          "start_game": 8011221,
          "end_game": 8011240,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 30,
          "start_time": "2025-04-05T18:46:01.418000+05:30",
          "end_time": "2025-04-05T18:55:04.797000+05:30",
          "start_game": 8011201,
          "end_game": 8011220,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 31,
          "start_time": "2025-04-05T18:37:57.289000+05:30",
          "end_time": "2025-04-05T18:45:42.536000+05:30",
          "start_game": 8011181,
          "end_game": 8011200,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 32,
          "start_time": "2025-04-05T18:29:58.380000+05:30",
          "end_time": "2025-04-05T18:37:20.644000+05:30",
          "start_game": 8011161,
          "end_game": 8011180,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 33,
          "start_time": "2025-04-05T18:21:29.626000+05:30",
          "end_time": "2025-04-05T18:29:36.723000+05:30",
          "start_game": 8011141,
          "end_game": 8011160,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 34,
          "start_time": "2025-04-05T18:11:22.516000+05:30",
          "end_time": "2025-04-05T18:20:52.491000+05:30",
          "start_game": 8011121,
          "end_game": 8011140,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 35,
          "start_time": "2025-04-05T18:02:40.977000+05:30",
          "end_time": "2025-04-05T18:11:09.200000+05:30",
          "start_game": 8011101,
          "end_game": 8011120,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 36,
          "start_time": "2025-04-05T17:51:48.150000+05:30",
          "end_time": "2025-04-05T18:01:22.006000+05:30",
          "start_game": 8011081,
          "end_game": 8011100,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 37,
          "start_time": "2025-04-05T17:43:47.959000+05:30",
          "end_time": "2025-04-05T17:51:28.706000+05:30",
          "start_game": 8011061,
          "end_game": 8011080,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 38,
          "start_time": "2025-04-05T17:33:05.645000+05:30",
          "end_time": "2025-04-05T17:43:23.543000+05:30",
          "start_game": 8011041,
          "end_game": 8011060,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 39,
          "start_time": "2025-04-05T17:24:15.866000+05:30",
          "end_time": "2025-04-05T17:32:39.622000+05:30",
          "start_game": 8011021,
          "end_game": 8011040,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 40,
          "start_time": "2025-04-05T17:15:14.260000+05:30",
          "end_time": "2025-04-05T17:23:59.884000+05:30",
          "start_game": 8011001,
          "end_game": 8011020,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 41,
          "start_time": "2025-04-05T17:06:08.546000+05:30",
          "end_time": "2025-04-05T17:14:39.780000+05:30",
          "start_game": 8010981,
          "end_game": 8011000,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 42,
          "start_time": "2025-04-05T16:55:02.653000+05:30",
          "end_time": "2025-04-05T17:05:41.355000+05:30",
          "start_game": 8010961,
          "end_game": 8010980,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 43,
          "start_time": "2025-04-05T16:44:29.219000+05:30",
          "end_time": "2025-04-05T16:54:24.958000+05:30",
          "start_game": 8010941,
          "end_game": 8010960,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 44,
          "start_time": "2025-04-05T16:30:37.477000+05:30",
          "end_time": "2025-04-05T16:43:33.015000+05:30",
          "start_game": 8010921,
          "end_game": 8010940,
          "count": 5,
          "total_games": 20,
          "percentage": 25.0
        },
        {
          "set_id": 45,
          "start_time": "2025-04-05T16:21:24.243000+05:30",
          "end_time": "2025-04-05T16:30:17.161000+05:30",
          "start_game": 8010901,
          "end_game": 8010920,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 46,
          "start_time": "2025-04-05T16:13:23.932000+05:30",
          "end_time": "2025-04-05T16:21:06.519000+05:30",
          "start_game": 8010881,
          "end_game": 8010900,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 47,
          "start_time": "2025-04-05T16:02:12.413000+05:30",
          "end_time": "2025-04-05T16:13:06.256000+05:30",
          "start_game": 8010861,
          "end_game": 8010880,
          "count": 4,
          "total_games": 20,
          "percentage": 20.0
        },
        {
          "set_id": 48,
          "start_time": "2025-04-05T15:52:09.043000+05:30",
          "end_time": "2025-04-05T16:01:45.514000+05:30",
          "start_game": 8010841,
          "end_game": 8010860,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 49,
          "start_time": "2025-04-05T15:42:46.280000+05:30",
          "end_time": "2025-04-05T15:51:51.681000+05:30",
          "start_game": 8010821,
          "end_game": 8010840,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        }
      ],
      "20.0": [
        {
          "set_id": 0,
          "start_time": "2025-04-05T23:26:51.499000+05:30",
          "end_time": "2025-04-05T23:28:42.860000+05:30",
          "start_game": 8011801,
          "end_game": 8011820,
          "count": 0,
          "total_games": 5,
          "percentage": 0.0
        },
        {
          "set_id": 1,
          "start_time": "2025-04-05T23:18:40.593000+05:30",
          "end_time": "2025-04-05T23:26:19.156000+05:30",
          "start_game": 8011781,
          "end_game": 8011800,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 2,
          "start_time": "2025-04-05T23:07:29.679000+05:30",
          "end_time": "2025-04-05T23:17:48.738000+05:30",
          "start_game": 8011761,
          "end_game": 8011780,
          "count": 3,
          "total_games": 20,
          "percentage": 15.0
        },
        {
          "set_id": 3,
          "start_time": "2025-04-05T22:57:28.414000+05:30",
          "end_time": "2025-04-05T23:06:15.769000+05:30",
          "start_game": 8011741,
          "end_game": 8011760,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 4,
          "start_time": "2025-04-05T22:44:52.810000+05:30",
          "end_time": "2025-04-05T22:57:04.005000+05:30",
          "start_game": 8011721,
          "end_game": 8011740,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 5,
          "start_time": "2025-04-05T22:35:40.272000+05:30",
          "end_time": "2025-04-05T22:44:34.789000+05:30",
          "start_game": 8011701,
          "end_game": 8011720,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 6,
          "start_time": "2025-04-05T22:27:34.888000+05:30",
          "end_time": "2025-04-05T22:35:26.306000+05:30",
          "start_game": 8011681,
          "end_game": 8011700,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 7,
          "start_time": "2025-04-05T22:17:07.918000+05:30",
          "end_time": "2025-04-05T22:27:12.868000+05:30",
          "start_game": 8011661,
          "end_game": 8011680,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 8,
          "start_time": "2025-04-05T22:05:01.783000+05:30",
          "end_time": "2025-04-05T22:16:49.382000+05:30",
          "start_game": 8011641,
          "end_game": 8011660,
          "count": 4,
          "total_games": 20,
          "percentage": 20.0
        },
        {
          "set_id": 9,
          "start_time": "2025-04-05T21:56:39.665000+05:30",
          "end_time": "2025-04-05T22:04:30.288000+05:30",
          "start_game": 8011621,
          "end_game": 8011640,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 10,
          "start_time": "2025-04-05T21:48:00.702000+05:30",
          "end_time": "2025-04-05T21:56:09.808000+05:30",
          "start_game": 8011601,
          "end_game": 8011620,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 11,
          "start_time": "2025-04-05T21:40:07.180000+05:30",
          "end_time": "2025-04-05T21:46:30.841000+05:30",
          "start_game": 8011581,
          "end_game": 8011600,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 12,
          "start_time": "2025-04-05T21:30:48.305000+05:30",
          "end_time": "2025-04-05T21:39:52.664000+05:30",
          "start_game": 8011561,
          "end_game": 8011580,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 13,
          "start_time": "2025-04-05T21:21:13.587000+05:30",
          "end_time": "2025-04-05T21:29:58.919000+05:30",
          "start_game": 8011541,
          "end_game": 8011560,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 14,
          "start_time": "2025-04-05T21:12:11.323000+05:30",
          "end_time": "2025-04-05T21:20:03.223000+05:30",
          "start_game": 8011521,
          "end_game": 8011540,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 15,
          "start_time": "2025-04-05T21:02:02.773000+05:30",
          "end_time": "2025-04-05T21:11:46.181000+05:30",
          "start_game": 8011501,
          "end_game": 8011520,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 16,
          "start_time": "2025-04-05T20:53:49.006000+05:30",
          "end_time": "2025-04-05T21:01:32.956000+05:30",
          "start_game": 8011481,
          "end_game": 8011500,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 17,
          "start_time": "2025-04-05T20:43:19.276000+05:30",
          "end_time": "2025-04-05T20:52:54.714000+05:30",
          "start_game": 8011461,
          "end_game": 8011480,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 18,
          "start_time": "2025-04-05T20:34:20.146000+05:30",
          "end_time": "2025-04-05T20:42:17.283000+05:30",
          "start_game": 8011441,
          "end_game": 8011460,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 19,
          "start_time": "2025-04-05T20:25:17.835000+05:30",
          "end_time": "2025-04-05T20:33:26.253000+05:30",
          "start_game": 8011421,
          "end_game": 8011440,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 20,
          "start_time": "2025-04-05T20:17:07.834000+05:30",
          "end_time": "2025-04-05T20:24:56.976000+05:30",
          "start_game": 8011401,
          "end_game": 8011420,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 21,
          "start_time": "2025-04-05T20:08:44.781000+05:30",
          "end_time": "2025-04-05T20:16:46.643000+05:30",
          "start_game": 8011381,
          "end_game": 8011400,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 22,
          "start_time": "2025-04-05T19:59:17.371000+05:30",
          "end_time": "2025-04-05T20:08:10.374000+05:30",
          "start_game": 8011361,
          "end_game": 8011380,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 23,
          "start_time": "2025-04-05T19:48:29.406000+05:30",
          "end_time": "2025-04-05T19:58:58.809000+05:30",
          "start_game": 8011341,
          "end_game": 8011360,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 24,
          "start_time": "2025-04-05T19:38:22.837000+05:30",
          "end_time": "2025-04-05T19:48:03.549000+05:30",
          "start_game": 8011321,
          "end_game": 8011340,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 25,
          "start_time": "2025-04-05T19:30:09.628000+05:30",
          "end_time": "2025-04-05T19:37:51.828000+05:30",
          "start_game": 8011301,
          "end_game": 8011320,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 26,
          "start_time": "2025-04-05T19:21:57.482000+05:30",
          "end_time": "2025-04-05T19:29:55.194000+05:30",
          "start_game": 8011281,
          "end_game": 8011300,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 27,
          "start_time": "2025-04-05T19:13:24.268000+05:30",
          "end_time": "2025-04-05T19:21:41.417000+05:30",
          "start_game": 8011261,
          "end_game": 8011280,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 28,
          "start_time": "2025-04-05T19:05:24.316000+05:30",
          "end_time": "2025-04-05T19:13:09.969000+05:30",
          "start_game": 8011241,
          "end_game": 8011260,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 29,
          "start_time": "2025-04-05T18:55:26.803000+05:30",
          "end_time": "2025-04-05T19:05:04.054000+05:30",
          "start_game": 8011221,
          "end_game": 8011240,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 30,
          "start_time": "2025-04-05T18:46:01.418000+05:30",
          "end_time": "2025-04-05T18:55:04.797000+05:30",
          "start_game": 8011201,
          "end_game": 8011220,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 31,
          "start_time": "2025-04-05T18:37:57.289000+05:30",
          "end_time": "2025-04-05T18:45:42.536000+05:30",
          "start_game": 8011181,
          "end_game": 8011200,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 32,
          "start_time": "2025-04-05T18:29:58.380000+05:30",
          "end_time": "2025-04-05T18:37:20.644000+05:30",
          "start_game": 8011161,
          "end_game": 8011180,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 33,
          "start_time": "2025-04-05T18:21:29.626000+05:30",
          "end_time": "2025-04-05T18:29:36.723000+05:30",
          "start_game": 8011141,
          "end_game": 8011160,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 34,
          "start_time": "2025-04-05T18:11:22.516000+05:30",
          "end_time": "2025-04-05T18:20:52.491000+05:30",
          "start_game": 8011121,
          "end_game": 8011140,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 35,
          "start_time": "2025-04-05T18:02:40.977000+05:30",
          "end_time": "2025-04-05T18:11:09.200000+05:30",
          "start_game": 8011101,
          "end_game": 8011120,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 36,
          "start_time": "2025-04-05T17:51:48.150000+05:30",
          "end_time": "2025-04-05T18:01:22.006000+05:30",
          "start_game": 8011081,
          "end_game": 8011100,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 37,
          "start_time": "2025-04-05T17:43:47.959000+05:30",
          "end_time": "2025-04-05T17:51:28.706000+05:30",
          "start_game": 8011061,
          "end_game": 8011080,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 38,
          "start_time": "2025-04-05T17:33:05.645000+05:30",
          "end_time": "2025-04-05T17:43:23.543000+05:30",
          "start_game": 8011041,
          "end_game": 8011060,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 39,
          "start_time": "2025-04-05T17:24:15.866000+05:30",
          "end_time": "2025-04-05T17:32:39.622000+05:30",
          "start_game": 8011021,
          "end_game": 8011040,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 40,
          "start_time": "2025-04-05T17:15:14.260000+05:30",
          "end_time": "2025-04-05T17:23:59.884000+05:30",
          "start_game": 8011001,
          "end_game": 8011020,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 41,
          "start_time": "2025-04-05T17:06:08.546000+05:30",
          "end_time": "2025-04-05T17:14:39.780000+05:30",
          "start_game": 8010981,
          "end_game": 8011000,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 42,
          "start_time": "2025-04-05T16:55:02.653000+05:30",
          "end_time": "2025-04-05T17:05:41.355000+05:30",
          "start_game": 8010961,
          "end_game": 8010980,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 43,
          "start_time": "2025-04-05T16:44:29.219000+05:30",
          "end_time": "2025-04-05T16:54:24.958000+05:30",
          "start_game": 8010941,
          "end_game": 8010960,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 44,
          "start_time": "2025-04-05T16:30:37.477000+05:30",
          "end_time": "2025-04-05T16:43:33.015000+05:30",
          "start_game": 8010921,
          "end_game": 8010940,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 45,
          "start_time": "2025-04-05T16:21:24.243000+05:30",
          "end_time": "2025-04-05T16:30:17.161000+05:30",
          "start_game": 8010901,
          "end_game": 8010920,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 46,
          "start_time": "2025-04-05T16:13:23.932000+05:30",
          "end_time": "2025-04-05T16:21:06.519000+05:30",
          "start_game": 8010881,
          "end_game": 8010900,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        },
        {
          "set_id": 47,
          "start_time": "2025-04-05T16:02:12.413000+05:30",
          "end_time": "2025-04-05T16:13:06.256000+05:30",
          "start_game": 8010861,
          "end_game": 8010880,
          "count": 2,
          "total_games": 20,
          "percentage": 10.0
        },
        {
          "set_id": 48,
          "start_time": "2025-04-05T15:52:09.043000+05:30",
          "end_time": "2025-04-05T16:01:45.514000+05:30",
          "start_game": 8010841,
          "end_game": 8010860,
          "count": 1,
          "total_games": 20,
          "percentage": 5.0
        },
        {
          "set_id": 49,
          "start_time": "2025-04-05T15:42:46.280000+05:30",
          "end_time": "2025-04-05T15:51:51.681000+05:30",
          "start_game": 8010821,
          "end_game": 8010840,
          "count": 0,
          "total_games": 20,
          "percentage": 0.0
        }
      ]
    }
  }
}
```
