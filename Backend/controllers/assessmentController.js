
import Assessment from "../models/assessement.js";

// Save student assessment attempt
export const saveAssessment = async (req, res) => {
  try {
    console.log("📩 Incoming assessment:", req.body);  // debug log
    console.log("👤 Authenticated user:", req.user);   // debug log

    const { type, name, description, duration, questions, answers } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Not authenticated. Student ID missing." });
    }

    // ✅ Calculate score
    let score = 0;
    let maxScore = 0;

    if (questions && answers) {
      questions.forEach((q, index) => {
        maxScore += Math.max(...q.options.map(opt => opt.value));
        if (answers.hasOwnProperty(index)) {
          score += answers[index];
        }
      });
    }

    // ✅ Severity logic (you can customize this later)
    let severity = "Mild";
    let riskLevel = "low";
    let recommendation = "Maintain healthy habits";

    if (score > maxScore * 0.3 && score <= maxScore * 0.6) {
      severity = "Moderate";
      riskLevel = "medium";
      recommendation = "Consider speaking with a counselor.";
    } else if (score > maxScore * 0.6) {
      severity = "Severe";
      riskLevel = "high";
      recommendation = "Seek professional help as soon as possible.";
    }

    const percentage = maxScore > 0 ? ((score / maxScore) * 100).toFixed(2) : 0;

    // ✅ Save to DB
    const newAssessment = await Assessment.create({
      student: req.user._id,  // comes from authMiddleware
      type,
      name,
      description,
      duration,
      questions,
      answers,
      score,
      maxScore,
      severity,
      recommendation,
      riskLevel,
      percentage
    });

    console.log("✅ Assessment saved:", newAssessment);

    res.status(201).json({ message: "Assessment saved", assessment: newAssessment });
  } catch (error) {
    console.error("❌ Error saving assessment:", error);
    res.status(500).json({ message: error.message });
  }
};

// Student fetches their assessments
export const getMyAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ student: req.user._id }).sort({ createdAt: -1 });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Counselor/Admin fetch student assessments
export const getStudentAssessments = async (req, res) => {
  try {
    const { studentId } = req.params;
    const assessments = await Assessment.find({ student: studentId })
      .populate("student", "name email")
      .sort({ createdAt: -1 });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
