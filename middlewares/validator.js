const { body, query, matchedData, validationResult } = require('express-validator');

const userValidationRules = () => {
    return [
        body('name').notEmpty().withMessage('الاسم مطلوب'),
        body('email').notEmpty().withMessage('البريد الإلكتروني مطلوب'),
        body('email').isEmail().withMessage('أدخل بريد صحيح'),
        body('password').notEmpty().withMessage('كلمة المرور مطلوبة'),
        body('password').isLength({min: 5}).withMessage('كلمة المرور يجب أن تكون أكثر من 5 محارف')
    ]
}



const validate = (req, res, next) => {
    const errors = validationResult(req)


    if (errors.isEmpty()) {
        return next()   //don't forget return
    }

    const extractedErrors = []



    if (req.path == '/account/update') {

        //function to check if the error field exist in the request fields
        const isIn = (err) => Object.keys(req.body).includes(err.path)

        errors.array().map(err => isIn(err)? extractedErrors.push({
            [err.path] : err.msg  // ???
        }): null)

        if (!extractedErrors.length) return next()
        
        return res.status(400).json({errors:  extractedErrors})

    }


    errors.array().map(err => extractedErrors.push({
        [err.path] : err.msg  // ???
    }))

    return res.status(400).json({errors:  extractedErrors})
}

module.exports = {
    userValidationRules,  validate
}


