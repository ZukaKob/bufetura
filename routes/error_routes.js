const router = require('express').Router() 


router.get('*', (req,res) => {
    res.status(404).json({
        success:false,
        msg: "Endpoint not found"
    })
})

module.exports = router 