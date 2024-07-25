document.getElementById('submit').addEventListener('click', function () {
    const age = document.getElementById('age').value;
    const sugarLevel = document.getElementById('sugarLevel').value;
    const bloodPressureSystolic = document.getElementById('bloodPressureSystolic').value;
    const bloodPressureDiastolic = document.getElementById('bloodPressureDiastolic').value;

    if (!age || !sugarLevel || !bloodPressureSystolic || !bloodPressureDiastolic ||
        isNaN(age) || isNaN(sugarLevel) || isNaN(bloodPressureSystolic) || isNaN(bloodPressureDiastolic)) {
        alert('Please enter valid numeric values.');
        return;
    }

    const dietPlan = getDietPlan(age, sugarLevel, bloodPressureSystolic, bloodPressureDiastolic);
    const exercisePlan = getExercisePlan(age, sugarLevel, bloodPressureSystolic, bloodPressureDiastolic);

    generatePDF(age, sugarLevel, bloodPressureSystolic, bloodPressureDiastolic, dietPlan, exercisePlan);
});

function getDietPlan(age, sugarLevel, bloodPressureSystolic, bloodPressureDiastolic) {
    let diet = "Diet recommendations based on your inputs:\n\n";

    if (age < 18) {
        diet += "As a minor, it's important to consult with a healthcare provider for a tailored diet plan.\n\n";
    } else {
        if (sugarLevel < 70) {
            diet += "Your sugar level is low.\n Consider increasing your intake of complex carbohydrates and including small, frequent meals throughout the day.\n\n";
        } else if (sugarLevel > 140) {
            diet += "Your sugar level is high.\n Focus on a diet rich in fiber, whole grains, and lean proteins. Avoid sugary foods and drinks.\n\n";
        } else {
            diet += "Your sugar level is normal.\n Maintain a balanced diet with a variety of nutrients.\n\n";
        }

        if (bloodPressureSystolic > 120 || bloodPressureDiastolic > 80) {
            diet += "Your blood pressure is elevated.\n Reduce sodium intake, eat more potassium-rich foods \n(like bananas, spinach), and focus on whole foods.\n\n";
        } else if (bloodPressureSystolic < 90 || bloodPressureDiastolic < 60) {
            diet += "Your blood pressure is low.\n Consider increasing salt intake moderately and ensure adequate hydration.\n\n";
        } else {
            diet += "Your blood pressure is normal.\n Maintain a balanced diet and monitor your health regularly.\n\n";
        }
    }
    return diet;
}

function getExercisePlan(age, sugarLevel, bloodPressureSystolic, bloodPressureDiastolic) {
    let exercise = "Exercise recommendations based on your inputs:\n\n";

    if (age < 18) {
        exercise += "As a minor, it's important to engage in regular physical activity suitable for your age.\n Consult with a healthcare provider for personalized advice.\n\n";
    } else {
        if (sugarLevel < 70) {
            exercise += "Your sugar level is low. \nFocus on moderate exercises like walking or yoga. \nAvoid intense workouts without proper nutrition.\n\n";
        } else if (sugarLevel > 140) {
            exercise += "Your sugar level is high.\n Engage in regular physical activity such as brisk walking, cycling, or swimming to help regulate your sugar levels.\n\n";
        } else {
            exercise += "Your sugar level is normal.\n Maintain a regular exercise routine including both cardio and strength training.\n\n";
        }

        if (bloodPressureSystolic > 120 || bloodPressureDiastolic > 80) {
            exercise += "Your blood pressure is elevated.\n Focus on cardiovascular exercises like walking, jogging, or swimming. Avoid heavy weight lifting.\n\n";
        } else if (bloodPressureSystolic < 90 || bloodPressureDiastolic < 60) {
            exercise += "Your blood pressure is low.\n Moderate exercises like walking or light cycling are recommended. Avoid sudden changes in posture.\n\n";
        } else {
            exercise += "Your blood pressure is normal.\n Engage in a balanced exercise routine including cardio, strength training, and flexibility exercises.\n\n";
        }
    }
    return exercise;
}

function generatePDF(age, sugarLevel, bloodPressureSystolic, bloodPressureDiastolic, dietPlan, exercisePlan) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Personalized Health Plan", 20, 20);
    doc.setFontSize(12);
    doc.text("Personal Details", 20, 30);
    doc.text(`Age: ${age}`, 20, 40);
    doc.text(`Sugar Level: ${sugarLevel} mg/dL`, 20, 50);
    doc.text(`Blood Pressure: ${bloodPressureSystolic}/${bloodPressureDiastolic} mmHg`, 20, 60);

    doc.text("Diet Plan", 20, 80);
    doc.text(dietPlan, 20, 90);

    doc.text("Exercise Plan", 20, 130);
    doc.text(exercisePlan, 20, 140);

    doc.save('Personalized_Health_Plan.pdf');
}
