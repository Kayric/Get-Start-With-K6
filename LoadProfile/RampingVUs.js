import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    k6_workshop: {
      executor: 'ramping-vus',
      stages: [
        { target: 1, duration: "12s" },
        { target: 10, duration: "3s" },
        { target: 3, duration: "3s" },
        { target: 3, duration: "12s" },
      ],
      startVUs: 1,
    },
  },
};

export default function () {
  console.log(`[VU: ${__VU}, iteration: ${__ITER}] Starting iteration...`);
  http.get('https://test.k6.io/contacts.php');
  sleep(1);
}