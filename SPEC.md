# Spec: Rule Execution Trace

## Goal

Mỗi khi system evaluate một rule, phải ghi lại execution trace để phục vụ debugging và audit.

## Requirements

**REQ-001:** Mỗi trace phải ghi lại:
- `ruleId`: string
- `input`: object (the context passed to the rule evaluator)
- `result`: boolean (did the rule pass or fail)
- `confidence`: number (0.0 to 1.0)
- `durationMs`: number (how long evaluation took)
- `timestamp`: ISO 8601

**REQ-002:** Traces phải persist trong PostgreSQL.

**REQ-003:** Endpoint `GET /traces?ruleId=<id>`
Trả về tất cả traces của một rule, sorted newest first.
Phải support pagination.

**REQ-004:** System phải "alert" khi confidence thấp.

**REQ-005:** Trace data không được làm chậm rule evaluation.
Rule evaluation phải hoàn thành trong **< 50ms**.
