import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
      { duration: '1m', target: 100 },
      { duration: '1m', target: 100 },
      { duration: '1m', target: 0 },
    ],
    thresholds: {
        http_req_failed: [{
            threshold: 'rate<=0.05',
            abortOnFail: true,
          }],
        http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
        checks: ['rate>=0.9']
      },
  };

export default function() {
    const url = 'https://httpbin.test.k6.io/post';
    const response = http.post(url,'Hello world!');
    check(response, {
        'Application says hello': (r) => r.body.includes('Hello world!'),
        'is status 200': (r) => r.status === 200,
    });
    sleep(Math.random() * 5);
}
