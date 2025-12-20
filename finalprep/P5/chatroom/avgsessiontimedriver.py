from pyspark import SparkContext, SparkConf

MASTER_URL = "spark://10.10.10.10:7070"
APP_NAME = "averagetime"

conf = SparkConf().setAppName(APP_NAME).setMaster(MASTER_URL)
sc = SparkContext(conf=conf)

#join_id,user_id,room_id,join_time,leave_time

roomjoin = "room_joins.csv"
output_path = "path/to/file"

linesRDD = sc.textFile(roomjoin)

header = linesRDD.first()
dataRDD = linesRDD.filter(lambda line: line!=header)

timeRDD = dataRDD.map(lambda line: line.splitBy(","))

def session_duration(join_time, leave_time):
    format = "%Y-%m-%d %H:%M:%S"
    start = datetime.strptime(join_time, format)
    end = datetime.strptime(leave_time, format)
    return (end-start).total_seconds()

userSessionRDD = timeRDD.map(lambda j: j[1], (session_duration(j[3], j[4]), 1))

sumCountRDD = userSessionRDD.reduceByKey(lambda a,b: a[0]+b[0], a[1]+b[1])

avgSessionRDD = sunCountRDD.map(lambda x: (x[0], x[1][0] / x[1][1]))

sortedRDD = avgSessionRDD.sortBy(lambda x: x[1], ascending=false)

sortedRDD.map(lambda x: {'User ID': x[0], 'Average Session Duration (seconds)': x[1]}).saveAsTextFile(output_file)

sc.stop()