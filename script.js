document.getElementById('submit').addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = document.getElementById('age').value;
    const sugarLevel = document.getElementById('sugarLevel').value;
    const bloodPressureSystolic = document.getElementById('bloodPressureSystolic').value;
    const bloodPressureDiastolic = document.getElementById('bloodPressureDiastolic').value;

    if (!name || !gender || !age || !sugarLevel || !bloodPressureSystolic || !bloodPressureDiastolic ||
        isNaN(age) || isNaN(sugarLevel) || isNaN(bloodPressureSystolic) || isNaN(bloodPressureDiastolic)) {
        alert('Please enter valid values.');
        return;
    }

    const dietPlan = getDietPlan(gender, age, sugarLevel, bloodPressureSystolic, bloodPressureDiastolic);
    const exercisePlan = getExercisePlan(age, sugarLevel, bloodPressureSystolic, bloodPressureDiastolic);

    generatePDF(name, gender, age, sugarLevel, bloodPressureSystolic, bloodPressureDiastolic, dietPlan, exercisePlan);
});

function getDietPlan(gender, age, sugarLevel, bloodPressureSystolic, bloodPressureDiastolic) {
    let diet = "Diet recommendations based on your inputs:\n\n";

    if (age < 18) {
        diet += "As a minor, it's important to consult with a healthcare provider for a tailored diet plan.\n\n";
    } else {
        if (sugarLevel < 70) {
            diet += "Your sugar level is low. Consider increasing your intake of complex carbohydrates and including small, frequent meals throughout the day.\n\n";
        } else if (sugarLevel > 140) {
            diet += "Your sugar level is high. Focus on a diet rich in fiber, whole grains, and lean proteins. Avoid sugary foods and drinks.\n\n";
        } else {
            diet += "Your sugar level is normal. Maintain a balanced diet with a variety of nutrients.\n\n";
        }

        if (bloodPressureSystolic > 120 || bloodPressureDiastolic > 80) {
            diet += "Your blood pressure is elevated. Reduce sodium intake, eat more potassium-rich foods (like bananas, spinach), and focus on whole foods.\n\n";
        } else if (bloodPressureSystolic < 90 || bloodPressureDiastolic < 60) {
            diet += "Your blood pressure is low. Consider increasing salt intake moderately and ensure adequate hydration.\n\n";
        } else {
            diet += "Your blood pressure is normal. Maintain a balanced diet and monitor your health regularly.\n\n";
        }

        // Gender-specific dietary recommendations
        if (gender === "Male") {
            diet += "For males, consider including more lean proteins and healthy fats in your diet. Regularly consume fruits and vegetables to ensure a wide range of nutrients.\n\n";
        } else if (gender === "Female") {
            diet += "For females, ensure adequate calcium and iron intake. Include a variety of fruits, vegetables, and lean proteins in your diet.\n\n";
        }
    }
    return diet;
}

function getExercisePlan(age, sugarLevel, bloodPressureSystolic, bloodPressureDiastolic) {
    let exercise = "Exercise recommendations based on your inputs:\n\n";

    if (age < 18) {
        exercise += "As a minor, it's important to engage in regular physical activity suitable for your age. Consult with a healthcare provider for personalized advice.\n\n";
    } else {
        if (sugarLevel < 70) {
            exercise += "Your sugar level is low. Focus on moderate exercises like walking or yoga. Avoid intense workouts without proper nutrition.\n\n";
        } else if (sugarLevel > 140) {
            exercise += "Your sugar level is high. Engage in regular physical activity such as brisk walking, cycling, or swimming to help regulate your sugar levels.\n\n";
        } else {
            exercise += "Your sugar level is normal. Maintain a regular exercise routine including both cardio and strength training.\n\n";
        }

        if (bloodPressureSystolic > 120 || bloodPressureDiastolic > 80) {
            exercise += "Your blood pressure is elevated. Focus on cardiovascular exercises like walking, jogging, or swimming. Avoid heavy weight lifting.\n\n";
        } else if (bloodPressureSystolic < 90 || bloodPressureDiastolic < 60) {
            exercise += "Your blood pressure is low. Moderate exercises like walking or light cycling are recommended. Avoid sudden changes in posture.\n\n";
        } else {
            exercise += "Your blood pressure is normal. Engage in a balanced exercise routine including cardio, strength training, and flexibility exercises.\n\n";
        }
    }
    return exercise;
}

function generatePDF(name, gender, age, sugarLevel, bloodPressureSystolic, bloodPressureDiastolic, dietPlan, exercisePlan) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const lineHeight = 10;
    let y = margin;

    doc.setFontSize(16);
    doc.text("Personalized Health Plan", pageWidth / 2, y, { align: 'center' });
    y += lineHeight + 10;

    doc.setFontSize(12);
    doc.text("Personal Details", margin, y);
    y += lineHeight;
    doc.text(`Name: ${name}`, margin, y);
    y += lineHeight;
    doc.text(`Gender: ${gender}`, margin, y);
    y += lineHeight;
    doc.text(`Age: ${age}`, margin, y);
    y += lineHeight;
    doc.text(`Sugar Level: ${sugarLevel} mg/dL`, margin, y);
    y += lineHeight;
    doc.text(`Blood Pressure: ${bloodPressureSystolic}/${bloodPressureDiastolic} mmHg`, margin, y);
    y += lineHeight + 10;

    doc.text("Diet Plan", margin, y);
    y += lineHeight;

    const splitDietPlan = doc.splitTextToSize(dietPlan, pageWidth - 2 * margin);
    splitDietPlan.forEach((line, index) => {
        if (y + lineHeight > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
        doc.text(line, margin, y);
        y += lineHeight;
    });

    y += 10;
    doc.text("Exercise Plan", margin, y);
    y += lineHeight;

    const splitExercisePlan = doc.splitTextToSize(exercisePlan, pageWidth - 2 * margin);
    splitExercisePlan.forEach((line, index) => {
        if (y + lineHeight > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
        doc.text(line, margin, y);
        y += lineHeight;
    });

    doc.save('Personalized_Health_Plan.pdf');
}
