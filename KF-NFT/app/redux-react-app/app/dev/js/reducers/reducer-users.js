/*
 * The topics list reducer will always return an array of lists no matter what
 * You need to return something, so if there are no lists then we return an empty array
 * */

export default function () {
    return [
        {
            id: 1,
            first: "BMI Chart",
            description: "A BMI Chart or Body Mass Index Chart can be a useful tool for visualizing the ranges for underweight, healthy weight, overweight, and obesity based on a person's height. The simplicity of the BMI formula has made it extremely popular as an initial diagnosing tool for determining a person's healthy body weight. The formula does have its shortcomings because it does not take into account age, frame size, gender, or muscularity.",
            thumbnail: "https://www.vertex42.com/ExcelTemplates/Images/bmi-chart.gif"
        },
        {
            id: 2,
            first: "What surgical options are used to treat obesity?",
            description: "Weight loss surgeries — also called bariatric surgeries — can help treat obesity. You should only consider surgical treatment for weight loss if you: Have a BMI of 40 or higher, Have a BMI of 35 or higher and weight-related health problems, Have not had success with other weight-loss methods",
            thumbnail: "https://www.womenshealth.gov/files/images/digestive-system.gif"
        },
        {
            id: 3,
            first: "What are the health effects of being overweight or obese?",
            description: "Being overweight or obese can increase your risk of: Heart disease, Stroke,Type 2 diabetes, High blood pressure, Breathing problems, Arthritis, Gallbladder disease. Some kinds of cancer. But excess body weight isn't the only health risk. The places where you store your body fat also affect your health. Women with a 'pear' shape tend to store fat in their hips and buttocks. Women with an 'apple' shape store fat around their waists. If your waist is more than 35 inches, you may have a higher risk of weight-related ",
            thumbnail: "https://www.womenshealth.gov/files/images/hds-apple-vs-pear.jpg"
        }
        
    ]
}


