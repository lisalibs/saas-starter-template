# DevOps Checklist (SaaS Starter Template)

## Foundations
- [ ] All services containerized (backend, ai-engine, frontend, db)
- [ ] Environment variables stored in infra/env
- [ ] Secrets not checked into git
- [ ] Health endpoints for backend and ai-engine

## CI (Continuous Integration)
- [ ] On each push: install deps and run tests for backend and ai-engine
- [ ] Linting configured (optional)
- [ ] CI fails on test failure

## CD (Continuous Deployment) – later
- [ ] Only deploy from main branch
- [ ] Build Docker images with unique tags (commit SHA)
- [ ] Pull and restart services on server using docker-compose
- [ ] Rollback strategy: redeploy previous image tag

## Observability
- [ ] Basic logs available (docker logs)
- [ ] Health checks monitored
- [ ] Uptime monitoring configured

## Security
- [ ] HTTPS in production
- [ ] CORS rules set on backend
- [ ] JWT expiry and refresh
- [ ] Rate limiting on sensitive routes

Update this file per project when you clone this starter for a real SaaS.
