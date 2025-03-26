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
100 22603  100 22603    0     0   4334      0  0:00:05  0:00:05 --:--:--  5642
{
  "status": "success",
  "data": {
    "min_value": 10.0,
    "interval_minutes": 10,
    "hours": 24,
    "count": 145,
    "intervals": [
      {
        "interval_start": "2025-03-25T17:20:00+05:30",
        "interval_end": "2025-03-25T17:30:00+05:30",
        "count": 3,
        "total_games": 19,
        "percentage": 15.789473684210526
      },
      {
        "interval_start": "2025-03-25T17:30:00+05:30",
        "interval_end": "2025-03-25T17:40:00+05:30",
        "count": 0,
        "total_games": 25,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-03-25T17:40:00+05:30",
        "interval_end": "2025-03-25T17:50:00+05:30",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "interval_start": "2025-03-25T17:50:00+05:30",
        "interval_end": "2025-03-25T18:00:00+05:30",
        "count": 2,
        "total_games": 16,
        "percentage": 12.5
      },
      {
        "interval_start": "2025-03-25T18:00:00+05:30",
        "interval_end": "2025-03-25T18:10:00+05:30",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "interval_start": "2025-03-25T18:10:00+05:30",
        "interval_end": "2025-03-25T18:20:00+05:30",
        "count": 4,
        "total_games": 19,
        "percentage": 21.052631578947366
      },
      {
        "interval_start": "2025-03-25T18:20:00+05:30",
        "interval_end": "2025-03-25T18:30:00+05:30",
        "count": 3,
        "total_games": 24,
        "percentage": 12.5
      },
      {
        "interval_start": "2025-03-25T18:30:00+05:30",
        "interval_end": "2025-03-25T18:40:00+05:30",
        "count": 0,
        "total_games": 22,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-03-25T18:40:00+05:30",
        "interval_end": "2025-03-25T18:50:00+05:30",
        "count": 5,
        "total_games": 23,
        "percentage": 21.73913043478261
      },
      {
        "interval_start": "2025-03-25T18:50:00+05:30",
        "interval_end": "2025-03-25T19:00:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-03-25T19:00:00+05:30",
        "interval_end": "2025-03-25T19:10:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-03-25T19:10:00+05:30",
        "interval_end": "2025-03-25T19:20:00+05:30",
        "count": 1,
        "total_games": 25,
        "percentage": 4.0
      },
      {
        "interval_start": "2025-03-25T19:20:00+05:30",
        "interval_end": "2025-03-25T19:30:00+05:30",
        "count": 4,
        "total_games": 18,
        "percentage": 22.22222222222222
      },
      {
        "interval_start": "2025-03-25T19:30:00+05:30",
        "interval_end": "2025-03-25T19:40:00+05:30",
        "count": 2,
        "total_games": 24,
        "percentage": 8.333333333333332
      },
      {
        "interval_start": "2025-03-25T19:40:00+05:30",
        "interval_end": "2025-03-25T19:50:00+05:30",
        "count": 3,
        "total_games": 22,
        "percentage": 13.636363636363635
      },
      {
        "interval_start": "2025-03-25T19:50:00+05:30",
        "interval_end": "2025-03-25T20:00:00+05:30",
        "count": 2,
        "total_games": 24,
        "percentage": 8.333333333333332
      },
      {
        "interval_start": "2025-03-25T20:00:00+05:30",
        "interval_end": "2025-03-25T20:10:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-03-25T20:10:00+05:30",
        "interval_end": "2025-03-25T20:20:00+05:30",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "interval_start": "2025-03-25T20:20:00+05:30",
        "interval_end": "2025-03-25T20:30:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-03-25T20:30:00+05:30",
        "interval_end": "2025-03-25T20:40:00+05:30",
        "count": 2,
        "total_games": 22,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-03-25T20:40:00+05:30",
        "interval_end": "2025-03-25T20:50:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-03-25T20:50:00+05:30",
        "interval_end": "2025-03-25T21:00:00+05:30",
        "count": 2,
        "total_games": 25,
        "percentage": 8.0
      },
      {
        "interval_start": "2025-03-25T21:00:00+05:30",
        "interval_end": "2025-03-25T21:10:00+05:30",
        "count": 1,
        "total_games": 23,
        "percentage": 4.3478260869565215
      },
      {
        "interval_start": "2025-03-25T21:10:00+05:30",
        "interval_end": "2025-03-25T21:20:00+05:30",
        "count": 3,
        "total_games": 21,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-03-25T21:20:00+05:30",
        "interval_end": "2025-03-25T21:30:00+05:30",
        "count": 3,
        "total_games": 24,
        "percentage": 12.5
      },
      {
        "interval_start": "2025-03-25T21:30:00+05:30",
        "interval_end": "2025-03-25T21:40:00+05:30",
        "count": 1,
        "total_games": 22,
        "percentage": 4.545454545454546
      },
      {
        "interval_start": "2025-03-25T21:40:00+05:30",
        "interval_end": "2025-03-25T21:50:00+05:30",
        "count": 4,
        "total_games": 20,
        "percentage": 20.0
      },
      {
        "interval_start": "2025-03-25T21:50:00+05:30",
        "interval_end": "2025-03-25T22:00:00+05:30",
        "count": 4,
        "total_games": 16,
        "percentage": 25.0
      },
      {
        "interval_start": "2025-03-25T22:00:00+05:30",
        "interval_end": "2025-03-25T22:10:00+05:30",
        "count": 1,
        "total_games": 24,
        "percentage": 4.166666666666666
      },
      {
        "interval_start": "2025-03-25T22:10:00+05:30",
        "interval_end": "2025-03-25T22:20:00+05:30",
        "count": 2,
        "total_games": 22,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-03-25T22:20:00+05:30",
        "interval_end": "2025-03-25T22:30:00+05:30",
        "count": 0,
        "total_games": 23,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-03-25T22:30:00+05:30",
        "interval_end": "2025-03-25T22:40:00+05:30",
        "count": 3,
        "total_games": 15,
        "percentage": 20.0
      },
      {
        "interval_start": "2025-03-25T22:40:00+05:30",
        "interval_end": "2025-03-25T22:50:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-03-25T22:50:00+05:30",
        "interval_end": "2025-03-25T23:00:00+05:30",
        "count": 3,
        "total_games": 17,
        "percentage": 17.647058823529413
      },
      {
        "interval_start": "2025-03-25T23:00:00+05:30",
        "interval_end": "2025-03-25T23:10:00+05:30",
        "count": 2,
        "total_games": 22,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-03-25T23:10:00+05:30",
        "interval_end": "2025-03-25T23:20:00+05:30",
        "count": 1,
        "total_games": 26,
        "percentage": 3.8461538461538463
      },
      {
        "interval_start": "2025-03-25T23:20:00+05:30",
        "interval_end": "2025-03-25T23:30:00+05:30",
        "count": 2,
        "total_games": 22,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-03-25T23:30:00+05:30",
        "interval_end": "2025-03-25T23:40:00+05:30",
        "count": 0,
        "total_games": 22,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-03-25T23:40:00+05:30",
        "interval_end": "2025-03-25T23:50:00+05:30",
        "count": 3,
        "total_games": 19,
        "percentage": 15.789473684210526
      },
      {
        "interval_start": "2025-03-25T23:50:00+05:30",
        "interval_end": "2025-03-26T00:00:00+05:30",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "interval_start": "2025-03-26T00:00:00+05:30",
        "interval_end": "2025-03-26T00:10:00+05:30",
        "count": 3,
        "total_games": 18,
        "percentage": 16.666666666666664
      },
      {
        "interval_start": "2025-03-26T00:10:00+05:30",
        "interval_end": "2025-03-26T00:20:00+05:30",
        "count": 5,
        "total_games": 18,
        "percentage": 27.77777777777778
      },
      {
        "interval_start": "2025-03-26T00:20:00+05:30",
        "interval_end": "2025-03-26T00:30:00+05:30",
        "count": 3,
        "total_games": 21,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-03-26T00:30:00+05:30",
        "interval_end": "2025-03-26T00:40:00+05:30",
        "count": 3,
        "total_games": 19,
        "percentage": 15.789473684210526
      },
      {
        "interval_start": "2025-03-26T00:40:00+05:30",
        "interval_end": "2025-03-26T00:50:00+05:30",
        "count": 2,
        "total_games": 22,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-03-26T00:50:00+05:30",
        "interval_end": "2025-03-26T01:00:00+05:30",
        "count": 1,
        "total_games": 24,
        "percentage": 4.166666666666666
      },
      {
        "interval_start": "2025-03-26T01:00:00+05:30",
        "interval_end": "2025-03-26T01:10:00+05:30",
        "count": 3,
        "total_games": 21,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-03-26T01:10:00+05:30",
        "interval_end": "2025-03-26T01:20:00+05:30",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-03-26T01:20:00+05:30",
        "interval_end": "2025-03-26T01:30:00+05:30",
        "count": 3,
        "total_games": 21,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-03-26T01:30:00+05:30",
        "interval_end": "2025-03-26T01:40:00+05:30",
        "count": 1,
        "total_games": 23,
        "percentage": 4.3478260869565215
      },
      {
        "interval_start": "2025-03-26T01:40:00+05:30",
        "interval_end": "2025-03-26T01:50:00+05:30",
        "count": 1,
        "total_games": 21,
        "percentage": 4.761904761904762
      },
      {
        "interval_start": "2025-03-26T01:50:00+05:30",
        "interval_end": "2025-03-26T02:00:00+05:30",
        "count": 1,
        "total_games": 21,
        "percentage": 4.761904761904762
      },
      {
        "interval_start": "2025-03-26T02:00:00+05:30",
        "interval_end": "2025-03-26T02:10:00+05:30",
        "count": 4,
        "total_games": 17,
        "percentage": 23.52941176470588
      },
      {
        "interval_start": "2025-03-26T02:10:00+05:30",
        "interval_end": "2025-03-26T02:20:00+05:30",
        "count": 0,
        "total_games": 22,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-03-26T02:20:00+05:30",
        "interval_end": "2025-03-26T02:30:00+05:30",
        "count": 4,
        "total_games": 18,
        "percentage": 22.22222222222222
      },
      {
        "interval_start": "2025-03-26T02:30:00+05:30",
        "interval_end": "2025-03-26T02:40:00+05:30",
        "count": 0,
        "total_games": 24,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-03-26T02:40:00+05:30",
        "interval_end": "2025-03-26T02:50:00+05:30",
        "count": 4,
        "total_games": 21,
        "percentage": 19.047619047619047
      },
      {
        "interval_start": "2025-03-26T02:50:00+05:30",
        "interval_end": "2025-03-26T03:00:00+05:30",
        "count": 3,
        "total_games": 22,
        "percentage": 13.636363636363635
      },
      {
        "interval_start": "2025-03-26T03:00:00+05:30",
        "interval_end": "2025-03-26T03:10:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-03-26T03:10:00+05:30",
        "interval_end": "2025-03-26T03:20:00+05:30",
        "count": 1,
        "total_games": 21,
        "percentage": 4.761904761904762
      },
      {
        "interval_start": "2025-03-26T03:20:00+05:30",
        "interval_end": "2025-03-26T03:30:00+05:30",
        "count": 4,
        "total_games": 16,
        "percentage": 25.0
      },
      {
        "interval_start": "2025-03-26T03:30:00+05:30",
        "interval_end": "2025-03-26T03:40:00+05:30",
        "count": 2,
        "total_games": 22,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-03-26T03:40:00+05:30",
        "interval_end": "2025-03-26T03:50:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-03-26T03:50:00+05:30",
        "interval_end": "2025-03-26T04:00:00+05:30",
        "count": 2,
        "total_games": 26,
        "percentage": 7.6923076923076925
      },
      {
        "interval_start": "2025-03-26T04:00:00+05:30",
        "interval_end": "2025-03-26T04:10:00+05:30",
        "count": 2,
        "total_games": 24,
        "percentage": 8.333333333333332
      },
      {
        "interval_start": "2025-03-26T04:10:00+05:30",
        "interval_end": "2025-03-26T04:20:00+05:30",
        "count": 3,
        "total_games": 18,
        "percentage": 16.666666666666664
      },
      {
        "interval_start": "2025-03-26T04:20:00+05:30",
        "interval_end": "2025-03-26T04:30:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-03-26T04:30:00+05:30",
        "interval_end": "2025-03-26T04:40:00+05:30",
        "count": 4,
        "total_games": 21,
        "percentage": 19.047619047619047
      },
      {
        "interval_start": "2025-03-26T04:40:00+05:30",
        "interval_end": "2025-03-26T04:50:00+05:30",
        "count": 3,
        "total_games": 21,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-03-26T04:50:00+05:30",
        "interval_end": "2025-03-26T05:00:00+05:30",
        "count": 1,
        "total_games": 24,
        "percentage": 4.166666666666666
      },
      {
        "interval_start": "2025-03-26T05:00:00+05:30",
        "interval_end": "2025-03-26T05:10:00+05:30",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-03-26T05:10:00+05:30",
        "interval_end": "2025-03-26T05:20:00+05:30",
        "count": 2,
        "total_games": 14,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-03-26T05:20:00+05:30",
        "interval_end": "2025-03-26T05:30:00+05:30",
        "count": 1,
        "total_games": 27,
        "percentage": 3.7037037037037033
      },
      {
        "interval_start": "2025-03-26T05:30:00+05:30",
        "interval_end": "2025-03-26T05:40:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-03-26T05:40:00+05:30",
        "interval_end": "2025-03-26T05:50:00+05:30",
        "count": 1,
        "total_games": 21,
        "percentage": 4.761904761904762
      },
      {
        "interval_start": "2025-03-26T05:50:00+05:30",
        "interval_end": "2025-03-26T06:00:00+05:30",
        "count": 1,
        "total_games": 19,
        "percentage": 5.263157894736842
      },
      {
        "interval_start": "2025-03-26T06:00:00+05:30",
        "interval_end": "2025-03-26T06:10:00+05:30",
        "count": 1,
        "total_games": 27,
        "percentage": 3.7037037037037033
      },
      {
        "interval_start": "2025-03-26T06:10:00+05:30",
        "interval_end": "2025-03-26T06:20:00+05:30",
        "count": 1,
        "total_games": 22,
        "percentage": 4.545454545454546
      },
      {
        "interval_start": "2025-03-26T06:20:00+05:30",
        "interval_end": "2025-03-26T06:30:00+05:30",
        "count": 4,
        "total_games": 15,
        "percentage": 26.666666666666668
      },
      {
        "interval_start": "2025-03-26T06:30:00+05:30",
        "interval_end": "2025-03-26T06:40:00+05:30",
        "count": 5,
        "total_games": 16,
        "percentage": 31.25
      },
      {
        "interval_start": "2025-03-26T06:40:00+05:30",
        "interval_end": "2025-03-26T06:50:00+05:30",
        "count": 2,
        "total_games": 22,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-03-26T06:50:00+05:30",
        "interval_end": "2025-03-26T07:00:00+05:30",
        "count": 1,
        "total_games": 22,
        "percentage": 4.545454545454546
      },
      {
        "interval_start": "2025-03-26T07:00:00+05:30",
        "interval_end": "2025-03-26T07:10:00+05:30",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-03-26T07:10:00+05:30",
        "interval_end": "2025-03-26T07:20:00+05:30",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0
      },
      {
        "interval_start": "2025-03-26T07:20:00+05:30",
        "interval_end": "2025-03-26T07:30:00+05:30",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-03-26T07:30:00+05:30",
        "interval_end": "2025-03-26T07:40:00+05:30",
        "count": 3,
        "total_games": 23,
        "percentage": 13.043478260869565
      },
      {
        "interval_start": "2025-03-26T07:40:00+05:30",
        "interval_end": "2025-03-26T07:50:00+05:30",
        "count": 2,
        "total_games": 24,
        "percentage": 8.333333333333332
      },
      {
        "interval_start": "2025-03-26T07:50:00+05:30",
        "interval_end": "2025-03-26T08:00:00+05:30",
        "count": 0,
        "total_games": 30,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-03-26T08:00:00+05:30",
        "interval_end": "2025-03-26T08:10:00+05:30",
        "count": 1,
        "total_games": 18,
        "percentage": 5.555555555555555
      },
      {
        "interval_start": "2025-03-26T08:10:00+05:30",
        "interval_end": "2025-03-26T08:20:00+05:30",
        "count": 1,
        "total_games": 23,
        "percentage": 4.3478260869565215
      },
      {
        "interval_start": "2025-03-26T08:20:00+05:30",
        "interval_end": "2025-03-26T08:30:00+05:30",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "interval_start": "2025-03-26T08:30:00+05:30",
        "interval_end": "2025-03-26T08:40:00+05:30",
        "count": 1,
        "total_games": 23,
        "percentage": 4.3478260869565215
      },
      {
        "interval_start": "2025-03-26T08:40:00+05:30",
        "interval_end": "2025-03-26T08:50:00+05:30",
        "count": 2,
        "total_games": 24,
        "percentage": 8.333333333333332
      },
      {
        "interval_start": "2025-03-26T08:50:00+05:30",
        "interval_end": "2025-03-26T09:00:00+05:30",
        "count": 2,
        "total_games": 22,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-03-26T09:00:00+05:30",
        "interval_end": "2025-03-26T09:10:00+05:30",
        "count": 1,
        "total_games": 24,
        "percentage": 4.166666666666666
      },
      {
        "interval_start": "2025-03-26T09:10:00+05:30",
        "interval_end": "2025-03-26T09:20:00+05:30",
        "count": 1,
        "total_games": 27,
        "percentage": 3.7037037037037033
      },
      {
        "interval_start": "2025-03-26T09:20:00+05:30",
        "interval_end": "2025-03-26T09:30:00+05:30",
        "count": 3,
        "total_games": 22,
        "percentage": 13.636363636363635
      },
      {
        "interval_start": "2025-03-26T09:30:00+05:30",
        "interval_end": "2025-03-26T09:40:00+05:30",
        "count": 3,
        "total_games": 22,
        "percentage": 13.636363636363635
      },
      {
        "interval_start": "2025-03-26T09:40:00+05:30",
        "interval_end": "2025-03-26T09:50:00+05:30",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-03-26T09:50:00+05:30",
        "interval_end": "2025-03-26T10:00:00+05:30",
        "count": 4,
        "total_games": 16,
        "percentage": 25.0
      },
      {
        "interval_start": "2025-03-26T10:00:00+05:30",
        "interval_end": "2025-03-26T10:10:00+05:30",
        "count": 1,
        "total_games": 21,
        "percentage": 4.761904761904762
      },
      {
        "interval_start": "2025-03-26T10:10:00+05:30",
        "interval_end": "2025-03-26T10:20:00+05:30",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0
      },
      {
        "interval_start": "2025-03-26T10:20:00+05:30",
        "interval_end": "2025-03-26T10:30:00+05:30",
        "count": 4,
        "total_games": 18,
        "percentage": 22.22222222222222
      },
      {
        "interval_start": "2025-03-26T10:30:00+05:30",
        "interval_end": "2025-03-26T10:40:00+05:30",
        "count": 0,
        "total_games": 25,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-03-26T10:40:00+05:30",
        "interval_end": "2025-03-26T10:50:00+05:30",
        "count": 1,
        "total_games": 25,
        "percentage": 4.0
      },
      {
        "interval_start": "2025-03-26T10:50:00+05:30",
        "interval_end": "2025-03-26T11:00:00+05:30",
        "count": 4,
        "total_games": 14,
        "percentage": 28.57142857142857
      },
      {
        "interval_start": "2025-03-26T11:00:00+05:30",
        "interval_end": "2025-03-26T11:10:00+05:30",
        "count": 1,
        "total_games": 21,
        "percentage": 4.761904761904762
      },
      {
        "interval_start": "2025-03-26T11:10:00+05:30",
        "interval_end": "2025-03-26T11:20:00+05:30",
        "count": 3,
        "total_games": 23,
        "percentage": 13.043478260869565
      },
      {
        "interval_start": "2025-03-26T11:20:00+05:30",
        "interval_end": "2025-03-26T11:30:00+05:30",
        "count": 1,
        "total_games": 19,
        "percentage": 5.263157894736842
      },
      {
        "interval_start": "2025-03-26T11:30:00+05:30",
        "interval_end": "2025-03-26T11:40:00+05:30",
        "count": 0,
        "total_games": 21,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-03-26T11:40:00+05:30",
        "interval_end": "2025-03-26T11:50:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-03-26T11:50:00+05:30",
        "interval_end": "2025-03-26T12:00:00+05:30",
        "count": 4,
        "total_games": 18,
        "percentage": 22.22222222222222
      },
      {
        "interval_start": "2025-03-26T12:00:00+05:30",
        "interval_end": "2025-03-26T12:10:00+05:30",
        "count": 2,
        "total_games": 19,
        "percentage": 10.526315789473683
      },
      {
        "interval_start": "2025-03-26T12:10:00+05:30",
        "interval_end": "2025-03-26T12:20:00+05:30",
        "count": 3,
        "total_games": 19,
        "percentage": 15.789473684210526
      },
      {
        "interval_start": "2025-03-26T12:20:00+05:30",
        "interval_end": "2025-03-26T12:30:00+05:30",
        "count": 5,
        "total_games": 19,
        "percentage": 26.31578947368421
      },
      {
        "interval_start": "2025-03-26T12:30:00+05:30",
        "interval_end": "2025-03-26T12:40:00+05:30",
        "count": 1,
        "total_games": 23,
        "percentage": 4.3478260869565215
      },
      {
        "interval_start": "2025-03-26T12:40:00+05:30",
        "interval_end": "2025-03-26T12:50:00+05:30",
        "count": 3,
        "total_games": 18,
        "percentage": 16.666666666666664
      },
      {
        "interval_start": "2025-03-26T12:50:00+05:30",
        "interval_end": "2025-03-26T13:00:00+05:30",
        "count": 3,
        "total_games": 18,
        "percentage": 16.666666666666664
      },
      {
        "interval_start": "2025-03-26T13:00:00+05:30",
        "interval_end": "2025-03-26T13:10:00+05:30",
        "count": 1,
        "total_games": 19,
        "percentage": 5.263157894736842
      },
      {
        "interval_start": "2025-03-26T13:10:00+05:30",
        "interval_end": "2025-03-26T13:20:00+05:30",
        "count": 3,
        "total_games": 18,
        "percentage": 16.666666666666664
      },
      {
        "interval_start": "2025-03-26T13:20:00+05:30",
        "interval_end": "2025-03-26T13:30:00+05:30",
        "count": 4,
        "total_games": 22,
        "percentage": 18.181818181818183
      },
      {
        "interval_start": "2025-03-26T13:30:00+05:30",
        "interval_end": "2025-03-26T13:40:00+05:30",
        "count": 3,
        "total_games": 18,
        "percentage": 16.666666666666664
      },
      {
        "interval_start": "2025-03-26T13:40:00+05:30",
        "interval_end": "2025-03-26T13:50:00+05:30",
        "count": 1,
        "total_games": 21,
        "percentage": 4.761904761904762
      },
      {
        "interval_start": "2025-03-26T13:50:00+05:30",
        "interval_end": "2025-03-26T14:00:00+05:30",
        "count": 2,
        "total_games": 21,
        "percentage": 9.523809523809524
      },
      {
        "interval_start": "2025-03-26T14:00:00+05:30",
        "interval_end": "2025-03-26T14:10:00+05:30",
        "count": 3,
        "total_games": 19,
        "percentage": 15.789473684210526
      },
      {
        "interval_start": "2025-03-26T14:10:00+05:30",
        "interval_end": "2025-03-26T14:20:00+05:30",
        "count": 2,
        "total_games": 18,
        "percentage": 11.11111111111111
      },
      {
        "interval_start": "2025-03-26T14:20:00+05:30",
        "interval_end": "2025-03-26T14:30:00+05:30",
        "count": 5,
        "total_games": 17,
        "percentage": 29.411764705882355
      },
      {
        "interval_start": "2025-03-26T14:30:00+05:30",
        "interval_end": "2025-03-26T14:40:00+05:30",
        "count": 2,
        "total_games": 18,
        "percentage": 11.11111111111111
      },
      {
        "interval_start": "2025-03-26T14:40:00+05:30",
        "interval_end": "2025-03-26T14:50:00+05:30",
        "count": 3,
        "total_games": 19,
        "percentage": 15.789473684210526
      },
      {
        "interval_start": "2025-03-26T14:50:00+05:30",
        "interval_end": "2025-03-26T15:00:00+05:30",
        "count": 1,
        "total_games": 24,
        "percentage": 4.166666666666666
      },
      {
        "interval_start": "2025-03-26T15:00:00+05:30",
        "interval_end": "2025-03-26T15:10:00+05:30",
        "count": 1,
        "total_games": 21,
        "percentage": 4.761904761904762
      },
      {
        "interval_start": "2025-03-26T15:10:00+05:30",
        "interval_end": "2025-03-26T15:20:00+05:30",
        "count": 1,
        "total_games": 21,
        "percentage": 4.761904761904762
      },
      {
        "interval_start": "2025-03-26T15:20:00+05:30",
        "interval_end": "2025-03-26T15:30:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-03-26T15:30:00+05:30",
        "interval_end": "2025-03-26T15:40:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-03-26T15:40:00+05:30",
        "interval_end": "2025-03-26T15:50:00+05:30",
        "count": 3,
        "total_games": 19,
        "percentage": 15.789473684210526
      },
      {
        "interval_start": "2025-03-26T15:50:00+05:30",
        "interval_end": "2025-03-26T16:00:00+05:30",
        "count": 1,
        "total_games": 22,
        "percentage": 4.545454545454546
      },
      {
        "interval_start": "2025-03-26T16:00:00+05:30",
        "interval_end": "2025-03-26T16:10:00+05:30",
        "count": 4,
        "total_games": 20,
        "percentage": 20.0
      },
      {
        "interval_start": "2025-03-26T16:10:00+05:30",
        "interval_end": "2025-03-26T16:20:00+05:30",
        "count": 2,
        "total_games": 23,
        "percentage": 8.695652173913043
      },
      {
        "interval_start": "2025-03-26T16:20:00+05:30",
        "interval_end": "2025-03-26T16:30:00+05:30",
        "count": 0,
        "total_games": 22,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-03-26T16:30:00+05:30",
        "interval_end": "2025-03-26T16:40:00+05:30",
        "count": 3,
        "total_games": 22,
        "percentage": 13.636363636363635
      },
      {
        "interval_start": "2025-03-26T16:40:00+05:30",
        "interval_end": "2025-03-26T16:50:00+05:30",
        "count": 4,
        "total_games": 19,
        "percentage": 21.052631578947366
      },
      {
        "interval_start": "2025-03-26T16:50:00+05:30",
        "interval_end": "2025-03-26T17:00:00+05:30",
        "count": 3,
        "total_games": 21,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-03-26T17:00:00+05:30",
        "interval_end": "2025-03-26T17:10:00+05:30",
        "count": 2,
        "total_games": 19,
        "percentage": 10.526315789473683
      },
      {
        "interval_start": "2025-03-26T17:10:00+05:30",
        "interval_end": "2025-03-26T17:20:00+05:30",
        "count": 3,
        "total_games": 19,
        "percentage": 15.789473684210526
      },
      {
        "interval_start": "2025-03-26T17:20:00+05:30",
        "interval_end": "2025-03-26T17:30:00+05:30",
        "count": 1,
        "total_games": 14,
        "percentage": 7.142857142857142
      }
    ]
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 30169  100 30169    0     0   5379      0  0:00:05  0:00:05 --:--:--  6862
{
  "status": "success",
  "data": {
    "min_value": 10.0,
    "interval_minutes": 15,
    "hours": 48,
    "count": 193,
    "intervals": [
      {
        "interval_start": "2025-03-24T17:15:00+05:30",
        "interval_end": "2025-03-24T17:30:00+05:30",
        "count": 3,
        "total_games": 36,
        "percentage": 8.333333333333332
      },
      {
        "interval_start": "2025-03-24T17:30:00+05:30",
        "interval_end": "2025-03-24T17:45:00+05:30",
        "count": 4,
        "total_games": 32,
        "percentage": 12.5
      },
      {
        "interval_start": "2025-03-24T17:45:00+05:30",
        "interval_end": "2025-03-24T18:00:00+05:30",
        "count": 3,
        "total_games": 29,
        "percentage": 10.344827586206897
      },
      {
        "interval_start": "2025-03-24T18:00:00+05:30",
        "interval_end": "2025-03-24T18:15:00+05:30",
        "count": 4,
        "total_games": 31,
        "percentage": 12.903225806451612
      },
      {
        "interval_start": "2025-03-24T18:15:00+05:30",
        "interval_end": "2025-03-24T18:30:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-03-24T18:30:00+05:30",
        "interval_end": "2025-03-24T18:45:00+05:30",
        "count": 2,
        "total_games": 35,
        "percentage": 5.714285714285714
      },
      {
        "interval_start": "2025-03-24T18:45:00+05:30",
        "interval_end": "2025-03-24T19:00:00+05:30",
        "count": 2,
        "total_games": 34,
        "percentage": 5.88235294117647
      },
      {
        "interval_start": "2025-03-24T19:00:00+05:30",
        "interval_end": "2025-03-24T19:15:00+05:30",
        "count": 2,
        "total_games": 33,
        "percentage": 6.0606060606060606
      },
      {
        "interval_start": "2025-03-24T19:15:00+05:30",
        "interval_end": "2025-03-24T19:30:00+05:30",
        "count": 6,
        "total_games": 29,
        "percentage": 20.689655172413794
      },
      {
        "interval_start": "2025-03-24T19:30:00+05:30",
        "interval_end": "2025-03-24T19:45:00+05:30",
        "count": 3,
        "total_games": 30,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-03-24T19:45:00+05:30",
        "interval_end": "2025-03-24T20:00:00+05:30",
        "count": 4,
        "total_games": 29,
        "percentage": 13.793103448275861
      },
      {
        "interval_start": "2025-03-24T20:00:00+05:30",
        "interval_end": "2025-03-24T20:15:00+05:30",
        "count": 1,
        "total_games": 35,
        "percentage": 2.857142857142857
      },
      {
        "interval_start": "2025-03-24T20:15:00+05:30",
        "interval_end": "2025-03-24T20:30:00+05:30",
        "count": 1,
        "total_games": 35,
        "percentage": 2.857142857142857
      },
      {
        "interval_start": "2025-03-24T20:30:00+05:30",
        "interval_end": "2025-03-24T20:45:00+05:30",
        "count": 1,
        "total_games": 37,
        "percentage": 2.7027027027027026
      },
      {
        "interval_start": "2025-03-24T20:45:00+05:30",
        "interval_end": "2025-03-24T21:00:00+05:30",
        "count": 4,
        "total_games": 29,
        "percentage": 13.793103448275861
      },
      {
        "interval_start": "2025-03-24T21:00:00+05:30",
        "interval_end": "2025-03-24T21:15:00+05:30",
        "count": 5,
        "total_games": 28,
        "percentage": 17.857142857142858
      },
      {
        "interval_start": "2025-03-24T21:15:00+05:30",
        "interval_end": "2025-03-24T21:30:00+05:30",
        "count": 1,
        "total_games": 33,
        "percentage": 3.0303030303030303
      },
      {
        "interval_start": "2025-03-24T21:30:00+05:30",
        "interval_end": "2025-03-24T21:45:00+05:30",
        "count": 1,
        "total_games": 37,
        "percentage": 2.7027027027027026
      },
      {
        "interval_start": "2025-03-24T21:45:00+05:30",
        "interval_end": "2025-03-24T22:00:00+05:30",
        "count": 1,
        "total_games": 34,
        "percentage": 2.941176470588235
      },
      {
        "interval_start": "2025-03-24T22:00:00+05:30",
        "interval_end": "2025-03-24T22:15:00+05:30",
        "count": 1,
        "total_games": 40,
        "percentage": 2.5
      },
      {
        "interval_start": "2025-03-24T22:15:00+05:30",
        "interval_end": "2025-03-24T22:30:00+05:30",
        "count": 2,
        "total_games": 34,
        "percentage": 5.88235294117647
      },
      {
        "interval_start": "2025-03-24T22:30:00+05:30",
        "interval_end": "2025-03-24T22:45:00+05:30",
        "count": 2,
        "total_games": 31,
        "percentage": 6.451612903225806
      },
      {
        "interval_start": "2025-03-24T22:45:00+05:30",
        "interval_end": "2025-03-24T23:00:00+05:30",
        "count": 2,
        "total_games": 36,
        "percentage": 5.555555555555555
      },
      {
        "interval_start": "2025-03-24T23:00:00+05:30",
        "interval_end": "2025-03-24T23:15:00+05:30",
        "count": 7,
        "total_games": 29,
        "percentage": 24.137931034482758
      },
      {
        "interval_start": "2025-03-24T23:15:00+05:30",
        "interval_end": "2025-03-24T23:30:00+05:30",
        "count": 1,
        "total_games": 32,
        "percentage": 3.125
      },
      {
        "interval_start": "2025-03-24T23:30:00+05:30",
        "interval_end": "2025-03-24T23:45:00+05:30",
        "count": 4,
        "total_games": 30,
        "percentage": 13.333333333333334
      },
      {
        "interval_start": "2025-03-24T23:45:00+05:30",
        "interval_end": "2025-03-25T00:00:00+05:30",
        "count": 4,
        "total_games": 32,
        "percentage": 12.5
      },
      {
        "interval_start": "2025-03-25T00:00:00+05:30",
        "interval_end": "2025-03-25T00:15:00+05:30",
        "count": 1,
        "total_games": 32,
        "percentage": 3.125
      },
      {
        "interval_start": "2025-03-25T00:15:00+05:30",
        "interval_end": "2025-03-25T00:30:00+05:30",
        "count": 5,
        "total_games": 29,
        "percentage": 17.24137931034483
      },
      {
        "interval_start": "2025-03-25T00:30:00+05:30",
        "interval_end": "2025-03-25T00:45:00+05:30",
        "count": 0,
        "total_games": 34,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-03-25T00:45:00+05:30",
        "interval_end": "2025-03-25T01:00:00+05:30",
        "count": 1,
        "total_games": 34,
        "percentage": 2.941176470588235
      },
      {
        "interval_start": "2025-03-25T01:00:00+05:30",
        "interval_end": "2025-03-25T01:15:00+05:30",
        "count": 0,
        "total_games": 34,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-03-25T01:15:00+05:30",
        "interval_end": "2025-03-25T01:30:00+05:30",
        "count": 2,
        "total_games": 39,
        "percentage": 5.128205128205128
      },
      {
        "interval_start": "2025-03-25T01:30:00+05:30",
        "interval_end": "2025-03-25T01:45:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-03-25T01:45:00+05:30",
        "interval_end": "2025-03-25T02:00:00+05:30",
        "count": 6,
        "total_games": 25,
        "percentage": 24.0
      },
      {
        "interval_start": "2025-03-25T02:00:00+05:30",
        "interval_end": "2025-03-25T02:15:00+05:30",
        "count": 4,
        "total_games": 36,
        "percentage": 11.11111111111111
      },
      {
        "interval_start": "2025-03-25T02:15:00+05:30",
        "interval_end": "2025-03-25T02:30:00+05:30",
        "count": 1,
        "total_games": 31,
        "percentage": 3.225806451612903
      },
      {
        "interval_start": "2025-03-25T02:30:00+05:30",
        "interval_end": "2025-03-25T02:45:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-03-25T02:45:00+05:30",
        "interval_end": "2025-03-25T03:00:00+05:30",
        "count": 4,
        "total_games": 25,
        "percentage": 16.0
      },
      {
        "interval_start": "2025-03-25T03:00:00+05:30",
        "interval_end": "2025-03-25T03:15:00+05:30",
        "count": 5,
        "total_games": 29,
        "percentage": 17.24137931034483
      },
      {
        "interval_start": "2025-03-25T03:15:00+05:30",
        "interval_end": "2025-03-25T03:30:00+05:30",
        "count": 2,
        "total_games": 33,
        "percentage": 6.0606060606060606
      },
      {
        "interval_start": "2025-03-25T03:30:00+05:30",
        "interval_end": "2025-03-25T03:45:00+05:30",
        "count": 4,
        "total_games": 33,
        "percentage": 12.121212121212121
      },
      {
        "interval_start": "2025-03-25T03:45:00+05:30",
        "interval_end": "2025-03-25T04:00:00+05:30",
        "count": 5,
        "total_games": 30,
        "percentage": 16.666666666666664
      },
      {
        "interval_start": "2025-03-25T04:00:00+05:30",
        "interval_end": "2025-03-25T04:15:00+05:30",
        "count": 2,
        "total_games": 32,
        "percentage": 6.25
      },
      {
        "interval_start": "2025-03-25T04:15:00+05:30",
        "interval_end": "2025-03-25T04:30:00+05:30",
        "count": 2,
        "total_games": 35,
        "percentage": 5.714285714285714
      },
      {
        "interval_start": "2025-03-25T04:30:00+05:30",
        "interval_end": "2025-03-25T04:45:00+05:30",
        "count": 2,
        "total_games": 33,
        "percentage": 6.0606060606060606
      },
      {
        "interval_start": "2025-03-25T04:45:00+05:30",
        "interval_end": "2025-03-25T05:00:00+05:30",
        "count": 3,
        "total_games": 34,
        "percentage": 8.823529411764707
      },
      {
        "interval_start": "2025-03-25T05:00:00+05:30",
        "interval_end": "2025-03-25T05:15:00+05:30",
        "count": 5,
        "total_games": 31,
        "percentage": 16.129032258064516
      },
      {
        "interval_start": "2025-03-25T05:15:00+05:30",
        "interval_end": "2025-03-25T05:30:00+05:30",
        "count": 3,
        "total_games": 34,
        "percentage": 8.823529411764707
      },
      {
        "interval_start": "2025-03-25T05:30:00+05:30",
        "interval_end": "2025-03-25T05:45:00+05:30",
        "count": 5,
        "total_games": 34,
        "percentage": 14.705882352941178
      },
      {
        "interval_start": "2025-03-25T05:45:00+05:30",
        "interval_end": "2025-03-25T06:00:00+05:30",
        "count": 2,
        "total_games": 30,
        "percentage": 6.666666666666667
      },
      {
        "interval_start": "2025-03-25T06:00:00+05:30",
        "interval_end": "2025-03-25T06:15:00+05:30",
        "count": 5,
        "total_games": 31,
        "percentage": 16.129032258064516
      },
      {
        "interval_start": "2025-03-25T06:15:00+05:30",
        "interval_end": "2025-03-25T06:30:00+05:30",
        "count": 4,
        "total_games": 32,
        "percentage": 12.5
      },
      {
        "interval_start": "2025-03-25T06:30:00+05:30",
        "interval_end": "2025-03-25T06:45:00+05:30",
        "count": 6,
        "total_games": 28,
        "percentage": 21.428571428571427
      },
      {
        "interval_start": "2025-03-25T06:45:00+05:30",
        "interval_end": "2025-03-25T07:00:00+05:30",
        "count": 4,
        "total_games": 29,
        "percentage": 13.793103448275861
      },
      {
        "interval_start": "2025-03-25T07:00:00+05:30",
        "interval_end": "2025-03-25T07:15:00+05:30",
        "count": 3,
        "total_games": 32,
        "percentage": 9.375
      },
      {
        "interval_start": "2025-03-25T07:15:00+05:30",
        "interval_end": "2025-03-25T07:30:00+05:30",
        "count": 5,
        "total_games": 31,
        "percentage": 16.129032258064516
      },
      {
        "interval_start": "2025-03-25T07:30:00+05:30",
        "interval_end": "2025-03-25T07:45:00+05:30",
        "count": 1,
        "total_games": 32,
        "percentage": 3.125
      },
      {
        "interval_start": "2025-03-25T07:45:00+05:30",
        "interval_end": "2025-03-25T08:00:00+05:30",
        "count": 3,
        "total_games": 37,
        "percentage": 8.108108108108109
      },
      {
        "interval_start": "2025-03-25T08:00:00+05:30",
        "interval_end": "2025-03-25T08:15:00+05:30",
        "count": 4,
        "total_games": 25,
        "percentage": 16.0
      },
      {
        "interval_start": "2025-03-25T08:15:00+05:30",
        "interval_end": "2025-03-25T08:30:00+05:30",
        "count": 1,
        "total_games": 32,
        "percentage": 3.125
      },
      {
        "interval_start": "2025-03-25T08:30:00+05:30",
        "interval_end": "2025-03-25T08:45:00+05:30",
        "count": 3,
        "total_games": 34,
        "percentage": 8.823529411764707
      },
      {
        "interval_start": "2025-03-25T08:45:00+05:30",
        "interval_end": "2025-03-25T09:00:00+05:30",
        "count": 3,
        "total_games": 32,
        "percentage": 9.375
      },
      {
        "interval_start": "2025-03-25T09:00:00+05:30",
        "interval_end": "2025-03-25T09:15:00+05:30",
        "count": 4,
        "total_games": 23,
        "percentage": 17.391304347826086
      },
      {
        "interval_start": "2025-03-25T09:15:00+05:30",
        "interval_end": "2025-03-25T09:30:00+05:30",
        "count": 5,
        "total_games": 31,
        "percentage": 16.129032258064516
      },
      {
        "interval_start": "2025-03-25T09:30:00+05:30",
        "interval_end": "2025-03-25T09:45:00+05:30",
        "count": 2,
        "total_games": 34,
        "percentage": 5.88235294117647
      },
      {
        "interval_start": "2025-03-25T09:45:00+05:30",
        "interval_end": "2025-03-25T10:00:00+05:30",
        "count": 3,
        "total_games": 31,
        "percentage": 9.67741935483871
      },
      {
        "interval_start": "2025-03-25T10:00:00+05:30",
        "interval_end": "2025-03-25T10:15:00+05:30",
        "count": 2,
        "total_games": 36,
        "percentage": 5.555555555555555
      },
      {
        "interval_start": "2025-03-25T10:15:00+05:30",
        "interval_end": "2025-03-25T10:30:00+05:30",
        "count": 3,
        "total_games": 30,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-03-25T10:30:00+05:30",
        "interval_end": "2025-03-25T10:45:00+05:30",
        "count": 4,
        "total_games": 29,
        "percentage": 13.793103448275861
      },
      {
        "interval_start": "2025-03-25T10:45:00+05:30",
        "interval_end": "2025-03-25T11:00:00+05:30",
        "count": 3,
        "total_games": 29,
        "percentage": 10.344827586206897
      },
      {
        "interval_start": "2025-03-25T11:00:00+05:30",
        "interval_end": "2025-03-25T11:15:00+05:30",
        "count": 3,
        "total_games": 35,
        "percentage": 8.571428571428571
      },
      {
        "interval_start": "2025-03-25T11:15:00+05:30",
        "interval_end": "2025-03-25T11:30:00+05:30",
        "count": 3,
        "total_games": 34,
        "percentage": 8.823529411764707
      },
      {
        "interval_start": "2025-03-25T11:30:00+05:30",
        "interval_end": "2025-03-25T11:45:00+05:30",
        "count": 2,
        "total_games": 34,
        "percentage": 5.88235294117647
      },
      {
        "interval_start": "2025-03-25T11:45:00+05:30",
        "interval_end": "2025-03-25T12:00:00+05:30",
        "count": 3,
        "total_games": 30,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-03-25T12:00:00+05:30",
        "interval_end": "2025-03-25T12:15:00+05:30",
        "count": 3,
        "total_games": 32,
        "percentage": 9.375
      },
      {
        "interval_start": "2025-03-25T12:15:00+05:30",
        "interval_end": "2025-03-25T12:30:00+05:30",
        "count": 1,
        "total_games": 33,
        "percentage": 3.0303030303030303
      },
      {
        "interval_start": "2025-03-25T12:30:00+05:30",
        "interval_end": "2025-03-25T12:45:00+05:30",
        "count": 2,
        "total_games": 36,
        "percentage": 5.555555555555555
      },
      {
        "interval_start": "2025-03-25T12:45:00+05:30",
        "interval_end": "2025-03-25T13:00:00+05:30",
        "count": 2,
        "total_games": 35,
        "percentage": 5.714285714285714
      },
      {
        "interval_start": "2025-03-25T13:00:00+05:30",
        "interval_end": "2025-03-25T13:15:00+05:30",
        "count": 6,
        "total_games": 27,
        "percentage": 22.22222222222222
      },
      {
        "interval_start": "2025-03-25T13:15:00+05:30",
        "interval_end": "2025-03-25T13:30:00+05:30",
        "count": 2,
        "total_games": 35,
        "percentage": 5.714285714285714
      },
      {
        "interval_start": "2025-03-25T13:30:00+05:30",
        "interval_end": "2025-03-25T13:45:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-03-25T13:45:00+05:30",
        "interval_end": "2025-03-25T14:00:00+05:30",
        "count": 2,
        "total_games": 36,
        "percentage": 5.555555555555555
      },
      {
        "interval_start": "2025-03-25T14:00:00+05:30",
        "interval_end": "2025-03-25T14:15:00+05:30",
        "count": 0,
        "total_games": 39,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-03-25T14:15:00+05:30",
        "interval_end": "2025-03-25T14:30:00+05:30",
        "count": 4,
        "total_games": 31,
        "percentage": 12.903225806451612
      },
      {
        "interval_start": "2025-03-25T14:30:00+05:30",
        "interval_end": "2025-03-25T14:45:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-03-25T14:45:00+05:30",
        "interval_end": "2025-03-25T15:00:00+05:30",
        "count": 2,
        "total_games": 34,
        "percentage": 5.88235294117647
      },
      {
        "interval_start": "2025-03-25T15:00:00+05:30",
        "interval_end": "2025-03-25T15:15:00+05:30",
        "count": 3,
        "total_games": 35,
        "percentage": 8.571428571428571
      },
      {
        "interval_start": "2025-03-25T15:15:00+05:30",
        "interval_end": "2025-03-25T15:30:00+05:30",
        "count": 3,
        "total_games": 29,
        "percentage": 10.344827586206897
      },
      {
        "interval_start": "2025-03-25T15:30:00+05:30",
        "interval_end": "2025-03-25T15:45:00+05:30",
        "count": 3,
        "total_games": 31,
        "percentage": 9.67741935483871
      },
      {
        "interval_start": "2025-03-25T15:45:00+05:30",
        "interval_end": "2025-03-25T16:00:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-03-25T16:00:00+05:30",
        "interval_end": "2025-03-25T16:15:00+05:30",
        "count": 3,
        "total_games": 31,
        "percentage": 9.67741935483871
      },
      {
        "interval_start": "2025-03-25T16:15:00+05:30",
        "interval_end": "2025-03-25T16:30:00+05:30",
        "count": 2,
        "total_games": 26,
        "percentage": 7.6923076923076925
      },
      {
        "interval_start": "2025-03-25T16:30:00+05:30",
        "interval_end": "2025-03-25T16:45:00+05:30",
        "count": 2,
        "total_games": 38,
        "percentage": 5.263157894736842
      },
      {
        "interval_start": "2025-03-25T16:45:00+05:30",
        "interval_end": "2025-03-25T17:00:00+05:30",
        "count": 3,
        "total_games": 34,
        "percentage": 8.823529411764707
      },
      {
        "interval_start": "2025-03-25T17:00:00+05:30",
        "interval_end": "2025-03-25T17:15:00+05:30",
        "count": 3,
        "total_games": 34,
        "percentage": 8.823529411764707
      },
      {
        "interval_start": "2025-03-25T17:15:00+05:30",
        "interval_end": "2025-03-25T17:30:00+05:30",
        "count": 4,
        "total_games": 30,
        "percentage": 13.333333333333334
      },
      {
        "interval_start": "2025-03-25T17:30:00+05:30",
        "interval_end": "2025-03-25T17:45:00+05:30",
        "count": 0,
        "total_games": 37,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-03-25T17:45:00+05:30",
        "interval_end": "2025-03-25T18:00:00+05:30",
        "count": 5,
        "total_games": 24,
        "percentage": 20.833333333333336
      },
      {
        "interval_start": "2025-03-25T18:00:00+05:30",
        "interval_end": "2025-03-25T18:15:00+05:30",
        "count": 4,
        "total_games": 31,
        "percentage": 12.903225806451612
      },
      {
        "interval_start": "2025-03-25T18:15:00+05:30",
        "interval_end": "2025-03-25T18:30:00+05:30",
        "count": 4,
        "total_games": 32,
        "percentage": 12.5
      },
      {
        "interval_start": "2025-03-25T18:30:00+05:30",
        "interval_end": "2025-03-25T18:45:00+05:30",
        "count": 4,
        "total_games": 30,
        "percentage": 13.333333333333334
      },
      {
        "interval_start": "2025-03-25T18:45:00+05:30",
        "interval_end": "2025-03-25T19:00:00+05:30",
        "count": 3,
        "total_games": 38,
        "percentage": 7.894736842105263
      },
      {
        "interval_start": "2025-03-25T19:00:00+05:30",
        "interval_end": "2025-03-25T19:15:00+05:30",
        "count": 3,
        "total_games": 34,
        "percentage": 8.823529411764707
      },
      {
        "interval_start": "2025-03-25T19:15:00+05:30",
        "interval_end": "2025-03-25T19:30:00+05:30",
        "count": 4,
        "total_games": 30,
        "percentage": 13.333333333333334
      },
      {
        "interval_start": "2025-03-25T19:30:00+05:30",
        "interval_end": "2025-03-25T19:45:00+05:30",
        "count": 4,
        "total_games": 36,
        "percentage": 11.11111111111111
      },
      {
        "interval_start": "2025-03-25T19:45:00+05:30",
        "interval_end": "2025-03-25T20:00:00+05:30",
        "count": 3,
        "total_games": 34,
        "percentage": 8.823529411764707
      },
      {
        "interval_start": "2025-03-25T20:00:00+05:30",
        "interval_end": "2025-03-25T20:15:00+05:30",
        "count": 2,
        "total_games": 33,
        "percentage": 6.0606060606060606
      },
      {
        "interval_start": "2025-03-25T20:15:00+05:30",
        "interval_end": "2025-03-25T20:30:00+05:30",
        "count": 3,
        "total_games": 29,
        "percentage": 10.344827586206897
      },
      {
        "interval_start": "2025-03-25T20:30:00+05:30",
        "interval_end": "2025-03-25T20:45:00+05:30",
        "count": 3,
        "total_games": 34,
        "percentage": 8.823529411764707
      },
      {
        "interval_start": "2025-03-25T20:45:00+05:30",
        "interval_end": "2025-03-25T21:00:00+05:30",
        "count": 3,
        "total_games": 34,
        "percentage": 8.823529411764707
      },
      {
        "interval_start": "2025-03-25T21:00:00+05:30",
        "interval_end": "2025-03-25T21:15:00+05:30",
        "count": 3,
        "total_games": 32,
        "percentage": 9.375
      },
      {
        "interval_start": "2025-03-25T21:15:00+05:30",
        "interval_end": "2025-03-25T21:30:00+05:30",
        "count": 4,
        "total_games": 36,
        "percentage": 11.11111111111111
      },
      {
        "interval_start": "2025-03-25T21:30:00+05:30",
        "interval_end": "2025-03-25T21:45:00+05:30",
        "count": 2,
        "total_games": 32,
        "percentage": 6.25
      },
      {
        "interval_start": "2025-03-25T21:45:00+05:30",
        "interval_end": "2025-03-25T22:00:00+05:30",
        "count": 7,
        "total_games": 26,
        "percentage": 26.923076923076923
      },
      {
        "interval_start": "2025-03-25T22:00:00+05:30",
        "interval_end": "2025-03-25T22:15:00+05:30",
        "count": 2,
        "total_games": 32,
        "percentage": 6.25
      },
      {
        "interval_start": "2025-03-25T22:15:00+05:30",
        "interval_end": "2025-03-25T22:30:00+05:30",
        "count": 1,
        "total_games": 37,
        "percentage": 2.7027027027027026
      },
      {
        "interval_start": "2025-03-25T22:30:00+05:30",
        "interval_end": "2025-03-25T22:45:00+05:30",
        "count": 4,
        "total_games": 25,
        "percentage": 16.0
      },
      {
        "interval_start": "2025-03-25T22:45:00+05:30",
        "interval_end": "2025-03-25T23:00:00+05:30",
        "count": 4,
        "total_games": 28,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-03-25T23:00:00+05:30",
        "interval_end": "2025-03-25T23:15:00+05:30",
        "count": 3,
        "total_games": 35,
        "percentage": 8.571428571428571
      },
      {
        "interval_start": "2025-03-25T23:15:00+05:30",
        "interval_end": "2025-03-25T23:30:00+05:30",
        "count": 2,
        "total_games": 35,
        "percentage": 5.714285714285714
      },
      {
        "interval_start": "2025-03-25T23:30:00+05:30",
        "interval_end": "2025-03-25T23:45:00+05:30",
        "count": 1,
        "total_games": 30,
        "percentage": 3.3333333333333335
      },
      {
        "interval_start": "2025-03-25T23:45:00+05:30",
        "interval_end": "2025-03-26T00:00:00+05:30",
        "count": 3,
        "total_games": 31,
        "percentage": 9.67741935483871
      },
      {
        "interval_start": "2025-03-26T00:00:00+05:30",
        "interval_end": "2025-03-26T00:15:00+05:30",
        "count": 5,
        "total_games": 28,
        "percentage": 17.857142857142858
      },
      {
        "interval_start": "2025-03-26T00:15:00+05:30",
        "interval_end": "2025-03-26T00:30:00+05:30",
        "count": 6,
        "total_games": 29,
        "percentage": 20.689655172413794
      },
      {
        "interval_start": "2025-03-26T00:30:00+05:30",
        "interval_end": "2025-03-26T00:45:00+05:30",
        "count": 4,
        "total_games": 30,
        "percentage": 13.333333333333334
      },
      {
        "interval_start": "2025-03-26T00:45:00+05:30",
        "interval_end": "2025-03-26T01:00:00+05:30",
        "count": 2,
        "total_games": 35,
        "percentage": 5.714285714285714
      },
      {
        "interval_start": "2025-03-26T01:00:00+05:30",
        "interval_end": "2025-03-26T01:15:00+05:30",
        "count": 4,
        "total_games": 31,
        "percentage": 12.903225806451612
      },
      {
        "interval_start": "2025-03-26T01:15:00+05:30",
        "interval_end": "2025-03-26T01:30:00+05:30",
        "count": 4,
        "total_games": 31,
        "percentage": 12.903225806451612
      },
      {
        "interval_start": "2025-03-26T01:30:00+05:30",
        "interval_end": "2025-03-26T01:45:00+05:30",
        "count": 2,
        "total_games": 33,
        "percentage": 6.0606060606060606
      },
      {
        "interval_start": "2025-03-26T01:45:00+05:30",
        "interval_end": "2025-03-26T02:00:00+05:30",
        "count": 1,
        "total_games": 32,
        "percentage": 3.125
      },
      {
        "interval_start": "2025-03-26T02:00:00+05:30",
        "interval_end": "2025-03-26T02:15:00+05:30",
        "count": 4,
        "total_games": 28,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-03-26T02:15:00+05:30",
        "interval_end": "2025-03-26T02:30:00+05:30",
        "count": 4,
        "total_games": 29,
        "percentage": 13.793103448275861
      },
      {
        "interval_start": "2025-03-26T02:30:00+05:30",
        "interval_end": "2025-03-26T02:45:00+05:30",
        "count": 1,
        "total_games": 36,
        "percentage": 2.7777777777777777
      },
      {
        "interval_start": "2025-03-26T02:45:00+05:30",
        "interval_end": "2025-03-26T03:00:00+05:30",
        "count": 6,
        "total_games": 31,
        "percentage": 19.35483870967742
      },
      {
        "interval_start": "2025-03-26T03:00:00+05:30",
        "interval_end": "2025-03-26T03:15:00+05:30",
        "count": 3,
        "total_games": 31,
        "percentage": 9.67741935483871
      },
      {
        "interval_start": "2025-03-26T03:15:00+05:30",
        "interval_end": "2025-03-26T03:30:00+05:30",
        "count": 4,
        "total_games": 29,
        "percentage": 13.793103448275861
      },
      {
        "interval_start": "2025-03-26T03:30:00+05:30",
        "interval_end": "2025-03-26T03:45:00+05:30",
        "count": 2,
        "total_games": 37,
        "percentage": 5.405405405405405
      },
      {
        "interval_start": "2025-03-26T03:45:00+05:30",
        "interval_end": "2025-03-26T04:00:00+05:30",
        "count": 4,
        "total_games": 34,
        "percentage": 11.76470588235294
      },
      {
        "interval_start": "2025-03-26T04:00:00+05:30",
        "interval_end": "2025-03-26T04:15:00+05:30",
        "count": 4,
        "total_games": 34,
        "percentage": 11.76470588235294
      },
      {
        "interval_start": "2025-03-26T04:15:00+05:30",
        "interval_end": "2025-03-26T04:30:00+05:30",
        "count": 3,
        "total_games": 31,
        "percentage": 9.67741935483871
      },
      {
        "interval_start": "2025-03-26T04:30:00+05:30",
        "interval_end": "2025-03-26T04:45:00+05:30",
        "count": 6,
        "total_games": 32,
        "percentage": 18.75
      },
      {
        "interval_start": "2025-03-26T04:45:00+05:30",
        "interval_end": "2025-03-26T05:00:00+05:30",
        "count": 2,
        "total_games": 34,
        "percentage": 5.88235294117647
      },
      {
        "interval_start": "2025-03-26T05:00:00+05:30",
        "interval_end": "2025-03-26T05:15:00+05:30",
        "count": 3,
        "total_games": 30,
        "percentage": 10.0
      },
      {
        "interval_start": "2025-03-26T05:15:00+05:30",
        "interval_end": "2025-03-26T05:30:00+05:30",
        "count": 2,
        "total_games": 31,
        "percentage": 6.451612903225806
      },
      {
        "interval_start": "2025-03-26T05:30:00+05:30",
        "interval_end": "2025-03-26T05:45:00+05:30",
        "count": 2,
        "total_games": 33,
        "percentage": 6.0606060606060606
      },
      {
        "interval_start": "2025-03-26T05:45:00+05:30",
        "interval_end": "2025-03-26T06:00:00+05:30",
        "count": 2,
        "total_games": 30,
        "percentage": 6.666666666666667
      },
      {
        "interval_start": "2025-03-26T06:00:00+05:30",
        "interval_end": "2025-03-26T06:15:00+05:30",
        "count": 1,
        "total_games": 38,
        "percentage": 2.631578947368421
      },
      {
        "interval_start": "2025-03-26T06:15:00+05:30",
        "interval_end": "2025-03-26T06:30:00+05:30",
        "count": 5,
        "total_games": 26,
        "percentage": 19.230769230769234
      },
      {
        "interval_start": "2025-03-26T06:30:00+05:30",
        "interval_end": "2025-03-26T06:45:00+05:30",
        "count": 6,
        "total_games": 26,
        "percentage": 23.076923076923077
      },
      {
        "interval_start": "2025-03-26T06:45:00+05:30",
        "interval_end": "2025-03-26T07:00:00+05:30",
        "count": 2,
        "total_games": 34,
        "percentage": 5.88235294117647
      },
      {
        "interval_start": "2025-03-26T07:00:00+05:30",
        "interval_end": "2025-03-26T07:15:00+05:30",
        "count": 2,
        "total_games": 31,
        "percentage": 6.451612903225806
      },
      {
        "interval_start": "2025-03-26T07:15:00+05:30",
        "interval_end": "2025-03-26T07:30:00+05:30",
        "count": 3,
        "total_games": 29,
        "percentage": 10.344827586206897
      },
      {
        "interval_start": "2025-03-26T07:30:00+05:30",
        "interval_end": "2025-03-26T07:45:00+05:30",
        "count": 4,
        "total_games": 33,
        "percentage": 12.121212121212121
      },
      {
        "interval_start": "2025-03-26T07:45:00+05:30",
        "interval_end": "2025-03-26T08:00:00+05:30",
        "count": 1,
        "total_games": 44,
        "percentage": 2.272727272727273
      },
      {
        "interval_start": "2025-03-26T08:00:00+05:30",
        "interval_end": "2025-03-26T08:15:00+05:30",
        "count": 2,
        "total_games": 28,
        "percentage": 7.142857142857142
      },
      {
        "interval_start": "2025-03-26T08:15:00+05:30",
        "interval_end": "2025-03-26T08:30:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-03-26T08:30:00+05:30",
        "interval_end": "2025-03-26T08:45:00+05:30",
        "count": 1,
        "total_games": 36,
        "percentage": 2.7777777777777777
      },
      {
        "interval_start": "2025-03-26T08:45:00+05:30",
        "interval_end": "2025-03-26T09:00:00+05:30",
        "count": 4,
        "total_games": 33,
        "percentage": 12.121212121212121
      },
      {
        "interval_start": "2025-03-26T09:00:00+05:30",
        "interval_end": "2025-03-26T09:15:00+05:30",
        "count": 2,
        "total_games": 35,
        "percentage": 5.714285714285714
      },
      {
        "interval_start": "2025-03-26T09:15:00+05:30",
        "interval_end": "2025-03-26T09:30:00+05:30",
        "count": 3,
        "total_games": 38,
        "percentage": 7.894736842105263
      },
      {
        "interval_start": "2025-03-26T09:30:00+05:30",
        "interval_end": "2025-03-26T09:45:00+05:30",
        "count": 4,
        "total_games": 33,
        "percentage": 12.121212121212121
      },
      {
        "interval_start": "2025-03-26T09:45:00+05:30",
        "interval_end": "2025-03-26T10:00:00+05:30",
        "count": 5,
        "total_games": 25,
        "percentage": 20.0
      },
      {
        "interval_start": "2025-03-26T10:00:00+05:30",
        "interval_end": "2025-03-26T10:15:00+05:30",
        "count": 2,
        "total_games": 31,
        "percentage": 6.451612903225806
      },
      {
        "interval_start": "2025-03-26T10:15:00+05:30",
        "interval_end": "2025-03-26T10:30:00+05:30",
        "count": 6,
        "total_games": 28,
        "percentage": 21.428571428571427
      },
      {
        "interval_start": "2025-03-26T10:30:00+05:30",
        "interval_end": "2025-03-26T10:45:00+05:30",
        "count": 0,
        "total_games": 38,
        "percentage": 0.0
      },
      {
        "interval_start": "2025-03-26T10:45:00+05:30",
        "interval_end": "2025-03-26T11:00:00+05:30",
        "count": 5,
        "total_games": 26,
        "percentage": 19.230769230769234
      },
      {
        "interval_start": "2025-03-26T11:00:00+05:30",
        "interval_end": "2025-03-26T11:15:00+05:30",
        "count": 3,
        "total_games": 32,
        "percentage": 9.375
      },
      {
        "interval_start": "2025-03-26T11:15:00+05:30",
        "interval_end": "2025-03-26T11:30:00+05:30",
        "count": 2,
        "total_games": 31,
        "percentage": 6.451612903225806
      },
      {
        "interval_start": "2025-03-26T11:30:00+05:30",
        "interval_end": "2025-03-26T11:45:00+05:30",
        "count": 1,
        "total_games": 31,
        "percentage": 3.225806451612903
      },
      {
        "interval_start": "2025-03-26T11:45:00+05:30",
        "interval_end": "2025-03-26T12:00:00+05:30",
        "count": 5,
        "total_games": 29,
        "percentage": 17.24137931034483
      },
      {
        "interval_start": "2025-03-26T12:00:00+05:30",
        "interval_end": "2025-03-26T12:15:00+05:30",
        "count": 2,
        "total_games": 32,
        "percentage": 6.25
      },
      {
        "interval_start": "2025-03-26T12:15:00+05:30",
        "interval_end": "2025-03-26T12:30:00+05:30",
        "count": 8,
        "total_games": 25,
        "percentage": 32.0
      },
      {
        "interval_start": "2025-03-26T12:30:00+05:30",
        "interval_end": "2025-03-26T12:45:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-03-26T12:45:00+05:30",
        "interval_end": "2025-03-26T13:00:00+05:30",
        "count": 4,
        "total_games": 26,
        "percentage": 15.384615384615385
      },
      {
        "interval_start": "2025-03-26T13:00:00+05:30",
        "interval_end": "2025-03-26T13:15:00+05:30",
        "count": 2,
        "total_games": 28,
        "percentage": 7.142857142857142
      },
      {
        "interval_start": "2025-03-26T13:15:00+05:30",
        "interval_end": "2025-03-26T13:30:00+05:30",
        "count": 6,
        "total_games": 31,
        "percentage": 19.35483870967742
      },
      {
        "interval_start": "2025-03-26T13:30:00+05:30",
        "interval_end": "2025-03-26T13:45:00+05:30",
        "count": 3,
        "total_games": 32,
        "percentage": 9.375
      },
      {
        "interval_start": "2025-03-26T13:45:00+05:30",
        "interval_end": "2025-03-26T14:00:00+05:30",
        "count": 3,
        "total_games": 28,
        "percentage": 10.714285714285714
      },
      {
        "interval_start": "2025-03-26T14:00:00+05:30",
        "interval_end": "2025-03-26T14:15:00+05:30",
        "count": 4,
        "total_games": 30,
        "percentage": 13.333333333333334
      },
      {
        "interval_start": "2025-03-26T14:15:00+05:30",
        "interval_end": "2025-03-26T14:30:00+05:30",
        "count": 6,
        "total_games": 24,
        "percentage": 25.0
      },
      {
        "interval_start": "2025-03-26T14:30:00+05:30",
        "interval_end": "2025-03-26T14:45:00+05:30",
        "count": 3,
        "total_games": 28,
        "percentage": 10.714285714285714
      },
      {
        "interval_start": "2025-03-26T14:45:00+05:30",
        "interval_end": "2025-03-26T15:00:00+05:30",
        "count": 3,
        "total_games": 33,
        "percentage": 9.090909090909092
      },
      {
        "interval_start": "2025-03-26T15:00:00+05:30",
        "interval_end": "2025-03-26T15:15:00+05:30",
        "count": 2,
        "total_games": 32,
        "percentage": 6.25
      },
      {
        "interval_start": "2025-03-26T15:15:00+05:30",
        "interval_end": "2025-03-26T15:30:00+05:30",
        "count": 2,
        "total_games": 33,
        "percentage": 6.0606060606060606
      },
      {
        "interval_start": "2025-03-26T15:30:00+05:30",
        "interval_end": "2025-03-26T15:45:00+05:30",
        "count": 4,
        "total_games": 33,
        "percentage": 12.121212121212121
      },
      {
        "interval_start": "2025-03-26T15:45:00+05:30",
        "interval_end": "2025-03-26T16:00:00+05:30",
        "count": 2,
        "total_games": 31,
        "percentage": 6.451612903225806
      },
      {
        "interval_start": "2025-03-26T16:00:00+05:30",
        "interval_end": "2025-03-26T16:15:00+05:30",
        "count": 5,
        "total_games": 32,
        "percentage": 15.625
      },
      {
        "interval_start": "2025-03-26T16:15:00+05:30",
        "interval_end": "2025-03-26T16:30:00+05:30",
        "count": 1,
        "total_games": 33,
        "percentage": 3.0303030303030303
      },
      {
        "interval_start": "2025-03-26T16:30:00+05:30",
        "interval_end": "2025-03-26T16:45:00+05:30",
        "count": 5,
        "total_games": 31,
        "percentage": 16.129032258064516
      },
      {
        "interval_start": "2025-03-26T16:45:00+05:30",
        "interval_end": "2025-03-26T17:00:00+05:30",
        "count": 5,
        "total_games": 31,
        "percentage": 16.129032258064516
      },
      {
        "interval_start": "2025-03-26T17:00:00+05:30",
        "interval_end": "2025-03-26T17:15:00+05:30",
        "count": 4,
        "total_games": 28,
        "percentage": 14.285714285714285
      },
      {
        "interval_start": "2025-03-26T17:15:00+05:30",
        "interval_end": "2025-03-26T17:30:00+05:30",
        "count": 2,
        "total_games": 24,
        "percentage": 8.333333333333332
      }
    ]
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 21781  100 21781    0     0   4140      0  0:00:05  0:00:05 --:--:--  5372
{
  "status": "success",
  "data": {
    "min_value": 10.0,
    "games_per_set": 10,
    "total_games": 1000,
    "count": 100,
    "intervals": [
      {
        "set_number": 1,
        "start_game": "7979547",
        "end_game": "7979556",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T09:15:16.706000+05:30",
        "end_time": "2025-03-26T09:18:27.257000+05:30"
      },
      {
        "set_number": 2,
        "start_game": "7979557",
        "end_game": "7979566",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T09:18:40.544000+05:30",
        "end_time": "2025-03-26T09:22:06.121000+05:30"
      },
      {
        "set_number": 3,
        "start_game": "7979567",
        "end_game": "7979576",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T09:22:19.087000+05:30",
        "end_time": "2025-03-26T09:26:38.076000+05:30"
      },
      {
        "set_number": 4,
        "start_game": "7979577",
        "end_game": "7979586",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T09:26:51.684000+05:30",
        "end_time": "2025-03-26T09:32:02.242000+05:30"
      },
      {
        "set_number": 5,
        "start_game": "7979587",
        "end_game": "7979596",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T09:32:34.872000+05:30",
        "end_time": "2025-03-26T09:36:35.688000+05:30"
      },
      {
        "set_number": 6,
        "start_game": "7979597",
        "end_game": "7979606",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T09:36:58.824000+05:30",
        "end_time": "2025-03-26T09:40:13.068000+05:30"
      },
      {
        "set_number": 7,
        "start_game": "7979607",
        "end_game": "7979616",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T09:40:29.611000+05:30",
        "end_time": "2025-03-26T09:44:59.447000+05:30"
      },
      {
        "set_number": 8,
        "start_game": "7979617",
        "end_game": "7979626",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T09:45:28.634000+05:30",
        "end_time": "2025-03-26T09:50:17.879000+05:30"
      },
      {
        "set_number": 9,
        "start_game": "7979627",
        "end_game": "7979636",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T09:51:02.901000+05:30",
        "end_time": "2025-03-26T09:56:08.423000+05:30"
      },
      {
        "set_number": 10,
        "start_game": "7979637",
        "end_game": "7979646",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T09:56:34.836000+05:30",
        "end_time": "2025-03-26T10:01:50.119000+05:30"
      },
      {
        "set_number": 11,
        "start_game": "7979647",
        "end_game": "7979656",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T10:02:08.594000+05:30",
        "end_time": "2025-03-26T10:06:14.671000+05:30"
      },
      {
        "set_number": 12,
        "start_game": "7979657",
        "end_game": "7979666",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T10:06:37.978000+05:30",
        "end_time": "2025-03-26T10:11:16.841000+05:30"
      },
      {
        "set_number": 13,
        "start_game": "7979667",
        "end_game": "7979676",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T10:11:36.235000+05:30",
        "end_time": "2025-03-26T10:17:03.974000+05:30"
      },
      {
        "set_number": 14,
        "start_game": "7979677",
        "end_game": "7979686",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T10:17:52.404000+05:30",
        "end_time": "2025-03-26T10:22:06.306000+05:30"
      },
      {
        "set_number": 15,
        "start_game": "7979687",
        "end_game": "7979696",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T10:23:29.893000+05:30",
        "end_time": "2025-03-26T10:27:33.448000+05:30"
      },
      {
        "set_number": 16,
        "start_game": "7979697",
        "end_game": "7979706",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T10:28:12.229000+05:30",
        "end_time": "2025-03-26T10:32:17.041000+05:30"
      },
      {
        "set_number": 17,
        "start_game": "7979707",
        "end_game": "7979716",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T10:32:34.388000+05:30",
        "end_time": "2025-03-26T10:35:53.768000+05:30"
      },
      {
        "set_number": 18,
        "start_game": "7979717",
        "end_game": "7979726",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T10:36:31.181000+05:30",
        "end_time": "2025-03-26T10:40:14.977000+05:30"
      },
      {
        "set_number": 19,
        "start_game": "7979727",
        "end_game": "7979736",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T10:40:28.870000+05:30",
        "end_time": "2025-03-26T10:44:03.433000+05:30"
      },
      {
        "set_number": 20,
        "start_game": "7979737",
        "end_game": "7979746",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T10:44:29.200000+05:30",
        "end_time": "2025-03-26T10:48:48.078000+05:30"
      },
      {
        "set_number": 21,
        "start_game": "7979747",
        "end_game": "7979756",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T10:49:03.690000+05:30",
        "end_time": "2025-03-26T10:53:45.588000+05:30"
      },
      {
        "set_number": 22,
        "start_game": "7979757",
        "end_game": "7979766",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T10:54:36.051000+05:30",
        "end_time": "2025-03-26T11:00:41.922000+05:30"
      },
      {
        "set_number": 23,
        "start_game": "7979767",
        "end_game": "7979776",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T11:00:55.030000+05:30",
        "end_time": "2025-03-26T11:04:59.069000+05:30"
      },
      {
        "set_number": 24,
        "start_game": "7979777",
        "end_game": "7979786",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T11:05:17.342000+05:30",
        "end_time": "2025-03-26T11:10:43.013000+05:30"
      },
      {
        "set_number": 25,
        "start_game": "7979787",
        "end_game": "7979796",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T11:11:00.057000+05:30",
        "end_time": "2025-03-26T11:14:43.700000+05:30"
      },
      {
        "set_number": 26,
        "start_game": "7979797",
        "end_game": "7979806",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T11:15:00.695000+05:30",
        "end_time": "2025-03-26T11:18:33.159000+05:30"
      },
      {
        "set_number": 27,
        "start_game": "7979807",
        "end_game": "7979816",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T11:18:51.351000+05:30",
        "end_time": "2025-03-26T11:24:22.123000+05:30"
      },
      {
        "set_number": 28,
        "start_game": "7979817",
        "end_game": "7979826",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T11:24:36.033000+05:30",
        "end_time": "2025-03-26T11:29:08.238000+05:30"
      },
      {
        "set_number": 29,
        "start_game": "7979827",
        "end_game": "7979836",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T11:29:38.084000+05:30",
        "end_time": "2025-03-26T11:34:23.266000+05:30"
      },
      {
        "set_number": 30,
        "start_game": "7979837",
        "end_game": "7979846",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T11:35:01.324000+05:30",
        "end_time": "2025-03-26T11:39:05.570000+05:30"
      },
      {
        "set_number": 31,
        "start_game": "7979847",
        "end_game": "7979856",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T11:39:29.613000+05:30",
        "end_time": "2025-03-26T11:44:01.820000+05:30"
      },
      {
        "set_number": 32,
        "start_game": "7979857",
        "end_game": "7979866",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T11:44:17.650000+05:30",
        "end_time": "2025-03-26T11:47:31.409000+05:30"
      },
      {
        "set_number": 33,
        "start_game": "7979867",
        "end_game": "7979876",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T11:47:50.055000+05:30",
        "end_time": "2025-03-26T11:53:15.308000+05:30"
      },
      {
        "set_number": 34,
        "start_game": "7979877",
        "end_game": "7979886",
        "count": 3,
        "total_games": 10,
        "percentage": 30.0,
        "start_time": "2025-03-26T11:54:14.338000+05:30",
        "end_time": "2025-03-26T11:59:29.511000+05:30"
      },
      {
        "set_number": 35,
        "start_game": "7979887",
        "end_game": "7979896",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T11:59:55.329000+05:30",
        "end_time": "2025-03-26T12:03:19.994000+05:30"
      },
      {
        "set_number": 36,
        "start_game": "7979897",
        "end_game": "7979906",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T12:03:43.400000+05:30",
        "end_time": "2025-03-26T12:09:37.508000+05:30"
      },
      {
        "set_number": 37,
        "start_game": "7979907",
        "end_game": "7979916",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T12:10:02.641000+05:30",
        "end_time": "2025-03-26T12:13:36.576000+05:30"
      },
      {
        "set_number": 38,
        "start_game": "7979917",
        "end_game": "7979926",
        "count": 3,
        "total_games": 10,
        "percentage": 30.0,
        "start_time": "2025-03-26T12:13:57.708000+05:30",
        "end_time": "2025-03-26T12:20:10.011000+05:30"
      },
      {
        "set_number": 39,
        "start_game": "7979927",
        "end_game": "7979936",
        "count": 4,
        "total_games": 10,
        "percentage": 40.0,
        "start_time": "2025-03-26T12:21:20.030000+05:30",
        "end_time": "2025-03-26T12:26:39.038000+05:30"
      },
      {
        "set_number": 40,
        "start_game": "7979937",
        "end_game": "7979946",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T12:26:59.186000+05:30",
        "end_time": "2025-03-26T12:30:40.698000+05:30"
      },
      {
        "set_number": 41,
        "start_game": "7979947",
        "end_game": "7979956",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T12:31:16.446000+05:30",
        "end_time": "2025-03-26T12:34:39.425000+05:30"
      },
      {
        "set_number": 42,
        "start_game": "7979957",
        "end_game": "7979966",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T12:34:54.996000+05:30",
        "end_time": "2025-03-26T12:39:07.517000+05:30"
      },
      {
        "set_number": 43,
        "start_game": "7979967",
        "end_game": "7979976",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T12:39:33.141000+05:30",
        "end_time": "2025-03-26T12:44:40.380000+05:30"
      },
      {
        "set_number": 44,
        "start_game": "7979977",
        "end_game": "7979986",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T12:44:56.547000+05:30",
        "end_time": "2025-03-26T12:50:32.811000+05:30"
      },
      {
        "set_number": 45,
        "start_game": "7979987",
        "end_game": "7979996",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T12:51:06.671000+05:30",
        "end_time": "2025-03-26T12:55:50.534000+05:30"
      },
      {
        "set_number": 46,
        "start_game": "7979997",
        "end_game": "7980006",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T12:56:21.912000+05:30",
        "end_time": "2025-03-26T13:01:09.436000+05:30"
      },
      {
        "set_number": 47,
        "start_game": "7980007",
        "end_game": "7980016",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T13:01:23.675000+05:30",
        "end_time": "2025-03-26T13:06:18.365000+05:30"
      },
      {
        "set_number": 48,
        "start_game": "7980017",
        "end_game": "7980026",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T13:06:50.661000+05:30",
        "end_time": "2025-03-26T13:10:53.479000+05:30"
      },
      {
        "set_number": 49,
        "start_game": "7980027",
        "end_game": "7980036",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T13:11:41.034000+05:30",
        "end_time": "2025-03-26T13:16:24.616000+05:30"
      },
      {
        "set_number": 50,
        "start_game": "7980037",
        "end_game": "7980046",
        "count": 6,
        "total_games": 10,
        "percentage": 60.0,
        "start_time": "2025-03-26T13:16:55.156000+05:30",
        "end_time": "2025-03-26T13:23:33.559000+05:30"
      },
      {
        "set_number": 51,
        "start_game": "7980047",
        "end_game": "7980056",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T13:23:56.783000+05:30",
        "end_time": "2025-03-26T13:27:31.056000+05:30"
      },
      {
        "set_number": 52,
        "start_game": "7980057",
        "end_game": "7980066",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T13:27:47.283000+05:30",
        "end_time": "2025-03-26T13:31:34.463000+05:30"
      },
      {
        "set_number": 53,
        "start_game": "7980067",
        "end_game": "7980076",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T13:32:31.934000+05:30",
        "end_time": "2025-03-26T13:37:17.712000+05:30"
      },
      {
        "set_number": 54,
        "start_game": "7980077",
        "end_game": "7980086",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T13:37:38.289000+05:30",
        "end_time": "2025-03-26T13:42:07.614000+05:30"
      },
      {
        "set_number": 55,
        "start_game": "7980087",
        "end_game": "7980096",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T13:42:20.054000+05:30",
        "end_time": "2025-03-26T13:47:08.166000+05:30"
      },
      {
        "set_number": 56,
        "start_game": "7980097",
        "end_game": "7980106",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T13:47:31.515000+05:30",
        "end_time": "2025-03-26T13:52:18.349000+05:30"
      },
      {
        "set_number": 57,
        "start_game": "7980107",
        "end_game": "7980116",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T13:52:30.083000+05:30",
        "end_time": "2025-03-26T13:55:23.269000+05:30"
      },
      {
        "set_number": 58,
        "start_game": "7980117",
        "end_game": "7980126",
        "count": 3,
        "total_games": 10,
        "percentage": 30.0,
        "start_time": "2025-03-26T13:56:04.399000+05:30",
        "end_time": "2025-03-26T14:01:23.644000+05:30"
      },
      {
        "set_number": 59,
        "start_game": "7980127",
        "end_game": "7980136",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T14:01:40.839000+05:30",
        "end_time": "2025-03-26T14:07:06.225000+05:30"
      },
      {
        "set_number": 60,
        "start_game": "7980137",
        "end_game": "7980146",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T14:07:25.618000+05:30",
        "end_time": "2025-03-26T14:11:40.329000+05:30"
      },
      {
        "set_number": 61,
        "start_game": "7980147",
        "end_game": "7980156",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T14:12:27.222000+05:30",
        "end_time": "2025-03-26T14:18:11.542000+05:30"
      },
      {
        "set_number": 62,
        "start_game": "7980157",
        "end_game": "7980166",
        "count": 3,
        "total_games": 10,
        "percentage": 30.0,
        "start_time": "2025-03-26T14:18:52.748000+05:30",
        "end_time": "2025-03-26T14:24:29.114000+05:30"
      },
      {
        "set_number": 63,
        "start_game": "7980167",
        "end_game": "7980176",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T14:25:41.535000+05:30",
        "end_time": "2025-03-26T14:29:54.349000+05:30"
      },
      {
        "set_number": 64,
        "start_game": "7980177",
        "end_game": "7980186",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T14:30:23.351000+05:30",
        "end_time": "2025-03-26T14:35:29.065000+05:30"
      },
      {
        "set_number": 65,
        "start_game": "7980187",
        "end_game": "7980196",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T14:36:17.936000+05:30",
        "end_time": "2025-03-26T14:40:42.677000+05:30"
      },
      {
        "set_number": 66,
        "start_game": "7980197",
        "end_game": "7980206",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T14:41:25.025000+05:30",
        "end_time": "2025-03-26T14:46:09.946000+05:30"
      },
      {
        "set_number": 67,
        "start_game": "7980207",
        "end_game": "7980216",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T14:46:37.915000+05:30",
        "end_time": "2025-03-26T14:51:06.241000+05:30"
      },
      {
        "set_number": 68,
        "start_game": "7980217",
        "end_game": "7980226",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T14:51:23.773000+05:30",
        "end_time": "2025-03-26T14:55:15.966000+05:30"
      },
      {
        "set_number": 69,
        "start_game": "7980227",
        "end_game": "7980236",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T14:55:31.288000+05:30",
        "end_time": "2025-03-26T14:59:42.373000+05:30"
      },
      {
        "set_number": 70,
        "start_game": "7980237",
        "end_game": "7980246",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T14:59:54.099000+05:30",
        "end_time": "2025-03-26T15:03:24.908000+05:30"
      },
      {
        "set_number": 71,
        "start_game": "7980247",
        "end_game": "7980256",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T15:03:50.351000+05:30",
        "end_time": "2025-03-26T15:08:31.597000+05:30"
      },
      {
        "set_number": 72,
        "start_game": "7980257",
        "end_game": "7980266",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T15:09:19.386000+05:30",
        "end_time": "2025-03-26T15:13:26.277000+05:30"
      },
      {
        "set_number": 73,
        "start_game": "7980267",
        "end_game": "7980276",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T15:13:40.393000+05:30",
        "end_time": "2025-03-26T15:17:54.685000+05:30"
      },
      {
        "set_number": 74,
        "start_game": "7980277",
        "end_game": "7980286",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T15:18:31.912000+05:30",
        "end_time": "2025-03-26T15:23:29.670000+05:30"
      },
      {
        "set_number": 75,
        "start_game": "7980287",
        "end_game": "7980296",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T15:23:47.626000+05:30",
        "end_time": "2025-03-26T15:27:15.849000+05:30"
      },
      {
        "set_number": 76,
        "start_game": "7980297",
        "end_game": "7980306",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T15:27:49.667000+05:30",
        "end_time": "2025-03-26T15:31:00.506000+05:30"
      },
      {
        "set_number": 77,
        "start_game": "7980307",
        "end_game": "7980316",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T15:31:30.198000+05:30",
        "end_time": "2025-03-26T15:36:48.753000+05:30"
      },
      {
        "set_number": 78,
        "start_game": "7980317",
        "end_game": "7980326",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T15:37:12.077000+05:30",
        "end_time": "2025-03-26T15:40:27.924000+05:30"
      },
      {
        "set_number": 79,
        "start_game": "7980327",
        "end_game": "7980336",
        "count": 3,
        "total_games": 10,
        "percentage": 30.0,
        "start_time": "2025-03-26T15:40:53.115000+05:30",
        "end_time": "2025-03-26T15:46:02.687000+05:30"
      },
      {
        "set_number": 80,
        "start_game": "7980337",
        "end_game": "7980346",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T15:46:21.787000+05:30",
        "end_time": "2025-03-26T15:51:26.892000+05:30"
      },
      {
        "set_number": 81,
        "start_game": "7980347",
        "end_game": "7980356",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T15:51:38.779000+05:30",
        "end_time": "2025-03-26T15:55:17.027000+05:30"
      },
      {
        "set_number": 82,
        "start_game": "7980357",
        "end_game": "7980366",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T15:55:30.282000+05:30",
        "end_time": "2025-03-26T15:59:56.442000+05:30"
      },
      {
        "set_number": 83,
        "start_game": "7980367",
        "end_game": "7980376",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T16:00:14.373000+05:30",
        "end_time": "2025-03-26T16:03:16.137000+05:30"
      },
      {
        "set_number": 84,
        "start_game": "7980377",
        "end_game": "7980386",
        "count": 4,
        "total_games": 10,
        "percentage": 40.0,
        "start_time": "2025-03-26T16:03:32.191000+05:30",
        "end_time": "2025-03-26T16:09:52.331000+05:30"
      },
      {
        "set_number": 85,
        "start_game": "7980387",
        "end_game": "7980396",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T16:10:46.161000+05:30",
        "end_time": "2025-03-26T16:13:51.122000+05:30"
      },
      {
        "set_number": 86,
        "start_game": "7980397",
        "end_game": "7980406",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T16:14:17.030000+05:30",
        "end_time": "2025-03-26T16:18:16.503000+05:30"
      },
      {
        "set_number": 87,
        "start_game": "7980407",
        "end_game": "7980416",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T16:18:57.937000+05:30",
        "end_time": "2025-03-26T16:22:37.491000+05:30"
      },
      {
        "set_number": 88,
        "start_game": "7980417",
        "end_game": "7980426",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T16:23:15.448000+05:30",
        "end_time": "2025-03-26T16:27:06.933000+05:30"
      },
      {
        "set_number": 89,
        "start_game": "7980427",
        "end_game": "7980436",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T16:27:30.502000+05:30",
        "end_time": "2025-03-26T16:31:15.497000+05:30"
      },
      {
        "set_number": 90,
        "start_game": "7980437",
        "end_game": "7980446",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T16:31:29.515000+05:30",
        "end_time": "2025-03-26T16:36:00.510000+05:30"
      },
      {
        "set_number": 91,
        "start_game": "7980447",
        "end_game": "7980456",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T16:36:23.581000+05:30",
        "end_time": "2025-03-26T16:40:44.940000+05:30"
      },
      {
        "set_number": 92,
        "start_game": "7980457",
        "end_game": "7980466",
        "count": 3,
        "total_games": 10,
        "percentage": 30.0,
        "start_time": "2025-03-26T16:42:04.378000+05:30",
        "end_time": "2025-03-26T16:47:10.829000+05:30"
      },
      {
        "set_number": 93,
        "start_game": "7980467",
        "end_game": "7980476",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T16:47:29.400000+05:30",
        "end_time": "2025-03-26T16:52:18.233000+05:30"
      },
      {
        "set_number": 94,
        "start_game": "7980477",
        "end_game": "7980486",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T16:52:44.107000+05:30",
        "end_time": "2025-03-26T16:55:37.363000+05:30"
      },
      {
        "set_number": 95,
        "start_game": "7980487",
        "end_game": "7980496",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T16:56:12.218000+05:30",
        "end_time": "2025-03-26T17:01:02.683000+05:30"
      },
      {
        "set_number": 96,
        "start_game": "7980497",
        "end_game": "7980506",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T17:01:17.080000+05:30",
        "end_time": "2025-03-26T17:06:16.229000+05:30"
      },
      {
        "set_number": 97,
        "start_game": "7980507",
        "end_game": "7980516",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T17:06:50.247000+05:30",
        "end_time": "2025-03-26T17:11:54.163000+05:30"
      },
      {
        "set_number": 98,
        "start_game": "7980517",
        "end_game": "7980526",
        "count": 2,
        "total_games": 10,
        "percentage": 20.0,
        "start_time": "2025-03-26T17:12:51.518000+05:30",
        "end_time": "2025-03-26T17:17:17.589000+05:30"
      },
      {
        "set_number": 99,
        "start_game": "7980527",
        "end_game": "7980536",
        "count": 1,
        "total_games": 10,
        "percentage": 10.0,
        "start_time": "2025-03-26T17:17:44.907000+05:30",
        "end_time": "2025-03-26T17:21:45.312000+05:30"
      },
      {
        "set_number": 100,
        "start_game": "7980537",
        "end_game": "7980546",
        "count": 0,
        "total_games": 10,
        "percentage": 0.0,
        "start_time": "2025-03-26T17:22:16.088000+05:30",
        "end_time": "2025-03-26T17:25:45.967000+05:30"
      }
    ]
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 21773  100 21773    0     0   4278      0  0:00:05  0:00:05 --:--:--  5610
{
  "status": "success",
  "data": {
    "min_value": 10.0,
    "games_per_set": 20,
    "total_games": 2000,
    "count": 100,
    "intervals": [
      {
        "set_number": 1,
        "start_game": "7978547",
        "end_game": "7978566",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T01:31:00.265000+05:30",
        "end_time": "2025-03-26T01:39:35.497000+05:30"
      },
      {
        "set_number": 2,
        "start_game": "7978567",
        "end_game": "7978586",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T01:39:55.197000+05:30",
        "end_time": "2025-03-26T01:48:32.089000+05:30"
      },
      {
        "set_number": 3,
        "start_game": "7978587",
        "end_game": "7978606",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T01:49:06.913000+05:30",
        "end_time": "2025-03-26T01:58:44.512000+05:30"
      },
      {
        "set_number": 4,
        "start_game": "7978607",
        "end_game": "7978626",
        "count": 4,
        "total_games": 20,
        "percentage": 20.0,
        "start_time": "2025-03-26T01:58:58.470000+05:30",
        "end_time": "2025-03-26T02:09:39.214000+05:30"
      },
      {
        "set_number": 5,
        "start_game": "7978627",
        "end_game": "7978646",
        "count": 0,
        "total_games": 20,
        "percentage": 0.0,
        "start_time": "2025-03-26T02:10:20.407000+05:30",
        "end_time": "2025-03-26T02:18:43.474000+05:30"
      },
      {
        "set_number": 6,
        "start_game": "7978647",
        "end_game": "7978666",
        "count": 4,
        "total_games": 20,
        "percentage": 20.0,
        "start_time": "2025-03-26T02:19:10.050000+05:30",
        "end_time": "2025-03-26T02:29:14.693000+05:30"
      },
      {
        "set_number": 7,
        "start_game": "7978667",
        "end_game": "7978686",
        "count": 0,
        "total_games": 20,
        "percentage": 0.0,
        "start_time": "2025-03-26T02:30:02.541000+05:30",
        "end_time": "2025-03-26T02:37:45.802000+05:30"
      },
      {
        "set_number": 8,
        "start_game": "7978687",
        "end_game": "7978706",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T02:38:15.483000+05:30",
        "end_time": "2025-03-26T02:46:32.362000+05:30"
      },
      {
        "set_number": 9,
        "start_game": "7978707",
        "end_game": "7978726",
        "count": 5,
        "total_games": 20,
        "percentage": 25.0,
        "start_time": "2025-03-26T02:47:50.563000+05:30",
        "end_time": "2025-03-26T02:57:33.755000+05:30"
      },
      {
        "set_number": 10,
        "start_game": "7978727",
        "end_game": "7978746",
        "count": 0,
        "total_games": 20,
        "percentage": 0.0,
        "start_time": "2025-03-26T02:57:52.026000+05:30",
        "end_time": "2025-03-26T03:04:27.121000+05:30"
      },
      {
        "set_number": 11,
        "start_game": "7978747",
        "end_game": "7978766",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0,
        "start_time": "2025-03-26T03:05:17.523000+05:30",
        "end_time": "2025-03-26T03:15:17.371000+05:30"
      },
      {
        "set_number": 12,
        "start_game": "7978767",
        "end_game": "7978786",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T03:15:47.170000+05:30",
        "end_time": "2025-03-26T03:24:30.085000+05:30"
      },
      {
        "set_number": 13,
        "start_game": "7978787",
        "end_game": "7978806",
        "count": 4,
        "total_games": 20,
        "percentage": 20.0,
        "start_time": "2025-03-26T03:24:55.402000+05:30",
        "end_time": "2025-03-26T03:35:45.702000+05:30"
      },
      {
        "set_number": 14,
        "start_game": "7978807",
        "end_game": "7978826",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T03:36:05.083000+05:30",
        "end_time": "2025-03-26T03:43:32.993000+05:30"
      },
      {
        "set_number": 15,
        "start_game": "7978827",
        "end_game": "7978846",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T03:43:50.521000+05:30",
        "end_time": "2025-03-26T03:52:33.138000+05:30"
      },
      {
        "set_number": 16,
        "start_game": "7978847",
        "end_game": "7978866",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T03:53:00.900000+05:30",
        "end_time": "2025-03-26T04:00:21.976000+05:30"
      },
      {
        "set_number": 17,
        "start_game": "7978867",
        "end_game": "7978886",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T04:00:35.069000+05:30",
        "end_time": "2025-03-26T04:08:49.198000+05:30"
      },
      {
        "set_number": 18,
        "start_game": "7978887",
        "end_game": "7978906",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0,
        "start_time": "2025-03-26T04:09:07.294000+05:30",
        "end_time": "2025-03-26T04:19:28.251000+05:30"
      },
      {
        "set_number": 19,
        "start_game": "7978907",
        "end_game": "7978926",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T04:20:06.711000+05:30",
        "end_time": "2025-03-26T04:28:34.491000+05:30"
      },
      {
        "set_number": 20,
        "start_game": "7978927",
        "end_game": "7978946",
        "count": 4,
        "total_games": 20,
        "percentage": 20.0,
        "start_time": "2025-03-26T04:28:52.297000+05:30",
        "end_time": "2025-03-26T04:37:56.450000+05:30"
      },
      {
        "set_number": 21,
        "start_game": "7978947",
        "end_game": "7978966",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0,
        "start_time": "2025-03-26T04:38:28.402000+05:30",
        "end_time": "2025-03-26T04:47:33.864000+05:30"
      },
      {
        "set_number": 22,
        "start_game": "7978967",
        "end_game": "7978986",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T04:48:03.933000+05:30",
        "end_time": "2025-03-26T04:55:52.271000+05:30"
      },
      {
        "set_number": 23,
        "start_game": "7978987",
        "end_game": "7979006",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T04:56:36.622000+05:30",
        "end_time": "2025-03-26T05:05:35.440000+05:30"
      },
      {
        "set_number": 24,
        "start_game": "7979007",
        "end_game": "7979026",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T05:05:48.846000+05:30",
        "end_time": "2025-03-26T05:15:28.241000+05:30"
      },
      {
        "set_number": 25,
        "start_game": "7979027",
        "end_game": "7979046",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T05:16:02.644000+05:30",
        "end_time": "2025-03-26T05:26:44.350000+05:30"
      },
      {
        "set_number": 26,
        "start_game": "7979047",
        "end_game": "7979066",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T05:26:56.593000+05:30",
        "end_time": "2025-03-26T05:34:41.396000+05:30"
      },
      {
        "set_number": 27,
        "start_game": "7979067",
        "end_game": "7979086",
        "count": 0,
        "total_games": 20,
        "percentage": 0.0,
        "start_time": "2025-03-26T05:34:56.692000+05:30",
        "end_time": "2025-03-26T05:42:55.247000+05:30"
      },
      {
        "set_number": 28,
        "start_game": "7979087",
        "end_game": "7979106",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T05:43:39.891000+05:30",
        "end_time": "2025-03-26T05:52:30.666000+05:30"
      },
      {
        "set_number": 29,
        "start_game": "7979107",
        "end_game": "7979126",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T05:53:02.300000+05:30",
        "end_time": "2025-03-26T06:02:54.079000+05:30"
      },
      {
        "set_number": 30,
        "start_game": "7979127",
        "end_game": "7979146",
        "count": 0,
        "total_games": 20,
        "percentage": 0.0,
        "start_time": "2025-03-26T06:03:09.005000+05:30",
        "end_time": "2025-03-26T06:09:55.927000+05:30"
      },
      {
        "set_number": 31,
        "start_game": "7979147",
        "end_game": "7979166",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T06:10:12.340000+05:30",
        "end_time": "2025-03-26T06:18:26.934000+05:30"
      },
      {
        "set_number": 32,
        "start_game": "7979167",
        "end_game": "7979186",
        "count": 5,
        "total_games": 20,
        "percentage": 25.0,
        "start_time": "2025-03-26T06:18:52.621000+05:30",
        "end_time": "2025-03-26T06:31:34.776000+05:30"
      },
      {
        "set_number": 33,
        "start_game": "7979187",
        "end_game": "7979206",
        "count": 5,
        "total_games": 20,
        "percentage": 25.0,
        "start_time": "2025-03-26T06:32:44.228000+05:30",
        "end_time": "2025-03-26T06:43:49.074000+05:30"
      },
      {
        "set_number": 34,
        "start_game": "7979207",
        "end_game": "7979226",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T06:44:05.233000+05:30",
        "end_time": "2025-03-26T06:51:49.514000+05:30"
      },
      {
        "set_number": 35,
        "start_game": "7979227",
        "end_game": "7979246",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T06:52:06.181000+05:30",
        "end_time": "2025-03-26T07:01:04.331000+05:30"
      },
      {
        "set_number": 36,
        "start_game": "7979247",
        "end_game": "7979266",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T07:01:36.229000+05:30",
        "end_time": "2025-03-26T07:11:29.788000+05:30"
      },
      {
        "set_number": 37,
        "start_game": "7979267",
        "end_game": "7979286",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T07:11:53.397000+05:30",
        "end_time": "2025-03-26T07:21:25.286000+05:30"
      },
      {
        "set_number": 38,
        "start_game": "7979287",
        "end_game": "7979306",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T07:21:53.198000+05:30",
        "end_time": "2025-03-26T07:31:09.811000+05:30"
      },
      {
        "set_number": 39,
        "start_game": "7979307",
        "end_game": "7979326",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T07:31:33.828000+05:30",
        "end_time": "2025-03-26T07:39:59.909000+05:30"
      },
      {
        "set_number": 40,
        "start_game": "7979327",
        "end_game": "7979346",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T07:41:13.397000+05:30",
        "end_time": "2025-03-26T07:48:55.351000+05:30"
      },
      {
        "set_number": 41,
        "start_game": "7979347",
        "end_game": "7979366",
        "count": 0,
        "total_games": 20,
        "percentage": 0.0,
        "start_time": "2025-03-26T07:49:10.431000+05:30",
        "end_time": "2025-03-26T07:55:26.019000+05:30"
      },
      {
        "set_number": 42,
        "start_game": "7979367",
        "end_game": "7979386",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T07:56:03.156000+05:30",
        "end_time": "2025-03-26T08:04:06.900000+05:30"
      },
      {
        "set_number": 43,
        "start_game": "7979387",
        "end_game": "7979406",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T08:04:19.674000+05:30",
        "end_time": "2025-03-26T08:14:16.606000+05:30"
      },
      {
        "set_number": 44,
        "start_game": "7979407",
        "end_game": "7979426",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T08:14:29.741000+05:30",
        "end_time": "2025-03-26T08:22:56.925000+05:30"
      },
      {
        "set_number": 45,
        "start_game": "7979427",
        "end_game": "7979446",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T08:23:34.141000+05:30",
        "end_time": "2025-03-26T08:32:03.057000+05:30"
      },
      {
        "set_number": 46,
        "start_game": "7979447",
        "end_game": "7979466",
        "count": 0,
        "total_games": 20,
        "percentage": 0.0,
        "start_time": "2025-03-26T08:32:16.866000+05:30",
        "end_time": "2025-03-26T08:40:34.646000+05:30"
      },
      {
        "set_number": 47,
        "start_game": "7979467",
        "end_game": "7979486",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T08:40:53.880000+05:30",
        "end_time": "2025-03-26T08:48:29.811000+05:30"
      },
      {
        "set_number": 48,
        "start_game": "7979487",
        "end_game": "7979506",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0,
        "start_time": "2025-03-26T08:48:44.297000+05:30",
        "end_time": "2025-03-26T08:58:11.606000+05:30"
      },
      {
        "set_number": 49,
        "start_game": "7979507",
        "end_game": "7979526",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T08:58:43.397000+05:30",
        "end_time": "2025-03-26T09:06:39.760000+05:30"
      },
      {
        "set_number": 50,
        "start_game": "7979527",
        "end_game": "7979546",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T09:06:57.224000+05:30",
        "end_time": "2025-03-26T09:15:01.447000+05:30"
      },
      {
        "set_number": 51,
        "start_game": "7979547",
        "end_game": "7979566",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T09:15:16.706000+05:30",
        "end_time": "2025-03-26T09:22:06.121000+05:30"
      },
      {
        "set_number": 52,
        "start_game": "7979567",
        "end_game": "7979586",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0,
        "start_time": "2025-03-26T09:22:19.087000+05:30",
        "end_time": "2025-03-26T09:32:02.242000+05:30"
      },
      {
        "set_number": 53,
        "start_game": "7979587",
        "end_game": "7979606",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T09:32:34.872000+05:30",
        "end_time": "2025-03-26T09:40:13.068000+05:30"
      },
      {
        "set_number": 54,
        "start_game": "7979607",
        "end_game": "7979626",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T09:40:29.611000+05:30",
        "end_time": "2025-03-26T09:50:17.879000+05:30"
      },
      {
        "set_number": 55,
        "start_game": "7979627",
        "end_game": "7979646",
        "count": 4,
        "total_games": 20,
        "percentage": 20.0,
        "start_time": "2025-03-26T09:51:02.901000+05:30",
        "end_time": "2025-03-26T10:01:50.119000+05:30"
      },
      {
        "set_number": 56,
        "start_game": "7979647",
        "end_game": "7979666",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T10:02:08.594000+05:30",
        "end_time": "2025-03-26T10:11:16.841000+05:30"
      },
      {
        "set_number": 57,
        "start_game": "7979667",
        "end_game": "7979686",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0,
        "start_time": "2025-03-26T10:11:36.235000+05:30",
        "end_time": "2025-03-26T10:22:06.306000+05:30"
      },
      {
        "set_number": 58,
        "start_game": "7979687",
        "end_game": "7979706",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0,
        "start_time": "2025-03-26T10:23:29.893000+05:30",
        "end_time": "2025-03-26T10:32:17.041000+05:30"
      },
      {
        "set_number": 59,
        "start_game": "7979707",
        "end_game": "7979726",
        "count": 0,
        "total_games": 20,
        "percentage": 0.0,
        "start_time": "2025-03-26T10:32:34.388000+05:30",
        "end_time": "2025-03-26T10:40:14.977000+05:30"
      },
      {
        "set_number": 60,
        "start_game": "7979727",
        "end_game": "7979746",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T10:40:28.870000+05:30",
        "end_time": "2025-03-26T10:48:48.078000+05:30"
      },
      {
        "set_number": 61,
        "start_game": "7979747",
        "end_game": "7979766",
        "count": 4,
        "total_games": 20,
        "percentage": 20.0,
        "start_time": "2025-03-26T10:49:03.690000+05:30",
        "end_time": "2025-03-26T11:00:41.922000+05:30"
      },
      {
        "set_number": 62,
        "start_game": "7979767",
        "end_game": "7979786",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T11:00:55.030000+05:30",
        "end_time": "2025-03-26T11:10:43.013000+05:30"
      },
      {
        "set_number": 63,
        "start_game": "7979787",
        "end_game": "7979806",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T11:11:00.057000+05:30",
        "end_time": "2025-03-26T11:18:33.159000+05:30"
      },
      {
        "set_number": 64,
        "start_game": "7979807",
        "end_game": "7979826",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T11:18:51.351000+05:30",
        "end_time": "2025-03-26T11:29:08.238000+05:30"
      },
      {
        "set_number": 65,
        "start_game": "7979827",
        "end_game": "7979846",
        "count": 0,
        "total_games": 20,
        "percentage": 0.0,
        "start_time": "2025-03-26T11:29:38.084000+05:30",
        "end_time": "2025-03-26T11:39:05.570000+05:30"
      },
      {
        "set_number": 66,
        "start_game": "7979847",
        "end_game": "7979866",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T11:39:29.613000+05:30",
        "end_time": "2025-03-26T11:47:31.409000+05:30"
      },
      {
        "set_number": 67,
        "start_game": "7979867",
        "end_game": "7979886",
        "count": 5,
        "total_games": 20,
        "percentage": 25.0,
        "start_time": "2025-03-26T11:47:50.055000+05:30",
        "end_time": "2025-03-26T11:59:29.511000+05:30"
      },
      {
        "set_number": 68,
        "start_game": "7979887",
        "end_game": "7979906",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T11:59:55.329000+05:30",
        "end_time": "2025-03-26T12:09:37.508000+05:30"
      },
      {
        "set_number": 69,
        "start_game": "7979907",
        "end_game": "7979926",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0,
        "start_time": "2025-03-26T12:10:02.641000+05:30",
        "end_time": "2025-03-26T12:20:10.011000+05:30"
      },
      {
        "set_number": 70,
        "start_game": "7979927",
        "end_game": "7979946",
        "count": 5,
        "total_games": 20,
        "percentage": 25.0,
        "start_time": "2025-03-26T12:21:20.030000+05:30",
        "end_time": "2025-03-26T12:30:40.698000+05:30"
      },
      {
        "set_number": 71,
        "start_game": "7979947",
        "end_game": "7979966",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T12:31:16.446000+05:30",
        "end_time": "2025-03-26T12:39:07.517000+05:30"
      },
      {
        "set_number": 72,
        "start_game": "7979967",
        "end_game": "7979986",
        "count": 4,
        "total_games": 20,
        "percentage": 20.0,
        "start_time": "2025-03-26T12:39:33.141000+05:30",
        "end_time": "2025-03-26T12:50:32.811000+05:30"
      },
      {
        "set_number": 73,
        "start_game": "7979987",
        "end_game": "7980006",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T12:51:06.671000+05:30",
        "end_time": "2025-03-26T13:01:09.436000+05:30"
      },
      {
        "set_number": 74,
        "start_game": "7980007",
        "end_game": "7980026",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T13:01:23.675000+05:30",
        "end_time": "2025-03-26T13:10:53.479000+05:30"
      },
      {
        "set_number": 75,
        "start_game": "7980027",
        "end_game": "7980046",
        "count": 7,
        "total_games": 20,
        "percentage": 35.0,
        "start_time": "2025-03-26T13:11:41.034000+05:30",
        "end_time": "2025-03-26T13:23:33.559000+05:30"
      },
      {
        "set_number": 76,
        "start_game": "7980047",
        "end_game": "7980066",
        "count": 0,
        "total_games": 20,
        "percentage": 0.0,
        "start_time": "2025-03-26T13:23:56.783000+05:30",
        "end_time": "2025-03-26T13:31:34.463000+05:30"
      },
      {
        "set_number": 77,
        "start_game": "7980067",
        "end_game": "7980086",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0,
        "start_time": "2025-03-26T13:32:31.934000+05:30",
        "end_time": "2025-03-26T13:42:07.614000+05:30"
      },
      {
        "set_number": 78,
        "start_game": "7980087",
        "end_game": "7980106",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T13:42:20.054000+05:30",
        "end_time": "2025-03-26T13:52:18.349000+05:30"
      },
      {
        "set_number": 79,
        "start_game": "7980107",
        "end_game": "7980126",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0,
        "start_time": "2025-03-26T13:52:30.083000+05:30",
        "end_time": "2025-03-26T14:01:23.644000+05:30"
      },
      {
        "set_number": 80,
        "start_game": "7980127",
        "end_game": "7980146",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T14:01:40.839000+05:30",
        "end_time": "2025-03-26T14:11:40.329000+05:30"
      },
      {
        "set_number": 81,
        "start_game": "7980147",
        "end_game": "7980166",
        "count": 5,
        "total_games": 20,
        "percentage": 25.0,
        "start_time": "2025-03-26T14:12:27.222000+05:30",
        "end_time": "2025-03-26T14:24:29.114000+05:30"
      },
      {
        "set_number": 82,
        "start_game": "7980167",
        "end_game": "7980186",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0,
        "start_time": "2025-03-26T14:25:41.535000+05:30",
        "end_time": "2025-03-26T14:35:29.065000+05:30"
      },
      {
        "set_number": 83,
        "start_game": "7980187",
        "end_game": "7980206",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0,
        "start_time": "2025-03-26T14:36:17.936000+05:30",
        "end_time": "2025-03-26T14:46:09.946000+05:30"
      },
      {
        "set_number": 84,
        "start_game": "7980207",
        "end_game": "7980226",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T14:46:37.915000+05:30",
        "end_time": "2025-03-26T14:55:15.966000+05:30"
      },
      {
        "set_number": 85,
        "start_game": "7980227",
        "end_game": "7980246",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T14:55:31.288000+05:30",
        "end_time": "2025-03-26T15:03:24.908000+05:30"
      },
      {
        "set_number": 86,
        "start_game": "7980247",
        "end_game": "7980266",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T15:03:50.351000+05:30",
        "end_time": "2025-03-26T15:13:26.277000+05:30"
      },
      {
        "set_number": 87,
        "start_game": "7980267",
        "end_game": "7980286",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T15:13:40.393000+05:30",
        "end_time": "2025-03-26T15:23:29.670000+05:30"
      },
      {
        "set_number": 88,
        "start_game": "7980287",
        "end_game": "7980306",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T15:23:47.626000+05:30",
        "end_time": "2025-03-26T15:31:00.506000+05:30"
      },
      {
        "set_number": 89,
        "start_game": "7980307",
        "end_game": "7980326",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T15:31:30.198000+05:30",
        "end_time": "2025-03-26T15:40:27.924000+05:30"
      },
      {
        "set_number": 90,
        "start_game": "7980327",
        "end_game": "7980346",
        "count": 4,
        "total_games": 20,
        "percentage": 20.0,
        "start_time": "2025-03-26T15:40:53.115000+05:30",
        "end_time": "2025-03-26T15:51:26.892000+05:30"
      },
      {
        "set_number": 91,
        "start_game": "7980347",
        "end_game": "7980366",
        "count": 0,
        "total_games": 20,
        "percentage": 0.0,
        "start_time": "2025-03-26T15:51:38.779000+05:30",
        "end_time": "2025-03-26T15:59:56.442000+05:30"
      },
      {
        "set_number": 92,
        "start_game": "7980367",
        "end_game": "7980386",
        "count": 4,
        "total_games": 20,
        "percentage": 20.0,
        "start_time": "2025-03-26T16:00:14.373000+05:30",
        "end_time": "2025-03-26T16:09:52.331000+05:30"
      },
      {
        "set_number": 93,
        "start_game": "7980387",
        "end_game": "7980406",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T16:10:46.161000+05:30",
        "end_time": "2025-03-26T16:18:16.503000+05:30"
      },
      {
        "set_number": 94,
        "start_game": "7980407",
        "end_game": "7980426",
        "count": 0,
        "total_games": 20,
        "percentage": 0.0,
        "start_time": "2025-03-26T16:18:57.937000+05:30",
        "end_time": "2025-03-26T16:27:06.933000+05:30"
      },
      {
        "set_number": 95,
        "start_game": "7980427",
        "end_game": "7980446",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T16:27:30.502000+05:30",
        "end_time": "2025-03-26T16:36:00.510000+05:30"
      },
      {
        "set_number": 96,
        "start_game": "7980447",
        "end_game": "7980466",
        "count": 4,
        "total_games": 20,
        "percentage": 20.0,
        "start_time": "2025-03-26T16:36:23.581000+05:30",
        "end_time": "2025-03-26T16:47:10.829000+05:30"
      },
      {
        "set_number": 97,
        "start_game": "7980467",
        "end_game": "7980486",
        "count": 2,
        "total_games": 20,
        "percentage": 10.0,
        "start_time": "2025-03-26T16:47:29.400000+05:30",
        "end_time": "2025-03-26T16:55:37.363000+05:30"
      },
      {
        "set_number": 98,
        "start_game": "7980487",
        "end_game": "7980506",
        "count": 3,
        "total_games": 20,
        "percentage": 15.0,
        "start_time": "2025-03-26T16:56:12.218000+05:30",
        "end_time": "2025-03-26T17:06:16.229000+05:30"
      },
      {
        "set_number": 99,
        "start_game": "7980507",
        "end_game": "7980526",
        "count": 4,
        "total_games": 20,
        "percentage": 20.0,
        "start_time": "2025-03-26T17:06:50.247000+05:30",
        "end_time": "2025-03-26T17:17:17.589000+05:30"
      },
      {
        "set_number": 100,
        "start_game": "7980527",
        "end_game": "7980546",
        "count": 1,
        "total_games": 20,
        "percentage": 5.0,
        "start_time": "2025-03-26T17:17:44.907000+05:30",
        "end_time": "2025-03-26T17:25:45.967000+05:30"
      }
    ]
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 60645  100 60566  100    79   9470     12  0:00:06  0:00:06 --:--:-- 14496
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
          "interval_start": "2025-03-25T17:15:00+05:30",
          "interval_end": "2025-03-25T17:30:00+05:30",
          "count": 16,
          "total_games": 30,
          "percentage": 53.333333333333336
        },
        {
          "interval_start": "2025-03-25T17:30:00+05:30",
          "interval_end": "2025-03-25T17:45:00+05:30",
          "count": 19,
          "total_games": 37,
          "percentage": 51.35135135135135
        },
        {
          "interval_start": "2025-03-25T17:45:00+05:30",
          "interval_end": "2025-03-25T18:00:00+05:30",
          "count": 15,
          "total_games": 24,
          "percentage": 62.5
        },
        {
          "interval_start": "2025-03-25T18:00:00+05:30",
          "interval_end": "2025-03-25T18:15:00+05:30",
          "count": 17,
          "total_games": 31,
          "percentage": 54.83870967741935
        },
        {
          "interval_start": "2025-03-25T18:15:00+05:30",
          "interval_end": "2025-03-25T18:30:00+05:30",
          "count": 11,
          "total_games": 32,
          "percentage": 34.375
        },
        {
          "interval_start": "2025-03-25T18:30:00+05:30",
          "interval_end": "2025-03-25T18:45:00+05:30",
          "count": 14,
          "total_games": 30,
          "percentage": 46.666666666666664
        },
        {
          "interval_start": "2025-03-25T18:45:00+05:30",
          "interval_end": "2025-03-25T19:00:00+05:30",
          "count": 13,
          "total_games": 38,
          "percentage": 34.21052631578947
        },
        {
          "interval_start": "2025-03-25T19:00:00+05:30",
          "interval_end": "2025-03-25T19:15:00+05:30",
          "count": 15,
          "total_games": 34,
          "percentage": 44.11764705882353
        },
        {
          "interval_start": "2025-03-25T19:15:00+05:30",
          "interval_end": "2025-03-25T19:30:00+05:30",
          "count": 20,
          "total_games": 30,
          "percentage": 66.66666666666666
        },
        {
          "interval_start": "2025-03-25T19:30:00+05:30",
          "interval_end": "2025-03-25T19:45:00+05:30",
          "count": 14,
          "total_games": 36,
          "percentage": 38.88888888888889
        },
        {
          "interval_start": "2025-03-25T19:45:00+05:30",
          "interval_end": "2025-03-25T20:00:00+05:30",
          "count": 14,
          "total_games": 34,
          "percentage": 41.17647058823529
        },
        {
          "interval_start": "2025-03-25T20:00:00+05:30",
          "interval_end": "2025-03-25T20:15:00+05:30",
          "count": 14,
          "total_games": 33,
          "percentage": 42.42424242424242
        },
        {
          "interval_start": "2025-03-25T20:15:00+05:30",
          "interval_end": "2025-03-25T20:30:00+05:30",
          "count": 19,
          "total_games": 29,
          "percentage": 65.51724137931035
        },
        {
          "interval_start": "2025-03-25T20:30:00+05:30",
          "interval_end": "2025-03-25T20:45:00+05:30",
          "count": 13,
          "total_games": 34,
          "percentage": 38.23529411764706
        },
        {
          "interval_start": "2025-03-25T20:45:00+05:30",
          "interval_end": "2025-03-25T21:00:00+05:30",
          "count": 12,
          "total_games": 34,
          "percentage": 35.294117647058826
        },
        {
          "interval_start": "2025-03-25T21:00:00+05:30",
          "interval_end": "2025-03-25T21:15:00+05:30",
          "count": 17,
          "total_games": 32,
          "percentage": 53.125
        },
        {
          "interval_start": "2025-03-25T21:15:00+05:30",
          "interval_end": "2025-03-25T21:30:00+05:30",
          "count": 12,
          "total_games": 36,
          "percentage": 33.33333333333333
        },
        {
          "interval_start": "2025-03-25T21:30:00+05:30",
          "interval_end": "2025-03-25T21:45:00+05:30",
          "count": 16,
          "total_games": 32,
          "percentage": 50.0
        },
        {
          "interval_start": "2025-03-25T21:45:00+05:30",
          "interval_end": "2025-03-25T22:00:00+05:30",
          "count": 13,
          "total_games": 26,
          "percentage": 50.0
        },
        {
          "interval_start": "2025-03-25T22:00:00+05:30",
          "interval_end": "2025-03-25T22:15:00+05:30",
          "count": 12,
          "total_games": 32,
          "percentage": 37.5
        },
        {
          "interval_start": "2025-03-25T22:15:00+05:30",
          "interval_end": "2025-03-25T22:30:00+05:30",
          "count": 17,
          "total_games": 37,
          "percentage": 45.94594594594595
        },
        {
          "interval_start": "2025-03-25T22:30:00+05:30",
          "interval_end": "2025-03-25T22:45:00+05:30",
          "count": 14,
          "total_games": 25,
          "percentage": 56.00000000000001
        },
        {
          "interval_start": "2025-03-25T22:45:00+05:30",
          "interval_end": "2025-03-25T23:00:00+05:30",
          "count": 17,
          "total_games": 28,
          "percentage": 60.71428571428571
        },
        {
          "interval_start": "2025-03-25T23:00:00+05:30",
          "interval_end": "2025-03-25T23:15:00+05:30",
          "count": 17,
          "total_games": 35,
          "percentage": 48.57142857142857
        },
        {
          "interval_start": "2025-03-25T23:15:00+05:30",
          "interval_end": "2025-03-25T23:30:00+05:30",
          "count": 16,
          "total_games": 35,
          "percentage": 45.714285714285715
        },
        {
          "interval_start": "2025-03-25T23:30:00+05:30",
          "interval_end": "2025-03-25T23:45:00+05:30",
          "count": 17,
          "total_games": 30,
          "percentage": 56.666666666666664
        },
        {
          "interval_start": "2025-03-25T23:45:00+05:30",
          "interval_end": "2025-03-26T00:00:00+05:30",
          "count": 16,
          "total_games": 31,
          "percentage": 51.61290322580645
        },
        {
          "interval_start": "2025-03-26T00:00:00+05:30",
          "interval_end": "2025-03-26T00:15:00+05:30",
          "count": 17,
          "total_games": 28,
          "percentage": 60.71428571428571
        },
        {
          "interval_start": "2025-03-26T00:15:00+05:30",
          "interval_end": "2025-03-26T00:30:00+05:30",
          "count": 17,
          "total_games": 29,
          "percentage": 58.620689655172406
        },
        {
          "interval_start": "2025-03-26T00:30:00+05:30",
          "interval_end": "2025-03-26T00:45:00+05:30",
          "count": 16,
          "total_games": 30,
          "percentage": 53.333333333333336
        },
        {
          "interval_start": "2025-03-26T00:45:00+05:30",
          "interval_end": "2025-03-26T01:00:00+05:30",
          "count": 18,
          "total_games": 35,
          "percentage": 51.42857142857142
        },
        {
          "interval_start": "2025-03-26T01:00:00+05:30",
          "interval_end": "2025-03-26T01:15:00+05:30",
          "count": 18,
          "total_games": 31,
          "percentage": 58.06451612903226
        },
        {
          "interval_start": "2025-03-26T01:15:00+05:30",
          "interval_end": "2025-03-26T01:30:00+05:30",
          "count": 15,
          "total_games": 31,
          "percentage": 48.38709677419355
        },
        {
          "interval_start": "2025-03-26T01:30:00+05:30",
          "interval_end": "2025-03-26T01:45:00+05:30",
          "count": 13,
          "total_games": 33,
          "percentage": 39.39393939393939
        },
        {
          "interval_start": "2025-03-26T01:45:00+05:30",
          "interval_end": "2025-03-26T02:00:00+05:30",
          "count": 17,
          "total_games": 32,
          "percentage": 53.125
        },
        {
          "interval_start": "2025-03-26T02:00:00+05:30",
          "interval_end": "2025-03-26T02:15:00+05:30",
          "count": 18,
          "total_games": 28,
          "percentage": 64.28571428571429
        },
        {
          "interval_start": "2025-03-26T02:15:00+05:30",
          "interval_end": "2025-03-26T02:30:00+05:30",
          "count": 14,
          "total_games": 29,
          "percentage": 48.275862068965516
        },
        {
          "interval_start": "2025-03-26T02:30:00+05:30",
          "interval_end": "2025-03-26T02:45:00+05:30",
          "count": 14,
          "total_games": 36,
          "percentage": 38.88888888888889
        },
        {
          "interval_start": "2025-03-26T02:45:00+05:30",
          "interval_end": "2025-03-26T03:00:00+05:30",
          "count": 15,
          "total_games": 31,
          "percentage": 48.38709677419355
        },
        {
          "interval_start": "2025-03-26T03:00:00+05:30",
          "interval_end": "2025-03-26T03:15:00+05:30",
          "count": 13,
          "total_games": 31,
          "percentage": 41.935483870967744
        },
        {
          "interval_start": "2025-03-26T03:15:00+05:30",
          "interval_end": "2025-03-26T03:30:00+05:30",
          "count": 17,
          "total_games": 29,
          "percentage": 58.620689655172406
        },
        {
          "interval_start": "2025-03-26T03:30:00+05:30",
          "interval_end": "2025-03-26T03:45:00+05:30",
          "count": 15,
          "total_games": 37,
          "percentage": 40.54054054054054
        },
        {
          "interval_start": "2025-03-26T03:45:00+05:30",
          "interval_end": "2025-03-26T04:00:00+05:30",
          "count": 13,
          "total_games": 34,
          "percentage": 38.23529411764706
        },
        {
          "interval_start": "2025-03-26T04:00:00+05:30",
          "interval_end": "2025-03-26T04:15:00+05:30",
          "count": 13,
          "total_games": 34,
          "percentage": 38.23529411764706
        },
        {
          "interval_start": "2025-03-26T04:15:00+05:30",
          "interval_end": "2025-03-26T04:30:00+05:30",
          "count": 13,
          "total_games": 31,
          "percentage": 41.935483870967744
        },
        {
          "interval_start": "2025-03-26T04:30:00+05:30",
          "interval_end": "2025-03-26T04:45:00+05:30",
          "count": 14,
          "total_games": 32,
          "percentage": 43.75
        },
        {
          "interval_start": "2025-03-26T04:45:00+05:30",
          "interval_end": "2025-03-26T05:00:00+05:30",
          "count": 15,
          "total_games": 34,
          "percentage": 44.11764705882353
        },
        {
          "interval_start": "2025-03-26T05:00:00+05:30",
          "interval_end": "2025-03-26T05:15:00+05:30",
          "count": 19,
          "total_games": 30,
          "percentage": 63.33333333333333
        },
        {
          "interval_start": "2025-03-26T05:15:00+05:30",
          "interval_end": "2025-03-26T05:30:00+05:30",
          "count": 16,
          "total_games": 31,
          "percentage": 51.61290322580645
        },
        {
          "interval_start": "2025-03-26T05:30:00+05:30",
          "interval_end": "2025-03-26T05:45:00+05:30",
          "count": 18,
          "total_games": 33,
          "percentage": 54.54545454545454
        },
        {
          "interval_start": "2025-03-26T05:45:00+05:30",
          "interval_end": "2025-03-26T06:00:00+05:30",
          "count": 18,
          "total_games": 30,
          "percentage": 60.0
        },
        {
          "interval_start": "2025-03-26T06:00:00+05:30",
          "interval_end": "2025-03-26T06:15:00+05:30",
          "count": 13,
          "total_games": 38,
          "percentage": 34.21052631578947
        },
        {
          "interval_start": "2025-03-26T06:15:00+05:30",
          "interval_end": "2025-03-26T06:30:00+05:30",
          "count": 15,
          "total_games": 26,
          "percentage": 57.692307692307686
        },
        {
          "interval_start": "2025-03-26T06:30:00+05:30",
          "interval_end": "2025-03-26T06:45:00+05:30",
          "count": 14,
          "total_games": 26,
          "percentage": 53.84615384615385
        },
        {
          "interval_start": "2025-03-26T06:45:00+05:30",
          "interval_end": "2025-03-26T07:00:00+05:30",
          "count": 17,
          "total_games": 34,
          "percentage": 50.0
        },
        {
          "interval_start": "2025-03-26T07:00:00+05:30",
          "interval_end": "2025-03-26T07:15:00+05:30",
          "count": 17,
          "total_games": 31,
          "percentage": 54.83870967741935
        },
        {
          "interval_start": "2025-03-26T07:15:00+05:30",
          "interval_end": "2025-03-26T07:30:00+05:30",
          "count": 18,
          "total_games": 29,
          "percentage": 62.06896551724138
        },
        {
          "interval_start": "2025-03-26T07:30:00+05:30",
          "interval_end": "2025-03-26T07:45:00+05:30",
          "count": 17,
          "total_games": 33,
          "percentage": 51.515151515151516
        },
        {
          "interval_start": "2025-03-26T07:45:00+05:30",
          "interval_end": "2025-03-26T08:00:00+05:30",
          "count": 12,
          "total_games": 44,
          "percentage": 27.27272727272727
        },
        {
          "interval_start": "2025-03-26T08:00:00+05:30",
          "interval_end": "2025-03-26T08:15:00+05:30",
          "count": 17,
          "total_games": 28,
          "percentage": 60.71428571428571
        },
        {
          "interval_start": "2025-03-26T08:15:00+05:30",
          "interval_end": "2025-03-26T08:30:00+05:30",
          "count": 16,
          "total_games": 33,
          "percentage": 48.484848484848484
        },
        {
          "interval_start": "2025-03-26T08:30:00+05:30",
          "interval_end": "2025-03-26T08:45:00+05:30",
          "count": 18,
          "total_games": 36,
          "percentage": 50.0
        },
        {
          "interval_start": "2025-03-26T08:45:00+05:30",
          "interval_end": "2025-03-26T09:00:00+05:30",
          "count": 17,
          "total_games": 33,
          "percentage": 51.515151515151516
        },
        {
          "interval_start": "2025-03-26T09:00:00+05:30",
          "interval_end": "2025-03-26T09:15:00+05:30",
          "count": 15,
          "total_games": 35,
          "percentage": 42.857142857142854
        },
        {
          "interval_start": "2025-03-26T09:15:00+05:30",
          "interval_end": "2025-03-26T09:30:00+05:30",
          "count": 12,
          "total_games": 38,
          "percentage": 31.57894736842105
        },
        {
          "interval_start": "2025-03-26T09:30:00+05:30",
          "interval_end": "2025-03-26T09:45:00+05:30",
          "count": 14,
          "total_games": 33,
          "percentage": 42.42424242424242
        },
        {
          "interval_start": "2025-03-26T09:45:00+05:30",
          "interval_end": "2025-03-26T10:00:00+05:30",
          "count": 19,
          "total_games": 25,
          "percentage": 76.0
        },
        {
          "interval_start": "2025-03-26T10:00:00+05:30",
          "interval_end": "2025-03-26T10:15:00+05:30",
          "count": 12,
          "total_games": 31,
          "percentage": 38.70967741935484
        },
        {
          "interval_start": "2025-03-26T10:15:00+05:30",
          "interval_end": "2025-03-26T10:30:00+05:30",
          "count": 17,
          "total_games": 28,
          "percentage": 60.71428571428571
        },
        {
          "interval_start": "2025-03-26T10:30:00+05:30",
          "interval_end": "2025-03-26T10:45:00+05:30",
          "count": 14,
          "total_games": 38,
          "percentage": 36.84210526315789
        },
        {
          "interval_start": "2025-03-26T10:45:00+05:30",
          "interval_end": "2025-03-26T11:00:00+05:30",
          "count": 14,
          "total_games": 26,
          "percentage": 53.84615384615385
        },
        {
          "interval_start": "2025-03-26T11:00:00+05:30",
          "interval_end": "2025-03-26T11:15:00+05:30",
          "count": 13,
          "total_games": 32,
          "percentage": 40.625
        },
        {
          "interval_start": "2025-03-26T11:15:00+05:30",
          "interval_end": "2025-03-26T11:30:00+05:30",
          "count": 17,
          "total_games": 31,
          "percentage": 54.83870967741935
        },
        {
          "interval_start": "2025-03-26T11:30:00+05:30",
          "interval_end": "2025-03-26T11:45:00+05:30",
          "count": 21,
          "total_games": 31,
          "percentage": 67.74193548387096
        },
        {
          "interval_start": "2025-03-26T11:45:00+05:30",
          "interval_end": "2025-03-26T12:00:00+05:30",
          "count": 16,
          "total_games": 29,
          "percentage": 55.172413793103445
        },
        {
          "interval_start": "2025-03-26T12:00:00+05:30",
          "interval_end": "2025-03-26T12:15:00+05:30",
          "count": 16,
          "total_games": 32,
          "percentage": 50.0
        },
        {
          "interval_start": "2025-03-26T12:15:00+05:30",
          "interval_end": "2025-03-26T12:30:00+05:30",
          "count": 16,
          "total_games": 25,
          "percentage": 64.0
        },
        {
          "interval_start": "2025-03-26T12:30:00+05:30",
          "interval_end": "2025-03-26T12:45:00+05:30",
          "count": 15,
          "total_games": 33,
          "percentage": 45.45454545454545
        },
        {
          "interval_start": "2025-03-26T12:45:00+05:30",
          "interval_end": "2025-03-26T13:00:00+05:30",
          "count": 18,
          "total_games": 26,
          "percentage": 69.23076923076923
        },
        {
          "interval_start": "2025-03-26T13:00:00+05:30",
          "interval_end": "2025-03-26T13:15:00+05:30",
          "count": 18,
          "total_games": 28,
          "percentage": 64.28571428571429
        },
        {
          "interval_start": "2025-03-26T13:15:00+05:30",
          "interval_end": "2025-03-26T13:30:00+05:30",
          "count": 16,
          "total_games": 31,
          "percentage": 51.61290322580645
        },
        {
          "interval_start": "2025-03-26T13:30:00+05:30",
          "interval_end": "2025-03-26T13:45:00+05:30",
          "count": 14,
          "total_games": 32,
          "percentage": 43.75
        },
        {
          "interval_start": "2025-03-26T13:45:00+05:30",
          "interval_end": "2025-03-26T14:00:00+05:30",
          "count": 16,
          "total_games": 28,
          "percentage": 57.14285714285714
        },
        {
          "interval_start": "2025-03-26T14:00:00+05:30",
          "interval_end": "2025-03-26T14:15:00+05:30",
          "count": 14,
          "total_games": 30,
          "percentage": 46.666666666666664
        },
        {
          "interval_start": "2025-03-26T14:15:00+05:30",
          "interval_end": "2025-03-26T14:30:00+05:30",
          "count": 14,
          "total_games": 24,
          "percentage": 58.333333333333336
        },
        {
          "interval_start": "2025-03-26T14:30:00+05:30",
          "interval_end": "2025-03-26T14:45:00+05:30",
          "count": 13,
          "total_games": 28,
          "percentage": 46.42857142857143
        },
        {
          "interval_start": "2025-03-26T14:45:00+05:30",
          "interval_end": "2025-03-26T15:00:00+05:30",
          "count": 14,
          "total_games": 33,
          "percentage": 42.42424242424242
        },
        {
          "interval_start": "2025-03-26T15:00:00+05:30",
          "interval_end": "2025-03-26T15:15:00+05:30",
          "count": 17,
          "total_games": 32,
          "percentage": 53.125
        },
        {
          "interval_start": "2025-03-26T15:15:00+05:30",
          "interval_end": "2025-03-26T15:30:00+05:30",
          "count": 15,
          "total_games": 33,
          "percentage": 45.45454545454545
        },
        {
          "interval_start": "2025-03-26T15:30:00+05:30",
          "interval_end": "2025-03-26T15:45:00+05:30",
          "count": 16,
          "total_games": 33,
          "percentage": 48.484848484848484
        },
        {
          "interval_start": "2025-03-26T15:45:00+05:30",
          "interval_end": "2025-03-26T16:00:00+05:30",
          "count": 16,
          "total_games": 31,
          "percentage": 51.61290322580645
        },
        {
          "interval_start": "2025-03-26T16:00:00+05:30",
          "interval_end": "2025-03-26T16:15:00+05:30",
          "count": 16,
          "total_games": 32,
          "percentage": 50.0
        },
        {
          "interval_start": "2025-03-26T16:15:00+05:30",
          "interval_end": "2025-03-26T16:30:00+05:30",
          "count": 17,
          "total_games": 33,
          "percentage": 51.515151515151516
        },
        {
          "interval_start": "2025-03-26T16:30:00+05:30",
          "interval_end": "2025-03-26T16:45:00+05:30",
          "count": 14,
          "total_games": 31,
          "percentage": 45.16129032258064
        },
        {
          "interval_start": "2025-03-26T16:45:00+05:30",
          "interval_end": "2025-03-26T17:00:00+05:30",
          "count": 16,
          "total_games": 31,
          "percentage": 51.61290322580645
        },
        {
          "interval_start": "2025-03-26T17:00:00+05:30",
          "interval_end": "2025-03-26T17:15:00+05:30",
          "count": 17,
          "total_games": 28,
          "percentage": 60.71428571428571
        },
        {
          "interval_start": "2025-03-26T17:15:00+05:30",
          "interval_end": "2025-03-26T17:30:00+05:30",
          "count": 11,
          "total_games": 25,
          "percentage": 44.0
        }
      ],
      "5.0": [
        {
          "interval_start": "2025-03-25T17:15:00+05:30",
          "interval_end": "2025-03-25T17:30:00+05:30",
          "count": 7,
          "total_games": 30,
          "percentage": 23.333333333333332
        },
        {
          "interval_start": "2025-03-25T17:30:00+05:30",
          "interval_end": "2025-03-25T17:45:00+05:30",
          "count": 3,
          "total_games": 37,
          "percentage": 8.108108108108109
        },
        {
          "interval_start": "2025-03-25T17:45:00+05:30",
          "interval_end": "2025-03-25T18:00:00+05:30",
          "count": 10,
          "total_games": 24,
          "percentage": 41.66666666666667
        },
        {
          "interval_start": "2025-03-25T18:00:00+05:30",
          "interval_end": "2025-03-25T18:15:00+05:30",
          "count": 9,
          "total_games": 31,
          "percentage": 29.03225806451613
        },
        {
          "interval_start": "2025-03-25T18:15:00+05:30",
          "interval_end": "2025-03-25T18:30:00+05:30",
          "count": 5,
          "total_games": 32,
          "percentage": 15.625
        },
        {
          "interval_start": "2025-03-25T18:30:00+05:30",
          "interval_end": "2025-03-25T18:45:00+05:30",
          "count": 6,
          "total_games": 30,
          "percentage": 20.0
        },
        {
          "interval_start": "2025-03-25T18:45:00+05:30",
          "interval_end": "2025-03-25T19:00:00+05:30",
          "count": 5,
          "total_games": 38,
          "percentage": 13.157894736842104
        },
        {
          "interval_start": "2025-03-25T19:00:00+05:30",
          "interval_end": "2025-03-25T19:15:00+05:30",
          "count": 4,
          "total_games": 34,
          "percentage": 11.76470588235294
        },
        {
          "interval_start": "2025-03-25T19:15:00+05:30",
          "interval_end": "2025-03-25T19:30:00+05:30",
          "count": 5,
          "total_games": 30,
          "percentage": 16.666666666666664
        },
        {
          "interval_start": "2025-03-25T19:30:00+05:30",
          "interval_end": "2025-03-25T19:45:00+05:30",
          "count": 6,
          "total_games": 36,
          "percentage": 16.666666666666664
        },
        {
          "interval_start": "2025-03-25T19:45:00+05:30",
          "interval_end": "2025-03-25T20:00:00+05:30",
          "count": 3,
          "total_games": 34,
          "percentage": 8.823529411764707
        },
        {
          "interval_start": "2025-03-25T20:00:00+05:30",
          "interval_end": "2025-03-25T20:15:00+05:30",
          "count": 7,
          "total_games": 33,
          "percentage": 21.21212121212121
        },
        {
          "interval_start": "2025-03-25T20:15:00+05:30",
          "interval_end": "2025-03-25T20:30:00+05:30",
          "count": 8,
          "total_games": 29,
          "percentage": 27.586206896551722
        },
        {
          "interval_start": "2025-03-25T20:30:00+05:30",
          "interval_end": "2025-03-25T20:45:00+05:30",
          "count": 5,
          "total_games": 34,
          "percentage": 14.705882352941178
        },
        {
          "interval_start": "2025-03-25T20:45:00+05:30",
          "interval_end": "2025-03-25T21:00:00+05:30",
          "count": 6,
          "total_games": 34,
          "percentage": 17.647058823529413
        },
        {
          "interval_start": "2025-03-25T21:00:00+05:30",
          "interval_end": "2025-03-25T21:15:00+05:30",
          "count": 7,
          "total_games": 32,
          "percentage": 21.875
        },
        {
          "interval_start": "2025-03-25T21:15:00+05:30",
          "interval_end": "2025-03-25T21:30:00+05:30",
          "count": 6,
          "total_games": 36,
          "percentage": 16.666666666666664
        },
        {
          "interval_start": "2025-03-25T21:30:00+05:30",
          "interval_end": "2025-03-25T21:45:00+05:30",
          "count": 4,
          "total_games": 32,
          "percentage": 12.5
        },
        {
          "interval_start": "2025-03-25T21:45:00+05:30",
          "interval_end": "2025-03-25T22:00:00+05:30",
          "count": 10,
          "total_games": 26,
          "percentage": 38.46153846153847
        },
        {
          "interval_start": "2025-03-25T22:00:00+05:30",
          "interval_end": "2025-03-25T22:15:00+05:30",
          "count": 6,
          "total_games": 32,
          "percentage": 18.75
        },
        {
          "interval_start": "2025-03-25T22:15:00+05:30",
          "interval_end": "2025-03-25T22:30:00+05:30",
          "count": 5,
          "total_games": 37,
          "percentage": 13.513513513513514
        },
        {
          "interval_start": "2025-03-25T22:30:00+05:30",
          "interval_end": "2025-03-25T22:45:00+05:30",
          "count": 7,
          "total_games": 25,
          "percentage": 28.000000000000004
        },
        {
          "interval_start": "2025-03-25T22:45:00+05:30",
          "interval_end": "2025-03-25T23:00:00+05:30",
          "count": 7,
          "total_games": 28,
          "percentage": 25.0
        },
        {
          "interval_start": "2025-03-25T23:00:00+05:30",
          "interval_end": "2025-03-25T23:15:00+05:30",
          "count": 7,
          "total_games": 35,
          "percentage": 20.0
        },
        {
          "interval_start": "2025-03-25T23:15:00+05:30",
          "interval_end": "2025-03-25T23:30:00+05:30",
          "count": 4,
          "total_games": 35,
          "percentage": 11.428571428571429
        },
        {
          "interval_start": "2025-03-25T23:30:00+05:30",
          "interval_end": "2025-03-25T23:45:00+05:30",
          "count": 6,
          "total_games": 30,
          "percentage": 20.0
        },
        {
          "interval_start": "2025-03-25T23:45:00+05:30",
          "interval_end": "2025-03-26T00:00:00+05:30",
          "count": 9,
          "total_games": 31,
          "percentage": 29.03225806451613
        },
        {
          "interval_start": "2025-03-26T00:00:00+05:30",
          "interval_end": "2025-03-26T00:15:00+05:30",
          "count": 9,
          "total_games": 28,
          "percentage": 32.142857142857146
        },
        {
          "interval_start": "2025-03-26T00:15:00+05:30",
          "interval_end": "2025-03-26T00:30:00+05:30",
          "count": 8,
          "total_games": 29,
          "percentage": 27.586206896551722
        },
        {
          "interval_start": "2025-03-26T00:30:00+05:30",
          "interval_end": "2025-03-26T00:45:00+05:30",
          "count": 10,
          "total_games": 30,
          "percentage": 33.33333333333333
        },
        {
          "interval_start": "2025-03-26T00:45:00+05:30",
          "interval_end": "2025-03-26T01:00:00+05:30",
          "count": 6,
          "total_games": 35,
          "percentage": 17.142857142857142
        },
        {
          "interval_start": "2025-03-26T01:00:00+05:30",
          "interval_end": "2025-03-26T01:15:00+05:30",
          "count": 7,
          "total_games": 31,
          "percentage": 22.58064516129032
        },
        {
          "interval_start": "2025-03-26T01:15:00+05:30",
          "interval_end": "2025-03-26T01:30:00+05:30",
          "count": 5,
          "total_games": 31,
          "percentage": 16.129032258064516
        },
        {
          "interval_start": "2025-03-26T01:30:00+05:30",
          "interval_end": "2025-03-26T01:45:00+05:30",
          "count": 4,
          "total_games": 33,
          "percentage": 12.121212121212121
        },
        {
          "interval_start": "2025-03-26T01:45:00+05:30",
          "interval_end": "2025-03-26T02:00:00+05:30",
          "count": 6,
          "total_games": 32,
          "percentage": 18.75
        },
        {
          "interval_start": "2025-03-26T02:00:00+05:30",
          "interval_end": "2025-03-26T02:15:00+05:30",
          "count": 8,
          "total_games": 28,
          "percentage": 28.57142857142857
        },
        {
          "interval_start": "2025-03-26T02:15:00+05:30",
          "interval_end": "2025-03-26T02:30:00+05:30",
          "count": 6,
          "total_games": 29,
          "percentage": 20.689655172413794
        },
        {
          "interval_start": "2025-03-26T02:30:00+05:30",
          "interval_end": "2025-03-26T02:45:00+05:30",
          "count": 7,
          "total_games": 36,
          "percentage": 19.444444444444446
        },
        {
          "interval_start": "2025-03-26T02:45:00+05:30",
          "interval_end": "2025-03-26T03:00:00+05:30",
          "count": 6,
          "total_games": 31,
          "percentage": 19.35483870967742
        },
        {
          "interval_start": "2025-03-26T03:00:00+05:30",
          "interval_end": "2025-03-26T03:15:00+05:30",
          "count": 8,
          "total_games": 31,
          "percentage": 25.806451612903224
        },
        {
          "interval_start": "2025-03-26T03:15:00+05:30",
          "interval_end": "2025-03-26T03:30:00+05:30",
          "count": 7,
          "total_games": 29,
          "percentage": 24.137931034482758
        },
        {
          "interval_start": "2025-03-26T03:30:00+05:30",
          "interval_end": "2025-03-26T03:45:00+05:30",
          "count": 5,
          "total_games": 37,
          "percentage": 13.513513513513514
        },
        {
          "interval_start": "2025-03-26T03:45:00+05:30",
          "interval_end": "2025-03-26T04:00:00+05:30",
          "count": 5,
          "total_games": 34,
          "percentage": 14.705882352941178
        },
        {
          "interval_start": "2025-03-26T04:00:00+05:30",
          "interval_end": "2025-03-26T04:15:00+05:30",
          "count": 6,
          "total_games": 34,
          "percentage": 17.647058823529413
        },
        {
          "interval_start": "2025-03-26T04:15:00+05:30",
          "interval_end": "2025-03-26T04:30:00+05:30",
          "count": 5,
          "total_games": 31,
          "percentage": 16.129032258064516
        },
        {
          "interval_start": "2025-03-26T04:30:00+05:30",
          "interval_end": "2025-03-26T04:45:00+05:30",
          "count": 8,
          "total_games": 32,
          "percentage": 25.0
        },
        {
          "interval_start": "2025-03-26T04:45:00+05:30",
          "interval_end": "2025-03-26T05:00:00+05:30",
          "count": 7,
          "total_games": 34,
          "percentage": 20.588235294117645
        },
        {
          "interval_start": "2025-03-26T05:00:00+05:30",
          "interval_end": "2025-03-26T05:15:00+05:30",
          "count": 4,
          "total_games": 30,
          "percentage": 13.333333333333334
        },
        {
          "interval_start": "2025-03-26T05:15:00+05:30",
          "interval_end": "2025-03-26T05:30:00+05:30",
          "count": 6,
          "total_games": 31,
          "percentage": 19.35483870967742
        },
        {
          "interval_start": "2025-03-26T05:30:00+05:30",
          "interval_end": "2025-03-26T05:45:00+05:30",
          "count": 7,
          "total_games": 33,
          "percentage": 21.21212121212121
        },
        {
          "interval_start": "2025-03-26T05:45:00+05:30",
          "interval_end": "2025-03-26T06:00:00+05:30",
          "count": 6,
          "total_games": 30,
          "percentage": 20.0
        },
        {
          "interval_start": "2025-03-26T06:00:00+05:30",
          "interval_end": "2025-03-26T06:15:00+05:30",
          "count": 6,
          "total_games": 38,
          "percentage": 15.789473684210526
        },
        {
          "interval_start": "2025-03-26T06:15:00+05:30",
          "interval_end": "2025-03-26T06:30:00+05:30",
          "count": 9,
          "total_games": 26,
          "percentage": 34.61538461538461
        },
        {
          "interval_start": "2025-03-26T06:30:00+05:30",
          "interval_end": "2025-03-26T06:45:00+05:30",
          "count": 9,
          "total_games": 26,
          "percentage": 34.61538461538461
        },
        {
          "interval_start": "2025-03-26T06:45:00+05:30",
          "interval_end": "2025-03-26T07:00:00+05:30",
          "count": 7,
          "total_games": 34,
          "percentage": 20.588235294117645
        },
        {
          "interval_start": "2025-03-26T07:00:00+05:30",
          "interval_end": "2025-03-26T07:15:00+05:30",
          "count": 6,
          "total_games": 31,
          "percentage": 19.35483870967742
        },
        {
          "interval_start": "2025-03-26T07:15:00+05:30",
          "interval_end": "2025-03-26T07:30:00+05:30",
          "count": 9,
          "total_games": 29,
          "percentage": 31.03448275862069
        },
        {
          "interval_start": "2025-03-26T07:30:00+05:30",
          "interval_end": "2025-03-26T07:45:00+05:30",
          "count": 6,
          "total_games": 33,
          "percentage": 18.181818181818183
        },
        {
          "interval_start": "2025-03-26T07:45:00+05:30",
          "interval_end": "2025-03-26T08:00:00+05:30",
          "count": 2,
          "total_games": 44,
          "percentage": 4.545454545454546
        },
        {
          "interval_start": "2025-03-26T08:00:00+05:30",
          "interval_end": "2025-03-26T08:15:00+05:30",
          "count": 9,
          "total_games": 28,
          "percentage": 32.142857142857146
        },
        {
          "interval_start": "2025-03-26T08:15:00+05:30",
          "interval_end": "2025-03-26T08:30:00+05:30",
          "count": 6,
          "total_games": 33,
          "percentage": 18.181818181818183
        },
        {
          "interval_start": "2025-03-26T08:30:00+05:30",
          "interval_end": "2025-03-26T08:45:00+05:30",
          "count": 4,
          "total_games": 36,
          "percentage": 11.11111111111111
        },
        {
          "interval_start": "2025-03-26T08:45:00+05:30",
          "interval_end": "2025-03-26T09:00:00+05:30",
          "count": 5,
          "total_games": 33,
          "percentage": 15.151515151515152
        },
        {
          "interval_start": "2025-03-26T09:00:00+05:30",
          "interval_end": "2025-03-26T09:15:00+05:30",
          "count": 5,
          "total_games": 35,
          "percentage": 14.285714285714285
        },
        {
          "interval_start": "2025-03-26T09:15:00+05:30",
          "interval_end": "2025-03-26T09:30:00+05:30",
          "count": 5,
          "total_games": 38,
          "percentage": 13.157894736842104
        },
        {
          "interval_start": "2025-03-26T09:30:00+05:30",
          "interval_end": "2025-03-26T09:45:00+05:30",
          "count": 6,
          "total_games": 33,
          "percentage": 18.181818181818183
        },
        {
          "interval_start": "2025-03-26T09:45:00+05:30",
          "interval_end": "2025-03-26T10:00:00+05:30",
          "count": 7,
          "total_games": 25,
          "percentage": 28.000000000000004
        },
        {
          "interval_start": "2025-03-26T10:00:00+05:30",
          "interval_end": "2025-03-26T10:15:00+05:30",
          "count": 7,
          "total_games": 31,
          "percentage": 22.58064516129032
        },
        {
          "interval_start": "2025-03-26T10:15:00+05:30",
          "interval_end": "2025-03-26T10:30:00+05:30",
          "count": 8,
          "total_games": 28,
          "percentage": 28.57142857142857
        },
        {
          "interval_start": "2025-03-26T10:30:00+05:30",
          "interval_end": "2025-03-26T10:45:00+05:30",
          "count": 5,
          "total_games": 38,
          "percentage": 13.157894736842104
        },
        {
          "interval_start": "2025-03-26T10:45:00+05:30",
          "interval_end": "2025-03-26T11:00:00+05:30",
          "count": 10,
          "total_games": 26,
          "percentage": 38.46153846153847
        },
        {
          "interval_start": "2025-03-26T11:00:00+05:30",
          "interval_end": "2025-03-26T11:15:00+05:30",
          "count": 4,
          "total_games": 32,
          "percentage": 12.5
        },
        {
          "interval_start": "2025-03-26T11:15:00+05:30",
          "interval_end": "2025-03-26T11:30:00+05:30",
          "count": 6,
          "total_games": 31,
          "percentage": 19.35483870967742
        },
        {
          "interval_start": "2025-03-26T11:30:00+05:30",
          "interval_end": "2025-03-26T11:45:00+05:30",
          "count": 7,
          "total_games": 31,
          "percentage": 22.58064516129032
        },
        {
          "interval_start": "2025-03-26T11:45:00+05:30",
          "interval_end": "2025-03-26T12:00:00+05:30",
          "count": 9,
          "total_games": 29,
          "percentage": 31.03448275862069
        },
        {
          "interval_start": "2025-03-26T12:00:00+05:30",
          "interval_end": "2025-03-26T12:15:00+05:30",
          "count": 4,
          "total_games": 32,
          "percentage": 12.5
        },
        {
          "interval_start": "2025-03-26T12:15:00+05:30",
          "interval_end": "2025-03-26T12:30:00+05:30",
          "count": 9,
          "total_games": 25,
          "percentage": 36.0
        },
        {
          "interval_start": "2025-03-26T12:30:00+05:30",
          "interval_end": "2025-03-26T12:45:00+05:30",
          "count": 5,
          "total_games": 33,
          "percentage": 15.151515151515152
        },
        {
          "interval_start": "2025-03-26T12:45:00+05:30",
          "interval_end": "2025-03-26T13:00:00+05:30",
          "count": 9,
          "total_games": 26,
          "percentage": 34.61538461538461
        },
        {
          "interval_start": "2025-03-26T13:00:00+05:30",
          "interval_end": "2025-03-26T13:15:00+05:30",
          "count": 6,
          "total_games": 28,
          "percentage": 21.428571428571427
        },
        {
          "interval_start": "2025-03-26T13:15:00+05:30",
          "interval_end": "2025-03-26T13:30:00+05:30",
          "count": 6,
          "total_games": 31,
          "percentage": 19.35483870967742
        },
        {
          "interval_start": "2025-03-26T13:30:00+05:30",
          "interval_end": "2025-03-26T13:45:00+05:30",
          "count": 6,
          "total_games": 32,
          "percentage": 18.75
        },
        {
          "interval_start": "2025-03-26T13:45:00+05:30",
          "interval_end": "2025-03-26T14:00:00+05:30",
          "count": 8,
          "total_games": 28,
          "percentage": 28.57142857142857
        },
        {
          "interval_start": "2025-03-26T14:00:00+05:30",
          "interval_end": "2025-03-26T14:15:00+05:30",
          "count": 6,
          "total_games": 30,
          "percentage": 20.0
        },
        {
          "interval_start": "2025-03-26T14:15:00+05:30",
          "interval_end": "2025-03-26T14:30:00+05:30",
          "count": 9,
          "total_games": 24,
          "percentage": 37.5
        },
        {
          "interval_start": "2025-03-26T14:30:00+05:30",
          "interval_end": "2025-03-26T14:45:00+05:30",
          "count": 8,
          "total_games": 28,
          "percentage": 28.57142857142857
        },
        {
          "interval_start": "2025-03-26T14:45:00+05:30",
          "interval_end": "2025-03-26T15:00:00+05:30",
          "count": 6,
          "total_games": 33,
          "percentage": 18.181818181818183
        },
        {
          "interval_start": "2025-03-26T15:00:00+05:30",
          "interval_end": "2025-03-26T15:15:00+05:30",
          "count": 6,
          "total_games": 32,
          "percentage": 18.75
        },
        {
          "interval_start": "2025-03-26T15:15:00+05:30",
          "interval_end": "2025-03-26T15:30:00+05:30",
          "count": 6,
          "total_games": 33,
          "percentage": 18.181818181818183
        },
        {
          "interval_start": "2025-03-26T15:30:00+05:30",
          "interval_end": "2025-03-26T15:45:00+05:30",
          "count": 4,
          "total_games": 33,
          "percentage": 12.121212121212121
        },
        {
          "interval_start": "2025-03-26T15:45:00+05:30",
          "interval_end": "2025-03-26T16:00:00+05:30",
          "count": 8,
          "total_games": 31,
          "percentage": 25.806451612903224
        },
        {
          "interval_start": "2025-03-26T16:00:00+05:30",
          "interval_end": "2025-03-26T16:15:00+05:30",
          "count": 6,
          "total_games": 32,
          "percentage": 18.75
        },
        {
          "interval_start": "2025-03-26T16:15:00+05:30",
          "interval_end": "2025-03-26T16:30:00+05:30",
          "count": 7,
          "total_games": 33,
          "percentage": 21.21212121212121
        },
        {
          "interval_start": "2025-03-26T16:30:00+05:30",
          "interval_end": "2025-03-26T16:45:00+05:30",
          "count": 6,
          "total_games": 31,
          "percentage": 19.35483870967742
        },
        {
          "interval_start": "2025-03-26T16:45:00+05:30",
          "interval_end": "2025-03-26T17:00:00+05:30",
          "count": 5,
          "total_games": 31,
          "percentage": 16.129032258064516
        },
        {
          "interval_start": "2025-03-26T17:00:00+05:30",
          "interval_end": "2025-03-26T17:15:00+05:30",
          "count": 6,
          "total_games": 28,
          "percentage": 21.428571428571427
        },
        {
          "interval_start": "2025-03-26T17:15:00+05:30",
          "interval_end": "2025-03-26T17:30:00+05:30",
          "count": 2,
          "total_games": 25,
          "percentage": 8.0
        }
      ],
      "10.0": [
        {
          "interval_start": "2025-03-25T17:15:00+05:30",
          "interval_end": "2025-03-25T17:30:00+05:30",
          "count": 4,
          "total_games": 30,
          "percentage": 13.333333333333334
        },
        {
          "interval_start": "2025-03-25T17:30:00+05:30",
          "interval_end": "2025-03-25T17:45:00+05:30",
          "count": 0,
          "total_games": 37,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-03-25T17:45:00+05:30",
          "interval_end": "2025-03-25T18:00:00+05:30",
          "count": 5,
          "total_games": 24,
          "percentage": 20.833333333333336
        },
        {
          "interval_start": "2025-03-25T18:00:00+05:30",
          "interval_end": "2025-03-25T18:15:00+05:30",
          "count": 4,
          "total_games": 31,
          "percentage": 12.903225806451612
        },
        {
          "interval_start": "2025-03-25T18:15:00+05:30",
          "interval_end": "2025-03-25T18:30:00+05:30",
          "count": 4,
          "total_games": 32,
          "percentage": 12.5
        },
        {
          "interval_start": "2025-03-25T18:30:00+05:30",
          "interval_end": "2025-03-25T18:45:00+05:30",
          "count": 4,
          "total_games": 30,
          "percentage": 13.333333333333334
        },
        {
          "interval_start": "2025-03-25T18:45:00+05:30",
          "interval_end": "2025-03-25T19:00:00+05:30",
          "count": 3,
          "total_games": 38,
          "percentage": 7.894736842105263
        },
        {
          "interval_start": "2025-03-25T19:00:00+05:30",
          "interval_end": "2025-03-25T19:15:00+05:30",
          "count": 3,
          "total_games": 34,
          "percentage": 8.823529411764707
        },
        {
          "interval_start": "2025-03-25T19:15:00+05:30",
          "interval_end": "2025-03-25T19:30:00+05:30",
          "count": 4,
          "total_games": 30,
          "percentage": 13.333333333333334
        },
        {
          "interval_start": "2025-03-25T19:30:00+05:30",
          "interval_end": "2025-03-25T19:45:00+05:30",
          "count": 4,
          "total_games": 36,
          "percentage": 11.11111111111111
        },
        {
          "interval_start": "2025-03-25T19:45:00+05:30",
          "interval_end": "2025-03-25T20:00:00+05:30",
          "count": 3,
          "total_games": 34,
          "percentage": 8.823529411764707
        },
        {
          "interval_start": "2025-03-25T20:00:00+05:30",
          "interval_end": "2025-03-25T20:15:00+05:30",
          "count": 2,
          "total_games": 33,
          "percentage": 6.0606060606060606
        },
        {
          "interval_start": "2025-03-25T20:15:00+05:30",
          "interval_end": "2025-03-25T20:30:00+05:30",
          "count": 3,
          "total_games": 29,
          "percentage": 10.344827586206897
        },
        {
          "interval_start": "2025-03-25T20:30:00+05:30",
          "interval_end": "2025-03-25T20:45:00+05:30",
          "count": 3,
          "total_games": 34,
          "percentage": 8.823529411764707
        },
        {
          "interval_start": "2025-03-25T20:45:00+05:30",
          "interval_end": "2025-03-25T21:00:00+05:30",
          "count": 3,
          "total_games": 34,
          "percentage": 8.823529411764707
        },
        {
          "interval_start": "2025-03-25T21:00:00+05:30",
          "interval_end": "2025-03-25T21:15:00+05:30",
          "count": 3,
          "total_games": 32,
          "percentage": 9.375
        },
        {
          "interval_start": "2025-03-25T21:15:00+05:30",
          "interval_end": "2025-03-25T21:30:00+05:30",
          "count": 4,
          "total_games": 36,
          "percentage": 11.11111111111111
        },
        {
          "interval_start": "2025-03-25T21:30:00+05:30",
          "interval_end": "2025-03-25T21:45:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        },
        {
          "interval_start": "2025-03-25T21:45:00+05:30",
          "interval_end": "2025-03-25T22:00:00+05:30",
          "count": 7,
          "total_games": 26,
          "percentage": 26.923076923076923
        },
        {
          "interval_start": "2025-03-25T22:00:00+05:30",
          "interval_end": "2025-03-25T22:15:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        },
        {
          "interval_start": "2025-03-25T22:15:00+05:30",
          "interval_end": "2025-03-25T22:30:00+05:30",
          "count": 1,
          "total_games": 37,
          "percentage": 2.7027027027027026
        },
        {
          "interval_start": "2025-03-25T22:30:00+05:30",
          "interval_end": "2025-03-25T22:45:00+05:30",
          "count": 4,
          "total_games": 25,
          "percentage": 16.0
        },
        {
          "interval_start": "2025-03-25T22:45:00+05:30",
          "interval_end": "2025-03-25T23:00:00+05:30",
          "count": 4,
          "total_games": 28,
          "percentage": 14.285714285714285
        },
        {
          "interval_start": "2025-03-25T23:00:00+05:30",
          "interval_end": "2025-03-25T23:15:00+05:30",
          "count": 3,
          "total_games": 35,
          "percentage": 8.571428571428571
        },
        {
          "interval_start": "2025-03-25T23:15:00+05:30",
          "interval_end": "2025-03-25T23:30:00+05:30",
          "count": 2,
          "total_games": 35,
          "percentage": 5.714285714285714
        },
        {
          "interval_start": "2025-03-25T23:30:00+05:30",
          "interval_end": "2025-03-25T23:45:00+05:30",
          "count": 1,
          "total_games": 30,
          "percentage": 3.3333333333333335
        },
        {
          "interval_start": "2025-03-25T23:45:00+05:30",
          "interval_end": "2025-03-26T00:00:00+05:30",
          "count": 3,
          "total_games": 31,
          "percentage": 9.67741935483871
        },
        {
          "interval_start": "2025-03-26T00:00:00+05:30",
          "interval_end": "2025-03-26T00:15:00+05:30",
          "count": 5,
          "total_games": 28,
          "percentage": 17.857142857142858
        },
        {
          "interval_start": "2025-03-26T00:15:00+05:30",
          "interval_end": "2025-03-26T00:30:00+05:30",
          "count": 6,
          "total_games": 29,
          "percentage": 20.689655172413794
        },
        {
          "interval_start": "2025-03-26T00:30:00+05:30",
          "interval_end": "2025-03-26T00:45:00+05:30",
          "count": 4,
          "total_games": 30,
          "percentage": 13.333333333333334
        },
        {
          "interval_start": "2025-03-26T00:45:00+05:30",
          "interval_end": "2025-03-26T01:00:00+05:30",
          "count": 2,
          "total_games": 35,
          "percentage": 5.714285714285714
        },
        {
          "interval_start": "2025-03-26T01:00:00+05:30",
          "interval_end": "2025-03-26T01:15:00+05:30",
          "count": 4,
          "total_games": 31,
          "percentage": 12.903225806451612
        },
        {
          "interval_start": "2025-03-26T01:15:00+05:30",
          "interval_end": "2025-03-26T01:30:00+05:30",
          "count": 4,
          "total_games": 31,
          "percentage": 12.903225806451612
        },
        {
          "interval_start": "2025-03-26T01:30:00+05:30",
          "interval_end": "2025-03-26T01:45:00+05:30",
          "count": 2,
          "total_games": 33,
          "percentage": 6.0606060606060606
        },
        {
          "interval_start": "2025-03-26T01:45:00+05:30",
          "interval_end": "2025-03-26T02:00:00+05:30",
          "count": 1,
          "total_games": 32,
          "percentage": 3.125
        },
        {
          "interval_start": "2025-03-26T02:00:00+05:30",
          "interval_end": "2025-03-26T02:15:00+05:30",
          "count": 4,
          "total_games": 28,
          "percentage": 14.285714285714285
        },
        {
          "interval_start": "2025-03-26T02:15:00+05:30",
          "interval_end": "2025-03-26T02:30:00+05:30",
          "count": 4,
          "total_games": 29,
          "percentage": 13.793103448275861
        },
        {
          "interval_start": "2025-03-26T02:30:00+05:30",
          "interval_end": "2025-03-26T02:45:00+05:30",
          "count": 1,
          "total_games": 36,
          "percentage": 2.7777777777777777
        },
        {
          "interval_start": "2025-03-26T02:45:00+05:30",
          "interval_end": "2025-03-26T03:00:00+05:30",
          "count": 6,
          "total_games": 31,
          "percentage": 19.35483870967742
        },
        {
          "interval_start": "2025-03-26T03:00:00+05:30",
          "interval_end": "2025-03-26T03:15:00+05:30",
          "count": 3,
          "total_games": 31,
          "percentage": 9.67741935483871
        },
        {
          "interval_start": "2025-03-26T03:15:00+05:30",
          "interval_end": "2025-03-26T03:30:00+05:30",
          "count": 4,
          "total_games": 29,
          "percentage": 13.793103448275861
        },
        {
          "interval_start": "2025-03-26T03:30:00+05:30",
          "interval_end": "2025-03-26T03:45:00+05:30",
          "count": 2,
          "total_games": 37,
          "percentage": 5.405405405405405
        },
        {
          "interval_start": "2025-03-26T03:45:00+05:30",
          "interval_end": "2025-03-26T04:00:00+05:30",
          "count": 4,
          "total_games": 34,
          "percentage": 11.76470588235294
        },
        {
          "interval_start": "2025-03-26T04:00:00+05:30",
          "interval_end": "2025-03-26T04:15:00+05:30",
          "count": 4,
          "total_games": 34,
          "percentage": 11.76470588235294
        },
        {
          "interval_start": "2025-03-26T04:15:00+05:30",
          "interval_end": "2025-03-26T04:30:00+05:30",
          "count": 3,
          "total_games": 31,
          "percentage": 9.67741935483871
        },
        {
          "interval_start": "2025-03-26T04:30:00+05:30",
          "interval_end": "2025-03-26T04:45:00+05:30",
          "count": 6,
          "total_games": 32,
          "percentage": 18.75
        },
        {
          "interval_start": "2025-03-26T04:45:00+05:30",
          "interval_end": "2025-03-26T05:00:00+05:30",
          "count": 2,
          "total_games": 34,
          "percentage": 5.88235294117647
        },
        {
          "interval_start": "2025-03-26T05:00:00+05:30",
          "interval_end": "2025-03-26T05:15:00+05:30",
          "count": 3,
          "total_games": 30,
          "percentage": 10.0
        },
        {
          "interval_start": "2025-03-26T05:15:00+05:30",
          "interval_end": "2025-03-26T05:30:00+05:30",
          "count": 2,
          "total_games": 31,
          "percentage": 6.451612903225806
        },
        {
          "interval_start": "2025-03-26T05:30:00+05:30",
          "interval_end": "2025-03-26T05:45:00+05:30",
          "count": 2,
          "total_games": 33,
          "percentage": 6.0606060606060606
        },
        {
          "interval_start": "2025-03-26T05:45:00+05:30",
          "interval_end": "2025-03-26T06:00:00+05:30",
          "count": 2,
          "total_games": 30,
          "percentage": 6.666666666666667
        },
        {
          "interval_start": "2025-03-26T06:00:00+05:30",
          "interval_end": "2025-03-26T06:15:00+05:30",
          "count": 1,
          "total_games": 38,
          "percentage": 2.631578947368421
        },
        {
          "interval_start": "2025-03-26T06:15:00+05:30",
          "interval_end": "2025-03-26T06:30:00+05:30",
          "count": 5,
          "total_games": 26,
          "percentage": 19.230769230769234
        },
        {
          "interval_start": "2025-03-26T06:30:00+05:30",
          "interval_end": "2025-03-26T06:45:00+05:30",
          "count": 6,
          "total_games": 26,
          "percentage": 23.076923076923077
        },
        {
          "interval_start": "2025-03-26T06:45:00+05:30",
          "interval_end": "2025-03-26T07:00:00+05:30",
          "count": 2,
          "total_games": 34,
          "percentage": 5.88235294117647
        },
        {
          "interval_start": "2025-03-26T07:00:00+05:30",
          "interval_end": "2025-03-26T07:15:00+05:30",
          "count": 2,
          "total_games": 31,
          "percentage": 6.451612903225806
        },
        {
          "interval_start": "2025-03-26T07:15:00+05:30",
          "interval_end": "2025-03-26T07:30:00+05:30",
          "count": 3,
          "total_games": 29,
          "percentage": 10.344827586206897
        },
        {
          "interval_start": "2025-03-26T07:30:00+05:30",
          "interval_end": "2025-03-26T07:45:00+05:30",
          "count": 4,
          "total_games": 33,
          "percentage": 12.121212121212121
        },
        {
          "interval_start": "2025-03-26T07:45:00+05:30",
          "interval_end": "2025-03-26T08:00:00+05:30",
          "count": 1,
          "total_games": 44,
          "percentage": 2.272727272727273
        },
        {
          "interval_start": "2025-03-26T08:00:00+05:30",
          "interval_end": "2025-03-26T08:15:00+05:30",
          "count": 2,
          "total_games": 28,
          "percentage": 7.142857142857142
        },
        {
          "interval_start": "2025-03-26T08:15:00+05:30",
          "interval_end": "2025-03-26T08:30:00+05:30",
          "count": 3,
          "total_games": 33,
          "percentage": 9.090909090909092
        },
        {
          "interval_start": "2025-03-26T08:30:00+05:30",
          "interval_end": "2025-03-26T08:45:00+05:30",
          "count": 1,
          "total_games": 36,
          "percentage": 2.7777777777777777
        },
        {
          "interval_start": "2025-03-26T08:45:00+05:30",
          "interval_end": "2025-03-26T09:00:00+05:30",
          "count": 4,
          "total_games": 33,
          "percentage": 12.121212121212121
        },
        {
          "interval_start": "2025-03-26T09:00:00+05:30",
          "interval_end": "2025-03-26T09:15:00+05:30",
          "count": 2,
          "total_games": 35,
          "percentage": 5.714285714285714
        },
        {
          "interval_start": "2025-03-26T09:15:00+05:30",
          "interval_end": "2025-03-26T09:30:00+05:30",
          "count": 3,
          "total_games": 38,
          "percentage": 7.894736842105263
        },
        {
          "interval_start": "2025-03-26T09:30:00+05:30",
          "interval_end": "2025-03-26T09:45:00+05:30",
          "count": 4,
          "total_games": 33,
          "percentage": 12.121212121212121
        },
        {
          "interval_start": "2025-03-26T09:45:00+05:30",
          "interval_end": "2025-03-26T10:00:00+05:30",
          "count": 5,
          "total_games": 25,
          "percentage": 20.0
        },
        {
          "interval_start": "2025-03-26T10:00:00+05:30",
          "interval_end": "2025-03-26T10:15:00+05:30",
          "count": 2,
          "total_games": 31,
          "percentage": 6.451612903225806
        },
        {
          "interval_start": "2025-03-26T10:15:00+05:30",
          "interval_end": "2025-03-26T10:30:00+05:30",
          "count": 6,
          "total_games": 28,
          "percentage": 21.428571428571427
        },
        {
          "interval_start": "2025-03-26T10:30:00+05:30",
          "interval_end": "2025-03-26T10:45:00+05:30",
          "count": 0,
          "total_games": 38,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-03-26T10:45:00+05:30",
          "interval_end": "2025-03-26T11:00:00+05:30",
          "count": 5,
          "total_games": 26,
          "percentage": 19.230769230769234
        },
        {
          "interval_start": "2025-03-26T11:00:00+05:30",
          "interval_end": "2025-03-26T11:15:00+05:30",
          "count": 3,
          "total_games": 32,
          "percentage": 9.375
        },
        {
          "interval_start": "2025-03-26T11:15:00+05:30",
          "interval_end": "2025-03-26T11:30:00+05:30",
          "count": 2,
          "total_games": 31,
          "percentage": 6.451612903225806
        },
        {
          "interval_start": "2025-03-26T11:30:00+05:30",
          "interval_end": "2025-03-26T11:45:00+05:30",
          "count": 1,
          "total_games": 31,
          "percentage": 3.225806451612903
        },
        {
          "interval_start": "2025-03-26T11:45:00+05:30",
          "interval_end": "2025-03-26T12:00:00+05:30",
          "count": 5,
          "total_games": 29,
          "percentage": 17.24137931034483
        },
        {
          "interval_start": "2025-03-26T12:00:00+05:30",
          "interval_end": "2025-03-26T12:15:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        },
        {
          "interval_start": "2025-03-26T12:15:00+05:30",
          "interval_end": "2025-03-26T12:30:00+05:30",
          "count": 8,
          "total_games": 25,
          "percentage": 32.0
        },
        {
          "interval_start": "2025-03-26T12:30:00+05:30",
          "interval_end": "2025-03-26T12:45:00+05:30",
          "count": 3,
          "total_games": 33,
          "percentage": 9.090909090909092
        },
        {
          "interval_start": "2025-03-26T12:45:00+05:30",
          "interval_end": "2025-03-26T13:00:00+05:30",
          "count": 4,
          "total_games": 26,
          "percentage": 15.384615384615385
        },
        {
          "interval_start": "2025-03-26T13:00:00+05:30",
          "interval_end": "2025-03-26T13:15:00+05:30",
          "count": 2,
          "total_games": 28,
          "percentage": 7.142857142857142
        },
        {
          "interval_start": "2025-03-26T13:15:00+05:30",
          "interval_end": "2025-03-26T13:30:00+05:30",
          "count": 6,
          "total_games": 31,
          "percentage": 19.35483870967742
        },
        {
          "interval_start": "2025-03-26T13:30:00+05:30",
          "interval_end": "2025-03-26T13:45:00+05:30",
          "count": 3,
          "total_games": 32,
          "percentage": 9.375
        },
        {
          "interval_start": "2025-03-26T13:45:00+05:30",
          "interval_end": "2025-03-26T14:00:00+05:30",
          "count": 3,
          "total_games": 28,
          "percentage": 10.714285714285714
        },
        {
          "interval_start": "2025-03-26T14:00:00+05:30",
          "interval_end": "2025-03-26T14:15:00+05:30",
          "count": 4,
          "total_games": 30,
          "percentage": 13.333333333333334
        },
        {
          "interval_start": "2025-03-26T14:15:00+05:30",
          "interval_end": "2025-03-26T14:30:00+05:30",
          "count": 6,
          "total_games": 24,
          "percentage": 25.0
        },
        {
          "interval_start": "2025-03-26T14:30:00+05:30",
          "interval_end": "2025-03-26T14:45:00+05:30",
          "count": 3,
          "total_games": 28,
          "percentage": 10.714285714285714
        },
        {
          "interval_start": "2025-03-26T14:45:00+05:30",
          "interval_end": "2025-03-26T15:00:00+05:30",
          "count": 3,
          "total_games": 33,
          "percentage": 9.090909090909092
        },
        {
          "interval_start": "2025-03-26T15:00:00+05:30",
          "interval_end": "2025-03-26T15:15:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        },
        {
          "interval_start": "2025-03-26T15:15:00+05:30",
          "interval_end": "2025-03-26T15:30:00+05:30",
          "count": 2,
          "total_games": 33,
          "percentage": 6.0606060606060606
        },
        {
          "interval_start": "2025-03-26T15:30:00+05:30",
          "interval_end": "2025-03-26T15:45:00+05:30",
          "count": 4,
          "total_games": 33,
          "percentage": 12.121212121212121
        },
        {
          "interval_start": "2025-03-26T15:45:00+05:30",
          "interval_end": "2025-03-26T16:00:00+05:30",
          "count": 2,
          "total_games": 31,
          "percentage": 6.451612903225806
        },
        {
          "interval_start": "2025-03-26T16:00:00+05:30",
          "interval_end": "2025-03-26T16:15:00+05:30",
          "count": 5,
          "total_games": 32,
          "percentage": 15.625
        },
        {
          "interval_start": "2025-03-26T16:15:00+05:30",
          "interval_end": "2025-03-26T16:30:00+05:30",
          "count": 1,
          "total_games": 33,
          "percentage": 3.0303030303030303
        },
        {
          "interval_start": "2025-03-26T16:30:00+05:30",
          "interval_end": "2025-03-26T16:45:00+05:30",
          "count": 5,
          "total_games": 31,
          "percentage": 16.129032258064516
        },
        {
          "interval_start": "2025-03-26T16:45:00+05:30",
          "interval_end": "2025-03-26T17:00:00+05:30",
          "count": 5,
          "total_games": 31,
          "percentage": 16.129032258064516
        },
        {
          "interval_start": "2025-03-26T17:00:00+05:30",
          "interval_end": "2025-03-26T17:15:00+05:30",
          "count": 4,
          "total_games": 28,
          "percentage": 14.285714285714285
        },
        {
          "interval_start": "2025-03-26T17:15:00+05:30",
          "interval_end": "2025-03-26T17:30:00+05:30",
          "count": 2,
          "total_games": 25,
          "percentage": 8.0
        }
      ],
      "20.0": [
        {
          "interval_start": "2025-03-25T17:15:00+05:30",
          "interval_end": "2025-03-25T17:30:00+05:30",
          "count": 2,
          "total_games": 30,
          "percentage": 6.666666666666667
        },
        {
          "interval_start": "2025-03-25T17:30:00+05:30",
          "interval_end": "2025-03-25T17:45:00+05:30",
          "count": 0,
          "total_games": 37,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-03-25T17:45:00+05:30",
          "interval_end": "2025-03-25T18:00:00+05:30",
          "count": 2,
          "total_games": 24,
          "percentage": 8.333333333333332
        },
        {
          "interval_start": "2025-03-25T18:00:00+05:30",
          "interval_end": "2025-03-25T18:15:00+05:30",
          "count": 2,
          "total_games": 31,
          "percentage": 6.451612903225806
        },
        {
          "interval_start": "2025-03-25T18:15:00+05:30",
          "interval_end": "2025-03-25T18:30:00+05:30",
          "count": 3,
          "total_games": 32,
          "percentage": 9.375
        },
        {
          "interval_start": "2025-03-25T18:30:00+05:30",
          "interval_end": "2025-03-25T18:45:00+05:30",
          "count": 1,
          "total_games": 30,
          "percentage": 3.3333333333333335
        },
        {
          "interval_start": "2025-03-25T18:45:00+05:30",
          "interval_end": "2025-03-25T19:00:00+05:30",
          "count": 2,
          "total_games": 38,
          "percentage": 5.263157894736842
        },
        {
          "interval_start": "2025-03-25T19:00:00+05:30",
          "interval_end": "2025-03-25T19:15:00+05:30",
          "count": 1,
          "total_games": 34,
          "percentage": 2.941176470588235
        },
        {
          "interval_start": "2025-03-25T19:15:00+05:30",
          "interval_end": "2025-03-25T19:30:00+05:30",
          "count": 2,
          "total_games": 30,
          "percentage": 6.666666666666667
        },
        {
          "interval_start": "2025-03-25T19:30:00+05:30",
          "interval_end": "2025-03-25T19:45:00+05:30",
          "count": 2,
          "total_games": 36,
          "percentage": 5.555555555555555
        },
        {
          "interval_start": "2025-03-25T19:45:00+05:30",
          "interval_end": "2025-03-25T20:00:00+05:30",
          "count": 2,
          "total_games": 34,
          "percentage": 5.88235294117647
        },
        {
          "interval_start": "2025-03-25T20:00:00+05:30",
          "interval_end": "2025-03-25T20:15:00+05:30",
          "count": 1,
          "total_games": 33,
          "percentage": 3.0303030303030303
        },
        {
          "interval_start": "2025-03-25T20:15:00+05:30",
          "interval_end": "2025-03-25T20:30:00+05:30",
          "count": 1,
          "total_games": 29,
          "percentage": 3.4482758620689653
        },
        {
          "interval_start": "2025-03-25T20:30:00+05:30",
          "interval_end": "2025-03-25T20:45:00+05:30",
          "count": 1,
          "total_games": 34,
          "percentage": 2.941176470588235
        },
        {
          "interval_start": "2025-03-25T20:45:00+05:30",
          "interval_end": "2025-03-25T21:00:00+05:30",
          "count": 2,
          "total_games": 34,
          "percentage": 5.88235294117647
        },
        {
          "interval_start": "2025-03-25T21:00:00+05:30",
          "interval_end": "2025-03-25T21:15:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        },
        {
          "interval_start": "2025-03-25T21:15:00+05:30",
          "interval_end": "2025-03-25T21:30:00+05:30",
          "count": 1,
          "total_games": 36,
          "percentage": 2.7777777777777777
        },
        {
          "interval_start": "2025-03-25T21:30:00+05:30",
          "interval_end": "2025-03-25T21:45:00+05:30",
          "count": 1,
          "total_games": 32,
          "percentage": 3.125
        },
        {
          "interval_start": "2025-03-25T21:45:00+05:30",
          "interval_end": "2025-03-25T22:00:00+05:30",
          "count": 4,
          "total_games": 26,
          "percentage": 15.384615384615385
        },
        {
          "interval_start": "2025-03-25T22:00:00+05:30",
          "interval_end": "2025-03-25T22:15:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        },
        {
          "interval_start": "2025-03-25T22:15:00+05:30",
          "interval_end": "2025-03-25T22:30:00+05:30",
          "count": 0,
          "total_games": 37,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-03-25T22:30:00+05:30",
          "interval_end": "2025-03-25T22:45:00+05:30",
          "count": 3,
          "total_games": 25,
          "percentage": 12.0
        },
        {
          "interval_start": "2025-03-25T22:45:00+05:30",
          "interval_end": "2025-03-25T23:00:00+05:30",
          "count": 2,
          "total_games": 28,
          "percentage": 7.142857142857142
        },
        {
          "interval_start": "2025-03-25T23:00:00+05:30",
          "interval_end": "2025-03-25T23:15:00+05:30",
          "count": 2,
          "total_games": 35,
          "percentage": 5.714285714285714
        },
        {
          "interval_start": "2025-03-25T23:15:00+05:30",
          "interval_end": "2025-03-25T23:30:00+05:30",
          "count": 2,
          "total_games": 35,
          "percentage": 5.714285714285714
        },
        {
          "interval_start": "2025-03-25T23:30:00+05:30",
          "interval_end": "2025-03-25T23:45:00+05:30",
          "count": 0,
          "total_games": 30,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-03-25T23:45:00+05:30",
          "interval_end": "2025-03-26T00:00:00+05:30",
          "count": 3,
          "total_games": 31,
          "percentage": 9.67741935483871
        },
        {
          "interval_start": "2025-03-26T00:00:00+05:30",
          "interval_end": "2025-03-26T00:15:00+05:30",
          "count": 3,
          "total_games": 28,
          "percentage": 10.714285714285714
        },
        {
          "interval_start": "2025-03-26T00:15:00+05:30",
          "interval_end": "2025-03-26T00:30:00+05:30",
          "count": 2,
          "total_games": 29,
          "percentage": 6.896551724137931
        },
        {
          "interval_start": "2025-03-26T00:30:00+05:30",
          "interval_end": "2025-03-26T00:45:00+05:30",
          "count": 1,
          "total_games": 30,
          "percentage": 3.3333333333333335
        },
        {
          "interval_start": "2025-03-26T00:45:00+05:30",
          "interval_end": "2025-03-26T01:00:00+05:30",
          "count": 0,
          "total_games": 35,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-03-26T01:00:00+05:30",
          "interval_end": "2025-03-26T01:15:00+05:30",
          "count": 2,
          "total_games": 31,
          "percentage": 6.451612903225806
        },
        {
          "interval_start": "2025-03-26T01:15:00+05:30",
          "interval_end": "2025-03-26T01:30:00+05:30",
          "count": 2,
          "total_games": 31,
          "percentage": 6.451612903225806
        },
        {
          "interval_start": "2025-03-26T01:30:00+05:30",
          "interval_end": "2025-03-26T01:45:00+05:30",
          "count": 2,
          "total_games": 33,
          "percentage": 6.0606060606060606
        },
        {
          "interval_start": "2025-03-26T01:45:00+05:30",
          "interval_end": "2025-03-26T02:00:00+05:30",
          "count": 1,
          "total_games": 32,
          "percentage": 3.125
        },
        {
          "interval_start": "2025-03-26T02:00:00+05:30",
          "interval_end": "2025-03-26T02:15:00+05:30",
          "count": 2,
          "total_games": 28,
          "percentage": 7.142857142857142
        },
        {
          "interval_start": "2025-03-26T02:15:00+05:30",
          "interval_end": "2025-03-26T02:30:00+05:30",
          "count": 3,
          "total_games": 29,
          "percentage": 10.344827586206897
        },
        {
          "interval_start": "2025-03-26T02:30:00+05:30",
          "interval_end": "2025-03-26T02:45:00+05:30",
          "count": 1,
          "total_games": 36,
          "percentage": 2.7777777777777777
        },
        {
          "interval_start": "2025-03-26T02:45:00+05:30",
          "interval_end": "2025-03-26T03:00:00+05:30",
          "count": 5,
          "total_games": 31,
          "percentage": 16.129032258064516
        },
        {
          "interval_start": "2025-03-26T03:00:00+05:30",
          "interval_end": "2025-03-26T03:15:00+05:30",
          "count": 2,
          "total_games": 31,
          "percentage": 6.451612903225806
        },
        {
          "interval_start": "2025-03-26T03:15:00+05:30",
          "interval_end": "2025-03-26T03:30:00+05:30",
          "count": 3,
          "total_games": 29,
          "percentage": 10.344827586206897
        },
        {
          "interval_start": "2025-03-26T03:30:00+05:30",
          "interval_end": "2025-03-26T03:45:00+05:30",
          "count": 1,
          "total_games": 37,
          "percentage": 2.7027027027027026
        },
        {
          "interval_start": "2025-03-26T03:45:00+05:30",
          "interval_end": "2025-03-26T04:00:00+05:30",
          "count": 2,
          "total_games": 34,
          "percentage": 5.88235294117647
        },
        {
          "interval_start": "2025-03-26T04:00:00+05:30",
          "interval_end": "2025-03-26T04:15:00+05:30",
          "count": 1,
          "total_games": 34,
          "percentage": 2.941176470588235
        },
        {
          "interval_start": "2025-03-26T04:15:00+05:30",
          "interval_end": "2025-03-26T04:30:00+05:30",
          "count": 3,
          "total_games": 31,
          "percentage": 9.67741935483871
        },
        {
          "interval_start": "2025-03-26T04:30:00+05:30",
          "interval_end": "2025-03-26T04:45:00+05:30",
          "count": 1,
          "total_games": 32,
          "percentage": 3.125
        },
        {
          "interval_start": "2025-03-26T04:45:00+05:30",
          "interval_end": "2025-03-26T05:00:00+05:30",
          "count": 0,
          "total_games": 34,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-03-26T05:00:00+05:30",
          "interval_end": "2025-03-26T05:15:00+05:30",
          "count": 2,
          "total_games": 30,
          "percentage": 6.666666666666667
        },
        {
          "interval_start": "2025-03-26T05:15:00+05:30",
          "interval_end": "2025-03-26T05:30:00+05:30",
          "count": 2,
          "total_games": 31,
          "percentage": 6.451612903225806
        },
        {
          "interval_start": "2025-03-26T05:30:00+05:30",
          "interval_end": "2025-03-26T05:45:00+05:30",
          "count": 0,
          "total_games": 33,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-03-26T05:45:00+05:30",
          "interval_end": "2025-03-26T06:00:00+05:30",
          "count": 1,
          "total_games": 30,
          "percentage": 3.3333333333333335
        },
        {
          "interval_start": "2025-03-26T06:00:00+05:30",
          "interval_end": "2025-03-26T06:15:00+05:30",
          "count": 0,
          "total_games": 38,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-03-26T06:15:00+05:30",
          "interval_end": "2025-03-26T06:30:00+05:30",
          "count": 3,
          "total_games": 26,
          "percentage": 11.538461538461538
        },
        {
          "interval_start": "2025-03-26T06:30:00+05:30",
          "interval_end": "2025-03-26T06:45:00+05:30",
          "count": 4,
          "total_games": 26,
          "percentage": 15.384615384615385
        },
        {
          "interval_start": "2025-03-26T06:45:00+05:30",
          "interval_end": "2025-03-26T07:00:00+05:30",
          "count": 1,
          "total_games": 34,
          "percentage": 2.941176470588235
        },
        {
          "interval_start": "2025-03-26T07:00:00+05:30",
          "interval_end": "2025-03-26T07:15:00+05:30",
          "count": 2,
          "total_games": 31,
          "percentage": 6.451612903225806
        },
        {
          "interval_start": "2025-03-26T07:15:00+05:30",
          "interval_end": "2025-03-26T07:30:00+05:30",
          "count": 1,
          "total_games": 29,
          "percentage": 3.4482758620689653
        },
        {
          "interval_start": "2025-03-26T07:30:00+05:30",
          "interval_end": "2025-03-26T07:45:00+05:30",
          "count": 1,
          "total_games": 33,
          "percentage": 3.0303030303030303
        },
        {
          "interval_start": "2025-03-26T07:45:00+05:30",
          "interval_end": "2025-03-26T08:00:00+05:30",
          "count": 0,
          "total_games": 44,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-03-26T08:00:00+05:30",
          "interval_end": "2025-03-26T08:15:00+05:30",
          "count": 2,
          "total_games": 28,
          "percentage": 7.142857142857142
        },
        {
          "interval_start": "2025-03-26T08:15:00+05:30",
          "interval_end": "2025-03-26T08:30:00+05:30",
          "count": 1,
          "total_games": 33,
          "percentage": 3.0303030303030303
        },
        {
          "interval_start": "2025-03-26T08:30:00+05:30",
          "interval_end": "2025-03-26T08:45:00+05:30",
          "count": 0,
          "total_games": 36,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-03-26T08:45:00+05:30",
          "interval_end": "2025-03-26T09:00:00+05:30",
          "count": 1,
          "total_games": 33,
          "percentage": 3.0303030303030303
        },
        {
          "interval_start": "2025-03-26T09:00:00+05:30",
          "interval_end": "2025-03-26T09:15:00+05:30",
          "count": 1,
          "total_games": 35,
          "percentage": 2.857142857142857
        },
        {
          "interval_start": "2025-03-26T09:15:00+05:30",
          "interval_end": "2025-03-26T09:30:00+05:30",
          "count": 0,
          "total_games": 38,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-03-26T09:30:00+05:30",
          "interval_end": "2025-03-26T09:45:00+05:30",
          "count": 2,
          "total_games": 33,
          "percentage": 6.0606060606060606
        },
        {
          "interval_start": "2025-03-26T09:45:00+05:30",
          "interval_end": "2025-03-26T10:00:00+05:30",
          "count": 4,
          "total_games": 25,
          "percentage": 16.0
        },
        {
          "interval_start": "2025-03-26T10:00:00+05:30",
          "interval_end": "2025-03-26T10:15:00+05:30",
          "count": 1,
          "total_games": 31,
          "percentage": 3.225806451612903
        },
        {
          "interval_start": "2025-03-26T10:15:00+05:30",
          "interval_end": "2025-03-26T10:30:00+05:30",
          "count": 3,
          "total_games": 28,
          "percentage": 10.714285714285714
        },
        {
          "interval_start": "2025-03-26T10:30:00+05:30",
          "interval_end": "2025-03-26T10:45:00+05:30",
          "count": 0,
          "total_games": 38,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-03-26T10:45:00+05:30",
          "interval_end": "2025-03-26T11:00:00+05:30",
          "count": 3,
          "total_games": 26,
          "percentage": 11.538461538461538
        },
        {
          "interval_start": "2025-03-26T11:00:00+05:30",
          "interval_end": "2025-03-26T11:15:00+05:30",
          "count": 3,
          "total_games": 32,
          "percentage": 9.375
        },
        {
          "interval_start": "2025-03-26T11:15:00+05:30",
          "interval_end": "2025-03-26T11:30:00+05:30",
          "count": 1,
          "total_games": 31,
          "percentage": 3.225806451612903
        },
        {
          "interval_start": "2025-03-26T11:30:00+05:30",
          "interval_end": "2025-03-26T11:45:00+05:30",
          "count": 1,
          "total_games": 31,
          "percentage": 3.225806451612903
        },
        {
          "interval_start": "2025-03-26T11:45:00+05:30",
          "interval_end": "2025-03-26T12:00:00+05:30",
          "count": 3,
          "total_games": 29,
          "percentage": 10.344827586206897
        },
        {
          "interval_start": "2025-03-26T12:00:00+05:30",
          "interval_end": "2025-03-26T12:15:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        },
        {
          "interval_start": "2025-03-26T12:15:00+05:30",
          "interval_end": "2025-03-26T12:30:00+05:30",
          "count": 4,
          "total_games": 25,
          "percentage": 16.0
        },
        {
          "interval_start": "2025-03-26T12:30:00+05:30",
          "interval_end": "2025-03-26T12:45:00+05:30",
          "count": 0,
          "total_games": 33,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-03-26T12:45:00+05:30",
          "interval_end": "2025-03-26T13:00:00+05:30",
          "count": 3,
          "total_games": 26,
          "percentage": 11.538461538461538
        },
        {
          "interval_start": "2025-03-26T13:00:00+05:30",
          "interval_end": "2025-03-26T13:15:00+05:30",
          "count": 1,
          "total_games": 28,
          "percentage": 3.571428571428571
        },
        {
          "interval_start": "2025-03-26T13:15:00+05:30",
          "interval_end": "2025-03-26T13:30:00+05:30",
          "count": 1,
          "total_games": 31,
          "percentage": 3.225806451612903
        },
        {
          "interval_start": "2025-03-26T13:30:00+05:30",
          "interval_end": "2025-03-26T13:45:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        },
        {
          "interval_start": "2025-03-26T13:45:00+05:30",
          "interval_end": "2025-03-26T14:00:00+05:30",
          "count": 2,
          "total_games": 28,
          "percentage": 7.142857142857142
        },
        {
          "interval_start": "2025-03-26T14:00:00+05:30",
          "interval_end": "2025-03-26T14:15:00+05:30",
          "count": 3,
          "total_games": 30,
          "percentage": 10.0
        },
        {
          "interval_start": "2025-03-26T14:15:00+05:30",
          "interval_end": "2025-03-26T14:30:00+05:30",
          "count": 6,
          "total_games": 24,
          "percentage": 25.0
        },
        {
          "interval_start": "2025-03-26T14:30:00+05:30",
          "interval_end": "2025-03-26T14:45:00+05:30",
          "count": 1,
          "total_games": 28,
          "percentage": 3.571428571428571
        },
        {
          "interval_start": "2025-03-26T14:45:00+05:30",
          "interval_end": "2025-03-26T15:00:00+05:30",
          "count": 1,
          "total_games": 33,
          "percentage": 3.0303030303030303
        },
        {
          "interval_start": "2025-03-26T15:00:00+05:30",
          "interval_end": "2025-03-26T15:15:00+05:30",
          "count": 1,
          "total_games": 32,
          "percentage": 3.125
        },
        {
          "interval_start": "2025-03-26T15:15:00+05:30",
          "interval_end": "2025-03-26T15:30:00+05:30",
          "count": 1,
          "total_games": 33,
          "percentage": 3.0303030303030303
        },
        {
          "interval_start": "2025-03-26T15:30:00+05:30",
          "interval_end": "2025-03-26T15:45:00+05:30",
          "count": 2,
          "total_games": 33,
          "percentage": 6.0606060606060606
        },
        {
          "interval_start": "2025-03-26T15:45:00+05:30",
          "interval_end": "2025-03-26T16:00:00+05:30",
          "count": 2,
          "total_games": 31,
          "percentage": 6.451612903225806
        },
        {
          "interval_start": "2025-03-26T16:00:00+05:30",
          "interval_end": "2025-03-26T16:15:00+05:30",
          "count": 2,
          "total_games": 32,
          "percentage": 6.25
        },
        {
          "interval_start": "2025-03-26T16:15:00+05:30",
          "interval_end": "2025-03-26T16:30:00+05:30",
          "count": 0,
          "total_games": 33,
          "percentage": 0.0
        },
        {
          "interval_start": "2025-03-26T16:30:00+05:30",
          "interval_end": "2025-03-26T16:45:00+05:30",
          "count": 1,
          "total_games": 31,
          "percentage": 3.225806451612903
        },
        {
          "interval_start": "2025-03-26T16:45:00+05:30",
          "interval_end": "2025-03-26T17:00:00+05:30",
          "count": 2,
          "total_games": 31,
          "percentage": 6.451612903225806
        },
        {
          "interval_start": "2025-03-26T17:00:00+05:30",
          "interval_end": "2025-03-26T17:15:00+05:30",
          "count": 2,
          "total_games": 28,
          "percentage": 7.142857142857142
        },
        {
          "interval_start": "2025-03-26T17:15:00+05:30",
          "interval_end": "2025-03-26T17:30:00+05:30",
          "count": 1,
          "total_games": 25,
          "percentage": 4.0
        }
      ]
    }
  }
}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 43719  100 43635  100    84   7386     14  0:00:06  0:00:05  0:00:01 11815
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
          "set_number": 1,
          "start_game": "7979547",
          "end_game": "7979566",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T09:15:16.706000+05:30",
          "end_time": "2025-03-26T09:22:06.121000+05:30"
        },
        {
          "set_number": 2,
          "start_game": "7979567",
          "end_game": "7979586",
          "count": 12,
          "total_games": 20,
          "percentage": 60.0,
          "start_time": "2025-03-26T09:22:19.087000+05:30",
          "end_time": "2025-03-26T09:32:02.242000+05:30"
        },
        {
          "set_number": 3,
          "start_game": "7979587",
          "end_game": "7979606",
          "count": 7,
          "total_games": 20,
          "percentage": 35.0,
          "start_time": "2025-03-26T09:32:34.872000+05:30",
          "end_time": "2025-03-26T09:40:13.068000+05:30"
        },
        {
          "set_number": 4,
          "start_game": "7979607",
          "end_game": "7979626",
          "count": 12,
          "total_games": 20,
          "percentage": 60.0,
          "start_time": "2025-03-26T09:40:29.611000+05:30",
          "end_time": "2025-03-26T09:50:17.879000+05:30"
        },
        {
          "set_number": 5,
          "start_game": "7979627",
          "end_game": "7979646",
          "count": 12,
          "total_games": 20,
          "percentage": 60.0,
          "start_time": "2025-03-26T09:51:02.901000+05:30",
          "end_time": "2025-03-26T10:01:50.119000+05:30"
        },
        {
          "set_number": 6,
          "start_game": "7979647",
          "end_game": "7979666",
          "count": 8,
          "total_games": 20,
          "percentage": 40.0,
          "start_time": "2025-03-26T10:02:08.594000+05:30",
          "end_time": "2025-03-26T10:11:16.841000+05:30"
        },
        {
          "set_number": 7,
          "start_game": "7979667",
          "end_game": "7979686",
          "count": 13,
          "total_games": 20,
          "percentage": 65.0,
          "start_time": "2025-03-26T10:11:36.235000+05:30",
          "end_time": "2025-03-26T10:22:06.306000+05:30"
        },
        {
          "set_number": 8,
          "start_game": "7979687",
          "end_game": "7979706",
          "count": 9,
          "total_games": 20,
          "percentage": 45.0,
          "start_time": "2025-03-26T10:23:29.893000+05:30",
          "end_time": "2025-03-26T10:32:17.041000+05:30"
        },
        {
          "set_number": 9,
          "start_game": "7979707",
          "end_game": "7979726",
          "count": 6,
          "total_games": 20,
          "percentage": 30.0,
          "start_time": "2025-03-26T10:32:34.388000+05:30",
          "end_time": "2025-03-26T10:40:14.977000+05:30"
        },
        {
          "set_number": 10,
          "start_game": "7979727",
          "end_game": "7979746",
          "count": 11,
          "total_games": 20,
          "percentage": 55.00000000000001,
          "start_time": "2025-03-26T10:40:28.870000+05:30",
          "end_time": "2025-03-26T10:48:48.078000+05:30"
        },
        {
          "set_number": 11,
          "start_game": "7979747",
          "end_game": "7979766",
          "count": 10,
          "total_games": 20,
          "percentage": 50.0,
          "start_time": "2025-03-26T10:49:03.690000+05:30",
          "end_time": "2025-03-26T11:00:41.922000+05:30"
        },
        {
          "set_number": 12,
          "start_game": "7979767",
          "end_game": "7979786",
          "count": 9,
          "total_games": 20,
          "percentage": 45.0,
          "start_time": "2025-03-26T11:00:55.030000+05:30",
          "end_time": "2025-03-26T11:10:43.013000+05:30"
        },
        {
          "set_number": 13,
          "start_game": "7979787",
          "end_game": "7979806",
          "count": 8,
          "total_games": 20,
          "percentage": 40.0,
          "start_time": "2025-03-26T11:11:00.057000+05:30",
          "end_time": "2025-03-26T11:18:33.159000+05:30"
        },
        {
          "set_number": 14,
          "start_game": "7979807",
          "end_game": "7979826",
          "count": 11,
          "total_games": 20,
          "percentage": 55.00000000000001,
          "start_time": "2025-03-26T11:18:51.351000+05:30",
          "end_time": "2025-03-26T11:29:08.238000+05:30"
        },
        {
          "set_number": 15,
          "start_game": "7979827",
          "end_game": "7979846",
          "count": 15,
          "total_games": 20,
          "percentage": 75.0,
          "start_time": "2025-03-26T11:29:38.084000+05:30",
          "end_time": "2025-03-26T11:39:05.570000+05:30"
        },
        {
          "set_number": 16,
          "start_game": "7979847",
          "end_game": "7979866",
          "count": 10,
          "total_games": 20,
          "percentage": 50.0,
          "start_time": "2025-03-26T11:39:29.613000+05:30",
          "end_time": "2025-03-26T11:47:31.409000+05:30"
        },
        {
          "set_number": 17,
          "start_game": "7979867",
          "end_game": "7979886",
          "count": 12,
          "total_games": 20,
          "percentage": 60.0,
          "start_time": "2025-03-26T11:47:50.055000+05:30",
          "end_time": "2025-03-26T11:59:29.511000+05:30"
        },
        {
          "set_number": 18,
          "start_game": "7979887",
          "end_game": "7979906",
          "count": 11,
          "total_games": 20,
          "percentage": 55.00000000000001,
          "start_time": "2025-03-26T11:59:55.329000+05:30",
          "end_time": "2025-03-26T12:09:37.508000+05:30"
        },
        {
          "set_number": 19,
          "start_game": "7979907",
          "end_game": "7979926",
          "count": 13,
          "total_games": 20,
          "percentage": 65.0,
          "start_time": "2025-03-26T12:10:02.641000+05:30",
          "end_time": "2025-03-26T12:20:10.011000+05:30"
        },
        {
          "set_number": 20,
          "start_game": "7979927",
          "end_game": "7979946",
          "count": 10,
          "total_games": 20,
          "percentage": 50.0,
          "start_time": "2025-03-26T12:21:20.030000+05:30",
          "end_time": "2025-03-26T12:30:40.698000+05:30"
        },
        {
          "set_number": 21,
          "start_game": "7979947",
          "end_game": "7979966",
          "count": 7,
          "total_games": 20,
          "percentage": 35.0,
          "start_time": "2025-03-26T12:31:16.446000+05:30",
          "end_time": "2025-03-26T12:39:07.517000+05:30"
        },
        {
          "set_number": 22,
          "start_game": "7979967",
          "end_game": "7979986",
          "count": 13,
          "total_games": 20,
          "percentage": 65.0,
          "start_time": "2025-03-26T12:39:33.141000+05:30",
          "end_time": "2025-03-26T12:50:32.811000+05:30"
        },
        {
          "set_number": 23,
          "start_game": "7979987",
          "end_game": "7980006",
          "count": 14,
          "total_games": 20,
          "percentage": 70.0,
          "start_time": "2025-03-26T12:51:06.671000+05:30",
          "end_time": "2025-03-26T13:01:09.436000+05:30"
        },
        {
          "set_number": 24,
          "start_game": "7980007",
          "end_game": "7980026",
          "count": 13,
          "total_games": 20,
          "percentage": 65.0,
          "start_time": "2025-03-26T13:01:23.675000+05:30",
          "end_time": "2025-03-26T13:10:53.479000+05:30"
        },
        {
          "set_number": 25,
          "start_game": "7980027",
          "end_game": "7980046",
          "count": 13,
          "total_games": 20,
          "percentage": 65.0,
          "start_time": "2025-03-26T13:11:41.034000+05:30",
          "end_time": "2025-03-26T13:23:33.559000+05:30"
        },
        {
          "set_number": 26,
          "start_game": "7980047",
          "end_game": "7980066",
          "count": 8,
          "total_games": 20,
          "percentage": 40.0,
          "start_time": "2025-03-26T13:23:56.783000+05:30",
          "end_time": "2025-03-26T13:31:34.463000+05:30"
        },
        {
          "set_number": 27,
          "start_game": "7980067",
          "end_game": "7980086",
          "count": 11,
          "total_games": 20,
          "percentage": 55.00000000000001,
          "start_time": "2025-03-26T13:32:31.934000+05:30",
          "end_time": "2025-03-26T13:42:07.614000+05:30"
        },
        {
          "set_number": 28,
          "start_game": "7980087",
          "end_game": "7980106",
          "count": 11,
          "total_games": 20,
          "percentage": 55.00000000000001,
          "start_time": "2025-03-26T13:42:20.054000+05:30",
          "end_time": "2025-03-26T13:52:18.349000+05:30"
        },
        {
          "set_number": 29,
          "start_game": "7980107",
          "end_game": "7980126",
          "count": 7,
          "total_games": 20,
          "percentage": 35.0,
          "start_time": "2025-03-26T13:52:30.083000+05:30",
          "end_time": "2025-03-26T14:01:23.644000+05:30"
        },
        {
          "set_number": 30,
          "start_game": "7980127",
          "end_game": "7980146",
          "count": 11,
          "total_games": 20,
          "percentage": 55.00000000000001,
          "start_time": "2025-03-26T14:01:40.839000+05:30",
          "end_time": "2025-03-26T14:11:40.329000+05:30"
        },
        {
          "set_number": 31,
          "start_game": "7980147",
          "end_game": "7980166",
          "count": 11,
          "total_games": 20,
          "percentage": 55.00000000000001,
          "start_time": "2025-03-26T14:12:27.222000+05:30",
          "end_time": "2025-03-26T14:24:29.114000+05:30"
        },
        {
          "set_number": 32,
          "start_game": "7980167",
          "end_game": "7980186",
          "count": 10,
          "total_games": 20,
          "percentage": 50.0,
          "start_time": "2025-03-26T14:25:41.535000+05:30",
          "end_time": "2025-03-26T14:35:29.065000+05:30"
        },
        {
          "set_number": 33,
          "start_game": "7980187",
          "end_game": "7980206",
          "count": 10,
          "total_games": 20,
          "percentage": 50.0,
          "start_time": "2025-03-26T14:36:17.936000+05:30",
          "end_time": "2025-03-26T14:46:09.946000+05:30"
        },
        {
          "set_number": 34,
          "start_game": "7980207",
          "end_game": "7980226",
          "count": 8,
          "total_games": 20,
          "percentage": 40.0,
          "start_time": "2025-03-26T14:46:37.915000+05:30",
          "end_time": "2025-03-26T14:55:15.966000+05:30"
        },
        {
          "set_number": 35,
          "start_game": "7980227",
          "end_game": "7980246",
          "count": 6,
          "total_games": 20,
          "percentage": 30.0,
          "start_time": "2025-03-26T14:55:31.288000+05:30",
          "end_time": "2025-03-26T15:03:24.908000+05:30"
        },
        {
          "set_number": 36,
          "start_game": "7980247",
          "end_game": "7980266",
          "count": 13,
          "total_games": 20,
          "percentage": 65.0,
          "start_time": "2025-03-26T15:03:50.351000+05:30",
          "end_time": "2025-03-26T15:13:26.277000+05:30"
        },
        {
          "set_number": 37,
          "start_game": "7980267",
          "end_game": "7980286",
          "count": 12,
          "total_games": 20,
          "percentage": 60.0,
          "start_time": "2025-03-26T15:13:40.393000+05:30",
          "end_time": "2025-03-26T15:23:29.670000+05:30"
        },
        {
          "set_number": 38,
          "start_game": "7980287",
          "end_game": "7980306",
          "count": 6,
          "total_games": 20,
          "percentage": 30.0,
          "start_time": "2025-03-26T15:23:47.626000+05:30",
          "end_time": "2025-03-26T15:31:00.506000+05:30"
        },
        {
          "set_number": 39,
          "start_game": "7980307",
          "end_game": "7980326",
          "count": 10,
          "total_games": 20,
          "percentage": 50.0,
          "start_time": "2025-03-26T15:31:30.198000+05:30",
          "end_time": "2025-03-26T15:40:27.924000+05:30"
        },
        {
          "set_number": 40,
          "start_game": "7980327",
          "end_game": "7980346",
          "count": 11,
          "total_games": 20,
          "percentage": 55.00000000000001,
          "start_time": "2025-03-26T15:40:53.115000+05:30",
          "end_time": "2025-03-26T15:51:26.892000+05:30"
        },
        {
          "set_number": 41,
          "start_game": "7980347",
          "end_game": "7980366",
          "count": 10,
          "total_games": 20,
          "percentage": 50.0,
          "start_time": "2025-03-26T15:51:38.779000+05:30",
          "end_time": "2025-03-26T15:59:56.442000+05:30"
        },
        {
          "set_number": 42,
          "start_game": "7980367",
          "end_game": "7980386",
          "count": 9,
          "total_games": 20,
          "percentage": 45.0,
          "start_time": "2025-03-26T16:00:14.373000+05:30",
          "end_time": "2025-03-26T16:09:52.331000+05:30"
        },
        {
          "set_number": 43,
          "start_game": "7980387",
          "end_game": "7980406",
          "count": 10,
          "total_games": 20,
          "percentage": 50.0,
          "start_time": "2025-03-26T16:10:46.161000+05:30",
          "end_time": "2025-03-26T16:18:16.503000+05:30"
        },
        {
          "set_number": 44,
          "start_game": "7980407",
          "end_game": "7980426",
          "count": 10,
          "total_games": 20,
          "percentage": 50.0,
          "start_time": "2025-03-26T16:18:57.937000+05:30",
          "end_time": "2025-03-26T16:27:06.933000+05:30"
        },
        {
          "set_number": 45,
          "start_game": "7980427",
          "end_game": "7980446",
          "count": 10,
          "total_games": 20,
          "percentage": 50.0,
          "start_time": "2025-03-26T16:27:30.502000+05:30",
          "end_time": "2025-03-26T16:36:00.510000+05:30"
        },
        {
          "set_number": 46,
          "start_game": "7980447",
          "end_game": "7980466",
          "count": 10,
          "total_games": 20,
          "percentage": 50.0,
          "start_time": "2025-03-26T16:36:23.581000+05:30",
          "end_time": "2025-03-26T16:47:10.829000+05:30"
        },
        {
          "set_number": 47,
          "start_game": "7980467",
          "end_game": "7980486",
          "count": 9,
          "total_games": 20,
          "percentage": 45.0,
          "start_time": "2025-03-26T16:47:29.400000+05:30",
          "end_time": "2025-03-26T16:55:37.363000+05:30"
        },
        {
          "set_number": 48,
          "start_game": "7980487",
          "end_game": "7980506",
          "count": 12,
          "total_games": 20,
          "percentage": 60.0,
          "start_time": "2025-03-26T16:56:12.218000+05:30",
          "end_time": "2025-03-26T17:06:16.229000+05:30"
        },
        {
          "set_number": 49,
          "start_game": "7980507",
          "end_game": "7980526",
          "count": 11,
          "total_games": 20,
          "percentage": 55.00000000000001,
          "start_time": "2025-03-26T17:06:50.247000+05:30",
          "end_time": "2025-03-26T17:17:17.589000+05:30"
        },
        {
          "set_number": 50,
          "start_game": "7980527",
          "end_game": "7980546",
          "count": 10,
          "total_games": 20,
          "percentage": 50.0,
          "start_time": "2025-03-26T17:17:44.907000+05:30",
          "end_time": "2025-03-26T17:25:45.967000+05:30"
        }
      ],
      "5.0": [
        {
          "set_number": 1,
          "start_game": "7979547",
          "end_game": "7979566",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T09:15:16.706000+05:30",
          "end_time": "2025-03-26T09:22:06.121000+05:30"
        },
        {
          "set_number": 2,
          "start_game": "7979567",
          "end_game": "7979586",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T09:22:19.087000+05:30",
          "end_time": "2025-03-26T09:32:02.242000+05:30"
        },
        {
          "set_number": 3,
          "start_game": "7979587",
          "end_game": "7979606",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T09:32:34.872000+05:30",
          "end_time": "2025-03-26T09:40:13.068000+05:30"
        },
        {
          "set_number": 4,
          "start_game": "7979607",
          "end_game": "7979626",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T09:40:29.611000+05:30",
          "end_time": "2025-03-26T09:50:17.879000+05:30"
        },
        {
          "set_number": 5,
          "start_game": "7979627",
          "end_game": "7979646",
          "count": 5,
          "total_games": 20,
          "percentage": 25.0,
          "start_time": "2025-03-26T09:51:02.901000+05:30",
          "end_time": "2025-03-26T10:01:50.119000+05:30"
        },
        {
          "set_number": 6,
          "start_game": "7979647",
          "end_game": "7979666",
          "count": 6,
          "total_games": 20,
          "percentage": 30.0,
          "start_time": "2025-03-26T10:02:08.594000+05:30",
          "end_time": "2025-03-26T10:11:16.841000+05:30"
        },
        {
          "set_number": 7,
          "start_game": "7979667",
          "end_game": "7979686",
          "count": 5,
          "total_games": 20,
          "percentage": 25.0,
          "start_time": "2025-03-26T10:11:36.235000+05:30",
          "end_time": "2025-03-26T10:22:06.306000+05:30"
        },
        {
          "set_number": 8,
          "start_game": "7979687",
          "end_game": "7979706",
          "count": 5,
          "total_games": 20,
          "percentage": 25.0,
          "start_time": "2025-03-26T10:23:29.893000+05:30",
          "end_time": "2025-03-26T10:32:17.041000+05:30"
        },
        {
          "set_number": 9,
          "start_game": "7979707",
          "end_game": "7979726",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T10:32:34.388000+05:30",
          "end_time": "2025-03-26T10:40:14.977000+05:30"
        },
        {
          "set_number": 10,
          "start_game": "7979727",
          "end_game": "7979746",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T10:40:28.870000+05:30",
          "end_time": "2025-03-26T10:48:48.078000+05:30"
        },
        {
          "set_number": 11,
          "start_game": "7979747",
          "end_game": "7979766",
          "count": 8,
          "total_games": 20,
          "percentage": 40.0,
          "start_time": "2025-03-26T10:49:03.690000+05:30",
          "end_time": "2025-03-26T11:00:41.922000+05:30"
        },
        {
          "set_number": 12,
          "start_game": "7979767",
          "end_game": "7979786",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T11:00:55.030000+05:30",
          "end_time": "2025-03-26T11:10:43.013000+05:30"
        },
        {
          "set_number": 13,
          "start_game": "7979787",
          "end_game": "7979806",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T11:11:00.057000+05:30",
          "end_time": "2025-03-26T11:18:33.159000+05:30"
        },
        {
          "set_number": 14,
          "start_game": "7979807",
          "end_game": "7979826",
          "count": 6,
          "total_games": 20,
          "percentage": 30.0,
          "start_time": "2025-03-26T11:18:51.351000+05:30",
          "end_time": "2025-03-26T11:29:08.238000+05:30"
        },
        {
          "set_number": 15,
          "start_game": "7979827",
          "end_game": "7979846",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T11:29:38.084000+05:30",
          "end_time": "2025-03-26T11:39:05.570000+05:30"
        },
        {
          "set_number": 16,
          "start_game": "7979847",
          "end_game": "7979866",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T11:39:29.613000+05:30",
          "end_time": "2025-03-26T11:47:31.409000+05:30"
        },
        {
          "set_number": 17,
          "start_game": "7979867",
          "end_game": "7979886",
          "count": 9,
          "total_games": 20,
          "percentage": 45.0,
          "start_time": "2025-03-26T11:47:50.055000+05:30",
          "end_time": "2025-03-26T11:59:29.511000+05:30"
        },
        {
          "set_number": 18,
          "start_game": "7979887",
          "end_game": "7979906",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T11:59:55.329000+05:30",
          "end_time": "2025-03-26T12:09:37.508000+05:30"
        },
        {
          "set_number": 19,
          "start_game": "7979907",
          "end_game": "7979926",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T12:10:02.641000+05:30",
          "end_time": "2025-03-26T12:20:10.011000+05:30"
        },
        {
          "set_number": 20,
          "start_game": "7979927",
          "end_game": "7979946",
          "count": 5,
          "total_games": 20,
          "percentage": 25.0,
          "start_time": "2025-03-26T12:21:20.030000+05:30",
          "end_time": "2025-03-26T12:30:40.698000+05:30"
        },
        {
          "set_number": 21,
          "start_game": "7979947",
          "end_game": "7979966",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T12:31:16.446000+05:30",
          "end_time": "2025-03-26T12:39:07.517000+05:30"
        },
        {
          "set_number": 22,
          "start_game": "7979967",
          "end_game": "7979986",
          "count": 7,
          "total_games": 20,
          "percentage": 35.0,
          "start_time": "2025-03-26T12:39:33.141000+05:30",
          "end_time": "2025-03-26T12:50:32.811000+05:30"
        },
        {
          "set_number": 23,
          "start_game": "7979987",
          "end_game": "7980006",
          "count": 5,
          "total_games": 20,
          "percentage": 25.0,
          "start_time": "2025-03-26T12:51:06.671000+05:30",
          "end_time": "2025-03-26T13:01:09.436000+05:30"
        },
        {
          "set_number": 24,
          "start_game": "7980007",
          "end_game": "7980026",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T13:01:23.675000+05:30",
          "end_time": "2025-03-26T13:10:53.479000+05:30"
        },
        {
          "set_number": 25,
          "start_game": "7980027",
          "end_game": "7980046",
          "count": 8,
          "total_games": 20,
          "percentage": 40.0,
          "start_time": "2025-03-26T13:11:41.034000+05:30",
          "end_time": "2025-03-26T13:23:33.559000+05:30"
        },
        {
          "set_number": 26,
          "start_game": "7980047",
          "end_game": "7980066",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T13:23:56.783000+05:30",
          "end_time": "2025-03-26T13:31:34.463000+05:30"
        },
        {
          "set_number": 27,
          "start_game": "7980067",
          "end_game": "7980086",
          "count": 5,
          "total_games": 20,
          "percentage": 25.0,
          "start_time": "2025-03-26T13:32:31.934000+05:30",
          "end_time": "2025-03-26T13:42:07.614000+05:30"
        },
        {
          "set_number": 28,
          "start_game": "7980087",
          "end_game": "7980106",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T13:42:20.054000+05:30",
          "end_time": "2025-03-26T13:52:18.349000+05:30"
        },
        {
          "set_number": 29,
          "start_game": "7980107",
          "end_game": "7980126",
          "count": 5,
          "total_games": 20,
          "percentage": 25.0,
          "start_time": "2025-03-26T13:52:30.083000+05:30",
          "end_time": "2025-03-26T14:01:23.644000+05:30"
        },
        {
          "set_number": 30,
          "start_game": "7980127",
          "end_game": "7980146",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T14:01:40.839000+05:30",
          "end_time": "2025-03-26T14:11:40.329000+05:30"
        },
        {
          "set_number": 31,
          "start_game": "7980147",
          "end_game": "7980166",
          "count": 8,
          "total_games": 20,
          "percentage": 40.0,
          "start_time": "2025-03-26T14:12:27.222000+05:30",
          "end_time": "2025-03-26T14:24:29.114000+05:30"
        },
        {
          "set_number": 32,
          "start_game": "7980167",
          "end_game": "7980186",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T14:25:41.535000+05:30",
          "end_time": "2025-03-26T14:35:29.065000+05:30"
        },
        {
          "set_number": 33,
          "start_game": "7980187",
          "end_game": "7980206",
          "count": 8,
          "total_games": 20,
          "percentage": 40.0,
          "start_time": "2025-03-26T14:36:17.936000+05:30",
          "end_time": "2025-03-26T14:46:09.946000+05:30"
        },
        {
          "set_number": 34,
          "start_game": "7980207",
          "end_game": "7980226",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T14:46:37.915000+05:30",
          "end_time": "2025-03-26T14:55:15.966000+05:30"
        },
        {
          "set_number": 35,
          "start_game": "7980227",
          "end_game": "7980246",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T14:55:31.288000+05:30",
          "end_time": "2025-03-26T15:03:24.908000+05:30"
        },
        {
          "set_number": 36,
          "start_game": "7980247",
          "end_game": "7980266",
          "count": 5,
          "total_games": 20,
          "percentage": 25.0,
          "start_time": "2025-03-26T15:03:50.351000+05:30",
          "end_time": "2025-03-26T15:13:26.277000+05:30"
        },
        {
          "set_number": 37,
          "start_game": "7980267",
          "end_game": "7980286",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T15:13:40.393000+05:30",
          "end_time": "2025-03-26T15:23:29.670000+05:30"
        },
        {
          "set_number": 38,
          "start_game": "7980287",
          "end_game": "7980306",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T15:23:47.626000+05:30",
          "end_time": "2025-03-26T15:31:00.506000+05:30"
        },
        {
          "set_number": 39,
          "start_game": "7980307",
          "end_game": "7980326",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T15:31:30.198000+05:30",
          "end_time": "2025-03-26T15:40:27.924000+05:30"
        },
        {
          "set_number": 40,
          "start_game": "7980327",
          "end_game": "7980346",
          "count": 7,
          "total_games": 20,
          "percentage": 35.0,
          "start_time": "2025-03-26T15:40:53.115000+05:30",
          "end_time": "2025-03-26T15:51:26.892000+05:30"
        },
        {
          "set_number": 41,
          "start_game": "7980347",
          "end_game": "7980366",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T15:51:38.779000+05:30",
          "end_time": "2025-03-26T15:59:56.442000+05:30"
        },
        {
          "set_number": 42,
          "start_game": "7980367",
          "end_game": "7980386",
          "count": 5,
          "total_games": 20,
          "percentage": 25.0,
          "start_time": "2025-03-26T16:00:14.373000+05:30",
          "end_time": "2025-03-26T16:09:52.331000+05:30"
        },
        {
          "set_number": 43,
          "start_game": "7980387",
          "end_game": "7980406",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T16:10:46.161000+05:30",
          "end_time": "2025-03-26T16:18:16.503000+05:30"
        },
        {
          "set_number": 44,
          "start_game": "7980407",
          "end_game": "7980426",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T16:18:57.937000+05:30",
          "end_time": "2025-03-26T16:27:06.933000+05:30"
        },
        {
          "set_number": 45,
          "start_game": "7980427",
          "end_game": "7980446",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T16:27:30.502000+05:30",
          "end_time": "2025-03-26T16:36:00.510000+05:30"
        },
        {
          "set_number": 46,
          "start_game": "7980447",
          "end_game": "7980466",
          "count": 5,
          "total_games": 20,
          "percentage": 25.0,
          "start_time": "2025-03-26T16:36:23.581000+05:30",
          "end_time": "2025-03-26T16:47:10.829000+05:30"
        },
        {
          "set_number": 47,
          "start_game": "7980467",
          "end_game": "7980486",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T16:47:29.400000+05:30",
          "end_time": "2025-03-26T16:55:37.363000+05:30"
        },
        {
          "set_number": 48,
          "start_game": "7980487",
          "end_game": "7980506",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T16:56:12.218000+05:30",
          "end_time": "2025-03-26T17:06:16.229000+05:30"
        },
        {
          "set_number": 49,
          "start_game": "7980507",
          "end_game": "7980526",
          "count": 5,
          "total_games": 20,
          "percentage": 25.0,
          "start_time": "2025-03-26T17:06:50.247000+05:30",
          "end_time": "2025-03-26T17:17:17.589000+05:30"
        },
        {
          "set_number": 50,
          "start_game": "7980527",
          "end_game": "7980546",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T17:17:44.907000+05:30",
          "end_time": "2025-03-26T17:25:45.967000+05:30"
        }
      ],
      "10.0": [
        {
          "set_number": 1,
          "start_game": "7979547",
          "end_game": "7979566",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T09:15:16.706000+05:30",
          "end_time": "2025-03-26T09:22:06.121000+05:30"
        },
        {
          "set_number": 2,
          "start_game": "7979567",
          "end_game": "7979586",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T09:22:19.087000+05:30",
          "end_time": "2025-03-26T09:32:02.242000+05:30"
        },
        {
          "set_number": 3,
          "start_game": "7979587",
          "end_game": "7979606",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T09:32:34.872000+05:30",
          "end_time": "2025-03-26T09:40:13.068000+05:30"
        },
        {
          "set_number": 4,
          "start_game": "7979607",
          "end_game": "7979626",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T09:40:29.611000+05:30",
          "end_time": "2025-03-26T09:50:17.879000+05:30"
        },
        {
          "set_number": 5,
          "start_game": "7979627",
          "end_game": "7979646",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T09:51:02.901000+05:30",
          "end_time": "2025-03-26T10:01:50.119000+05:30"
        },
        {
          "set_number": 6,
          "start_game": "7979647",
          "end_game": "7979666",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T10:02:08.594000+05:30",
          "end_time": "2025-03-26T10:11:16.841000+05:30"
        },
        {
          "set_number": 7,
          "start_game": "7979667",
          "end_game": "7979686",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T10:11:36.235000+05:30",
          "end_time": "2025-03-26T10:22:06.306000+05:30"
        },
        {
          "set_number": 8,
          "start_game": "7979687",
          "end_game": "7979706",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T10:23:29.893000+05:30",
          "end_time": "2025-03-26T10:32:17.041000+05:30"
        },
        {
          "set_number": 9,
          "start_game": "7979707",
          "end_game": "7979726",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T10:32:34.388000+05:30",
          "end_time": "2025-03-26T10:40:14.977000+05:30"
        },
        {
          "set_number": 10,
          "start_game": "7979727",
          "end_game": "7979746",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T10:40:28.870000+05:30",
          "end_time": "2025-03-26T10:48:48.078000+05:30"
        },
        {
          "set_number": 11,
          "start_game": "7979747",
          "end_game": "7979766",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T10:49:03.690000+05:30",
          "end_time": "2025-03-26T11:00:41.922000+05:30"
        },
        {
          "set_number": 12,
          "start_game": "7979767",
          "end_game": "7979786",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T11:00:55.030000+05:30",
          "end_time": "2025-03-26T11:10:43.013000+05:30"
        },
        {
          "set_number": 13,
          "start_game": "7979787",
          "end_game": "7979806",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T11:11:00.057000+05:30",
          "end_time": "2025-03-26T11:18:33.159000+05:30"
        },
        {
          "set_number": 14,
          "start_game": "7979807",
          "end_game": "7979826",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T11:18:51.351000+05:30",
          "end_time": "2025-03-26T11:29:08.238000+05:30"
        },
        {
          "set_number": 15,
          "start_game": "7979827",
          "end_game": "7979846",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T11:29:38.084000+05:30",
          "end_time": "2025-03-26T11:39:05.570000+05:30"
        },
        {
          "set_number": 16,
          "start_game": "7979847",
          "end_game": "7979866",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T11:39:29.613000+05:30",
          "end_time": "2025-03-26T11:47:31.409000+05:30"
        },
        {
          "set_number": 17,
          "start_game": "7979867",
          "end_game": "7979886",
          "count": 5,
          "total_games": 20,
          "percentage": 25.0,
          "start_time": "2025-03-26T11:47:50.055000+05:30",
          "end_time": "2025-03-26T11:59:29.511000+05:30"
        },
        {
          "set_number": 18,
          "start_game": "7979887",
          "end_game": "7979906",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T11:59:55.329000+05:30",
          "end_time": "2025-03-26T12:09:37.508000+05:30"
        },
        {
          "set_number": 19,
          "start_game": "7979907",
          "end_game": "7979926",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T12:10:02.641000+05:30",
          "end_time": "2025-03-26T12:20:10.011000+05:30"
        },
        {
          "set_number": 20,
          "start_game": "7979927",
          "end_game": "7979946",
          "count": 5,
          "total_games": 20,
          "percentage": 25.0,
          "start_time": "2025-03-26T12:21:20.030000+05:30",
          "end_time": "2025-03-26T12:30:40.698000+05:30"
        },
        {
          "set_number": 21,
          "start_game": "7979947",
          "end_game": "7979966",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T12:31:16.446000+05:30",
          "end_time": "2025-03-26T12:39:07.517000+05:30"
        },
        {
          "set_number": 22,
          "start_game": "7979967",
          "end_game": "7979986",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T12:39:33.141000+05:30",
          "end_time": "2025-03-26T12:50:32.811000+05:30"
        },
        {
          "set_number": 23,
          "start_game": "7979987",
          "end_game": "7980006",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T12:51:06.671000+05:30",
          "end_time": "2025-03-26T13:01:09.436000+05:30"
        },
        {
          "set_number": 24,
          "start_game": "7980007",
          "end_game": "7980026",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T13:01:23.675000+05:30",
          "end_time": "2025-03-26T13:10:53.479000+05:30"
        },
        {
          "set_number": 25,
          "start_game": "7980027",
          "end_game": "7980046",
          "count": 7,
          "total_games": 20,
          "percentage": 35.0,
          "start_time": "2025-03-26T13:11:41.034000+05:30",
          "end_time": "2025-03-26T13:23:33.559000+05:30"
        },
        {
          "set_number": 26,
          "start_game": "7980047",
          "end_game": "7980066",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T13:23:56.783000+05:30",
          "end_time": "2025-03-26T13:31:34.463000+05:30"
        },
        {
          "set_number": 27,
          "start_game": "7980067",
          "end_game": "7980086",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T13:32:31.934000+05:30",
          "end_time": "2025-03-26T13:42:07.614000+05:30"
        },
        {
          "set_number": 28,
          "start_game": "7980087",
          "end_game": "7980106",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T13:42:20.054000+05:30",
          "end_time": "2025-03-26T13:52:18.349000+05:30"
        },
        {
          "set_number": 29,
          "start_game": "7980107",
          "end_game": "7980126",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T13:52:30.083000+05:30",
          "end_time": "2025-03-26T14:01:23.644000+05:30"
        },
        {
          "set_number": 30,
          "start_game": "7980127",
          "end_game": "7980146",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T14:01:40.839000+05:30",
          "end_time": "2025-03-26T14:11:40.329000+05:30"
        },
        {
          "set_number": 31,
          "start_game": "7980147",
          "end_game": "7980166",
          "count": 5,
          "total_games": 20,
          "percentage": 25.0,
          "start_time": "2025-03-26T14:12:27.222000+05:30",
          "end_time": "2025-03-26T14:24:29.114000+05:30"
        },
        {
          "set_number": 32,
          "start_game": "7980167",
          "end_game": "7980186",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T14:25:41.535000+05:30",
          "end_time": "2025-03-26T14:35:29.065000+05:30"
        },
        {
          "set_number": 33,
          "start_game": "7980187",
          "end_game": "7980206",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T14:36:17.936000+05:30",
          "end_time": "2025-03-26T14:46:09.946000+05:30"
        },
        {
          "set_number": 34,
          "start_game": "7980207",
          "end_game": "7980226",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T14:46:37.915000+05:30",
          "end_time": "2025-03-26T14:55:15.966000+05:30"
        },
        {
          "set_number": 35,
          "start_game": "7980227",
          "end_game": "7980246",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T14:55:31.288000+05:30",
          "end_time": "2025-03-26T15:03:24.908000+05:30"
        },
        {
          "set_number": 36,
          "start_game": "7980247",
          "end_game": "7980266",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T15:03:50.351000+05:30",
          "end_time": "2025-03-26T15:13:26.277000+05:30"
        },
        {
          "set_number": 37,
          "start_game": "7980267",
          "end_game": "7980286",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T15:13:40.393000+05:30",
          "end_time": "2025-03-26T15:23:29.670000+05:30"
        },
        {
          "set_number": 38,
          "start_game": "7980287",
          "end_game": "7980306",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T15:23:47.626000+05:30",
          "end_time": "2025-03-26T15:31:00.506000+05:30"
        },
        {
          "set_number": 39,
          "start_game": "7980307",
          "end_game": "7980326",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T15:31:30.198000+05:30",
          "end_time": "2025-03-26T15:40:27.924000+05:30"
        },
        {
          "set_number": 40,
          "start_game": "7980327",
          "end_game": "7980346",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T15:40:53.115000+05:30",
          "end_time": "2025-03-26T15:51:26.892000+05:30"
        },
        {
          "set_number": 41,
          "start_game": "7980347",
          "end_game": "7980366",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T15:51:38.779000+05:30",
          "end_time": "2025-03-26T15:59:56.442000+05:30"
        },
        {
          "set_number": 42,
          "start_game": "7980367",
          "end_game": "7980386",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T16:00:14.373000+05:30",
          "end_time": "2025-03-26T16:09:52.331000+05:30"
        },
        {
          "set_number": 43,
          "start_game": "7980387",
          "end_game": "7980406",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T16:10:46.161000+05:30",
          "end_time": "2025-03-26T16:18:16.503000+05:30"
        },
        {
          "set_number": 44,
          "start_game": "7980407",
          "end_game": "7980426",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T16:18:57.937000+05:30",
          "end_time": "2025-03-26T16:27:06.933000+05:30"
        },
        {
          "set_number": 45,
          "start_game": "7980427",
          "end_game": "7980446",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T16:27:30.502000+05:30",
          "end_time": "2025-03-26T16:36:00.510000+05:30"
        },
        {
          "set_number": 46,
          "start_game": "7980447",
          "end_game": "7980466",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T16:36:23.581000+05:30",
          "end_time": "2025-03-26T16:47:10.829000+05:30"
        },
        {
          "set_number": 47,
          "start_game": "7980467",
          "end_game": "7980486",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T16:47:29.400000+05:30",
          "end_time": "2025-03-26T16:55:37.363000+05:30"
        },
        {
          "set_number": 48,
          "start_game": "7980487",
          "end_game": "7980506",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T16:56:12.218000+05:30",
          "end_time": "2025-03-26T17:06:16.229000+05:30"
        },
        {
          "set_number": 49,
          "start_game": "7980507",
          "end_game": "7980526",
          "count": 4,
          "total_games": 20,
          "percentage": 20.0,
          "start_time": "2025-03-26T17:06:50.247000+05:30",
          "end_time": "2025-03-26T17:17:17.589000+05:30"
        },
        {
          "set_number": 50,
          "start_game": "7980527",
          "end_game": "7980546",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T17:17:44.907000+05:30",
          "end_time": "2025-03-26T17:25:45.967000+05:30"
        }
      ],
      "20.0": [
        {
          "set_number": 1,
          "start_game": "7979547",
          "end_game": "7979566",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T09:15:16.706000+05:30",
          "end_time": "2025-03-26T09:22:06.121000+05:30"
        },
        {
          "set_number": 2,
          "start_game": "7979567",
          "end_game": "7979586",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T09:22:19.087000+05:30",
          "end_time": "2025-03-26T09:32:02.242000+05:30"
        },
        {
          "set_number": 3,
          "start_game": "7979587",
          "end_game": "7979606",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T09:32:34.872000+05:30",
          "end_time": "2025-03-26T09:40:13.068000+05:30"
        },
        {
          "set_number": 4,
          "start_game": "7979607",
          "end_game": "7979626",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T09:40:29.611000+05:30",
          "end_time": "2025-03-26T09:50:17.879000+05:30"
        },
        {
          "set_number": 5,
          "start_game": "7979627",
          "end_game": "7979646",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T09:51:02.901000+05:30",
          "end_time": "2025-03-26T10:01:50.119000+05:30"
        },
        {
          "set_number": 6,
          "start_game": "7979647",
          "end_game": "7979666",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T10:02:08.594000+05:30",
          "end_time": "2025-03-26T10:11:16.841000+05:30"
        },
        {
          "set_number": 7,
          "start_game": "7979667",
          "end_game": "7979686",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T10:11:36.235000+05:30",
          "end_time": "2025-03-26T10:22:06.306000+05:30"
        },
        {
          "set_number": 8,
          "start_game": "7979687",
          "end_game": "7979706",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T10:23:29.893000+05:30",
          "end_time": "2025-03-26T10:32:17.041000+05:30"
        },
        {
          "set_number": 9,
          "start_game": "7979707",
          "end_game": "7979726",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T10:32:34.388000+05:30",
          "end_time": "2025-03-26T10:40:14.977000+05:30"
        },
        {
          "set_number": 10,
          "start_game": "7979727",
          "end_game": "7979746",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T10:40:28.870000+05:30",
          "end_time": "2025-03-26T10:48:48.078000+05:30"
        },
        {
          "set_number": 11,
          "start_game": "7979747",
          "end_game": "7979766",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T10:49:03.690000+05:30",
          "end_time": "2025-03-26T11:00:41.922000+05:30"
        },
        {
          "set_number": 12,
          "start_game": "7979767",
          "end_game": "7979786",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T11:00:55.030000+05:30",
          "end_time": "2025-03-26T11:10:43.013000+05:30"
        },
        {
          "set_number": 13,
          "start_game": "7979787",
          "end_game": "7979806",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T11:11:00.057000+05:30",
          "end_time": "2025-03-26T11:18:33.159000+05:30"
        },
        {
          "set_number": 14,
          "start_game": "7979807",
          "end_game": "7979826",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T11:18:51.351000+05:30",
          "end_time": "2025-03-26T11:29:08.238000+05:30"
        },
        {
          "set_number": 15,
          "start_game": "7979827",
          "end_game": "7979846",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T11:29:38.084000+05:30",
          "end_time": "2025-03-26T11:39:05.570000+05:30"
        },
        {
          "set_number": 16,
          "start_game": "7979847",
          "end_game": "7979866",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T11:39:29.613000+05:30",
          "end_time": "2025-03-26T11:47:31.409000+05:30"
        },
        {
          "set_number": 17,
          "start_game": "7979867",
          "end_game": "7979886",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T11:47:50.055000+05:30",
          "end_time": "2025-03-26T11:59:29.511000+05:30"
        },
        {
          "set_number": 18,
          "start_game": "7979887",
          "end_game": "7979906",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T11:59:55.329000+05:30",
          "end_time": "2025-03-26T12:09:37.508000+05:30"
        },
        {
          "set_number": 19,
          "start_game": "7979907",
          "end_game": "7979926",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T12:10:02.641000+05:30",
          "end_time": "2025-03-26T12:20:10.011000+05:30"
        },
        {
          "set_number": 20,
          "start_game": "7979927",
          "end_game": "7979946",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T12:21:20.030000+05:30",
          "end_time": "2025-03-26T12:30:40.698000+05:30"
        },
        {
          "set_number": 21,
          "start_game": "7979947",
          "end_game": "7979966",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T12:31:16.446000+05:30",
          "end_time": "2025-03-26T12:39:07.517000+05:30"
        },
        {
          "set_number": 22,
          "start_game": "7979967",
          "end_game": "7979986",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T12:39:33.141000+05:30",
          "end_time": "2025-03-26T12:50:32.811000+05:30"
        },
        {
          "set_number": 23,
          "start_game": "7979987",
          "end_game": "7980006",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T12:51:06.671000+05:30",
          "end_time": "2025-03-26T13:01:09.436000+05:30"
        },
        {
          "set_number": 24,
          "start_game": "7980007",
          "end_game": "7980026",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T13:01:23.675000+05:30",
          "end_time": "2025-03-26T13:10:53.479000+05:30"
        },
        {
          "set_number": 25,
          "start_game": "7980027",
          "end_game": "7980046",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T13:11:41.034000+05:30",
          "end_time": "2025-03-26T13:23:33.559000+05:30"
        },
        {
          "set_number": 26,
          "start_game": "7980047",
          "end_game": "7980066",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T13:23:56.783000+05:30",
          "end_time": "2025-03-26T13:31:34.463000+05:30"
        },
        {
          "set_number": 27,
          "start_game": "7980067",
          "end_game": "7980086",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T13:32:31.934000+05:30",
          "end_time": "2025-03-26T13:42:07.614000+05:30"
        },
        {
          "set_number": 28,
          "start_game": "7980087",
          "end_game": "7980106",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T13:42:20.054000+05:30",
          "end_time": "2025-03-26T13:52:18.349000+05:30"
        },
        {
          "set_number": 29,
          "start_game": "7980107",
          "end_game": "7980126",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T13:52:30.083000+05:30",
          "end_time": "2025-03-26T14:01:23.644000+05:30"
        },
        {
          "set_number": 30,
          "start_game": "7980127",
          "end_game": "7980146",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T14:01:40.839000+05:30",
          "end_time": "2025-03-26T14:11:40.329000+05:30"
        },
        {
          "set_number": 31,
          "start_game": "7980147",
          "end_game": "7980166",
          "count": 5,
          "total_games": 20,
          "percentage": 25.0,
          "start_time": "2025-03-26T14:12:27.222000+05:30",
          "end_time": "2025-03-26T14:24:29.114000+05:30"
        },
        {
          "set_number": 32,
          "start_game": "7980167",
          "end_game": "7980186",
          "count": 3,
          "total_games": 20,
          "percentage": 15.0,
          "start_time": "2025-03-26T14:25:41.535000+05:30",
          "end_time": "2025-03-26T14:35:29.065000+05:30"
        },
        {
          "set_number": 33,
          "start_game": "7980187",
          "end_game": "7980206",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T14:36:17.936000+05:30",
          "end_time": "2025-03-26T14:46:09.946000+05:30"
        },
        {
          "set_number": 34,
          "start_game": "7980207",
          "end_game": "7980226",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T14:46:37.915000+05:30",
          "end_time": "2025-03-26T14:55:15.966000+05:30"
        },
        {
          "set_number": 35,
          "start_game": "7980227",
          "end_game": "7980246",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T14:55:31.288000+05:30",
          "end_time": "2025-03-26T15:03:24.908000+05:30"
        },
        {
          "set_number": 36,
          "start_game": "7980247",
          "end_game": "7980266",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T15:03:50.351000+05:30",
          "end_time": "2025-03-26T15:13:26.277000+05:30"
        },
        {
          "set_number": 37,
          "start_game": "7980267",
          "end_game": "7980286",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T15:13:40.393000+05:30",
          "end_time": "2025-03-26T15:23:29.670000+05:30"
        },
        {
          "set_number": 38,
          "start_game": "7980287",
          "end_game": "7980306",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T15:23:47.626000+05:30",
          "end_time": "2025-03-26T15:31:00.506000+05:30"
        },
        {
          "set_number": 39,
          "start_game": "7980307",
          "end_game": "7980326",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T15:31:30.198000+05:30",
          "end_time": "2025-03-26T15:40:27.924000+05:30"
        },
        {
          "set_number": 40,
          "start_game": "7980327",
          "end_game": "7980346",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T15:40:53.115000+05:30",
          "end_time": "2025-03-26T15:51:26.892000+05:30"
        },
        {
          "set_number": 41,
          "start_game": "7980347",
          "end_game": "7980366",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T15:51:38.779000+05:30",
          "end_time": "2025-03-26T15:59:56.442000+05:30"
        },
        {
          "set_number": 42,
          "start_game": "7980367",
          "end_game": "7980386",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T16:00:14.373000+05:30",
          "end_time": "2025-03-26T16:09:52.331000+05:30"
        },
        {
          "set_number": 43,
          "start_game": "7980387",
          "end_game": "7980406",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T16:10:46.161000+05:30",
          "end_time": "2025-03-26T16:18:16.503000+05:30"
        },
        {
          "set_number": 44,
          "start_game": "7980407",
          "end_game": "7980426",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T16:18:57.937000+05:30",
          "end_time": "2025-03-26T16:27:06.933000+05:30"
        },
        {
          "set_number": 45,
          "start_game": "7980427",
          "end_game": "7980446",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T16:27:30.502000+05:30",
          "end_time": "2025-03-26T16:36:00.510000+05:30"
        },
        {
          "set_number": 46,
          "start_game": "7980447",
          "end_game": "7980466",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T16:36:23.581000+05:30",
          "end_time": "2025-03-26T16:47:10.829000+05:30"
        },
        {
          "set_number": 47,
          "start_game": "7980467",
          "end_game": "7980486",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T16:47:29.400000+05:30",
          "end_time": "2025-03-26T16:55:37.363000+05:30"
        },
        {
          "set_number": 48,
          "start_game": "7980487",
          "end_game": "7980506",
          "count": 1,
          "total_games": 20,
          "percentage": 5.0,
          "start_time": "2025-03-26T16:56:12.218000+05:30",
          "end_time": "2025-03-26T17:06:16.229000+05:30"
        },
        {
          "set_number": 49,
          "start_game": "7980507",
          "end_game": "7980526",
          "count": 2,
          "total_games": 20,
          "percentage": 10.0,
          "start_time": "2025-03-26T17:06:50.247000+05:30",
          "end_time": "2025-03-26T17:17:17.589000+05:30"
        },
        {
          "set_number": 50,
          "start_game": "7980527",
          "end_game": "7980546",
          "count": 0,
          "total_games": 20,
          "percentage": 0.0,
          "start_time": "2025-03-26T17:17:44.907000+05:30",
          "end_time": "2025-03-26T17:25:45.967000+05:30"
        }
      ]
    }
  }
}
```