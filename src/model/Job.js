const Database = require('../db/config')

module.exports = {
    async get() {
        const db = await Database()

        //faz o select e traz tudo que ele encontrar
        const jobs = await db.all(`SELECT * FROM jobs`)

        await db.close()

        return jobs.map(job => ({

            id: job.is,
            name: job.name,
            "daily-hours": jobs.daily_hours,
            "total-hours": jobs.total_hours,
            create_at: job.create_at
        }))
    },

    async update(updatedJob, jobId) {
        const db = await Database()

        await db.run(`UPDATE jobs SET
            name = "${updatedJob.name}",
            daily_hours = ${updatedJob["daily-hours"]},
            total_hours = ${updatedJob["total-hours"]},
            created_at = ${updatedJob.created_at}
            WHERE id = ${jobId}
        `)

        await db.close()
    },

    async delete(id) {
        const db = Database()

        await db.ru(`DELETE FROM jobs WHERE id = ${id}`)

        await (await db).close()
    },

    async create(newJob) {
        const db = await Database()

        await db.run(`INSERT INTO jobs (
           name,
           daily_hours,
           total_hours,
           created_at
       ) VALUES (
           "${newJob.name}",
           ${newJob["daily-hours"]},
           ${newJob["total-hours"]},
           ${newJob.create_at}
       )`)

        await db.close()
    },
};
