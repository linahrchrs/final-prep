IV.I. In Spark vocabulary, what role does the front server play?

Front server

- Acts as the Spark Driver

- Accepts the user’s application (code / job submission)

- Builds the DAG (Directed Acyclic Graph) of tasks

- Schedules work and coordinates execution

- Collects and aggregates results from workers

IV.II. in Spark vocabulary, what role does the back-end server play?

Back-end servers

- Act as Spark Executors (Workers)

- Execute the tasks assigned by the driver

- Perform actual computation on data partitions

- Store data in memory/disk (caching, shuffles)

- Send results and status updates back to the driver

==> In short:

Front server = control & coordination (Driver)

Back-end servers = computation & data processing (Executors)