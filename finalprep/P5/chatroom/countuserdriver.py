#Count unique users per room - Which rooms have the most participants?

from pyspark import SparkContext, SparkConf

MASTER_URL = "spark://10.10.10.10:7070"
APP_NAME = "countUniqueUsers"

conf = SparkConf().setAppName(APP_NAME).setMaster(MASTER_URL)
sc = SparkContext(conf=conf)

#join_id,user_id,room_id,join_time,leave_time
rooms = "room_joins.csv"
output_path = "path/to/file"

linesRDD = sc.textFile(rooms)

header = linesRDD.first()
dataRDD = linesRDD.filter(lambda line: line != header)

roomsRDD = dataRDD.map(lambda line: line.splitBy(","))

usersPerRoomRDD = roomsRDD.map(lambda u: (u[2], u[1]))

usersUniqueRDD = userPerRoomRDD.distinct()

uniqueUsersPerRoomRDD = usersUniqueRDD.map(lambda x: (x[0], 1)).reduceByKey(lambda a,b: a+b)

sortedRDD = uniqueUserPerRoomRDD.sortBy(lambda x: x[1], ascending = False)

sortedRDD.map(lambda x: {'Room ID': x[0], 'Total number of unique users': x[1]}).saveAsTextFile(output_path)
