BEGIN TRANSACTION;
CREATE TABLE schema (
    version INT
);

INSERT INTO schema (version) VALUES (1);

CREATE TABLE metrics (
    metric TEXT NOT NULL,
    created INTEGER DEFAULT CURRENT_TIMESTAMP,
    modified INTEGER DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX metriccreated ON metrics(metric, created);

COMMIT TRANSACTION;