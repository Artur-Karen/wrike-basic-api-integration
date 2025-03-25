import axios from 'axios';
import fs from 'fs/promises';

const token = 'eyJ0dCI6InAiLCJhbGciOiJIUzI1NiIsInR2IjoiMSJ9.eyJkIjoie1wiYVwiOjY3Mzg1NDQsXCJpXCI6OTM1NDc5OCxcImNcIjo0NjkyMjIyLFwidVwiOjIxNDEzNjc1LFwiclwiOlwiVVNcIixcInNcIjpbXCJXXCIsXCJGXCIsXCJJXCIsXCJVXCIsXCJLXCIsXCJDXCIsXCJEXCIsXCJNXCIsXCJBXCIsXCJMXCIsXCJQXCJdLFwielwiOltdLFwidFwiOjB9IiwiaWF0IjoxNzQyNjYxNTQwfQ.ehkmP36Tw7BZOPzaIvs8Iq8yfplQr9EDPbLAXYkacBc';
const folders_Ids = ['IEAGNUTQI5QHEN5D', 'IEAGNUTQI5QHEUTJ'];

const fetchAndSaveData = async () => {
    const allTasks = [];

    for(let folder_Id of folders_Ids) {
        const tasks = await getWrikeTasks(folder_Id);
        for(let task of tasks) {
            allTasks.push({
                id: task.id,
                name: task.title,
                status: task.status,
                created_at: task.createdDate,
                updated_at: task.updatedDate,
                ticket_url: task.permalink
            })
        }
    }

    try{
        await fs.writeFile('tasks.json', JSON.stringify(allTasks, null, 2));
        console.log("Tasks successfully saved to tasks.json");
    } catch(error) {
        console.error(`Error writing data to file: ${error.message}`);
    }
}

const getWrikeTasks = async (id) => {
    try {
        const response = await axios.get(`https://www.wrike.com/api/v4/folders/${id}/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data.data;
    } catch(error) {
        console.error(`Impossible fetch data: ${error.message}`)
        return [];
    }
}

export { fetchAndSaveData };