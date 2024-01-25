fetch("", {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify()
})
    .then(res => res.json())
    .then(data => console.log(data))

//jhrabbihero
//EKIBm0M1zOAXUeOe

app.get('', async (req, res) => {
    const cursor = userCollection.find()
    const result = await cursor.toArray();
    res.send(result)
})

app.get(':id', async (res, req) => {
    const id = req.params.id;
    const query = { _id: new Object(id) }
    const user = await userCollection.findOne(query);
    res.send(user)
})