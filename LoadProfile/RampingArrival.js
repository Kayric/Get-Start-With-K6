import http from 'k6/http';

export const options = {
    scenarios: {
      k6_workshop: {
        executor: 'ramping-arrival-rate',
        startRate: 10,
        timeUnit: '1m',
        stages: [
          // Level at 10 iters/minute for 6 seconds
          { target: 10, duration: "6s" },
          // Spike from 10 iters/minute to 50 iters/minute in 3 seconds!
          { target: 50, duration: "3s" },
          // Level at 50 iters/minute for 5 seconds
          { target: 50, duration: "5s" },
          // Slowing down from 50 iters/minute to 30 iters/minute over 8 seconds
          { target: 30, duration: "8s" },
          // Leveled off at 30 iters/minute for remainder
          { target: 30, duration: "8s" },
        ],
        preAllocatedVUs: 50,
      },
    },
  };

export default function () {
  console.log(`[VU: ${__VU}, iteration: ${__ITER}] Starting iteration...`);
  http.get('https://test.k6.io/contacts.php');
}