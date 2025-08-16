import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";

export default function RecipePDFPreview() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Giả sử bạn có API lấy recipe theo ID
    fetch(`/api/recipes/${id}`)
      .then(res => res.json())
      .then(data => setRecipe(data));
  }, [id]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(recipe.title, 10, 15);

    doc.setFontSize(12);
    doc.text(recipe.description, 10, 25);

    autoTable(doc, {
      startY: 35,
      head: [["Nguyên liệu", "Số lượng"]],
      body: recipe.ingredients.map(i => [i.name, `${i.quantity} ${i.unitName}`]),
    });

    let yPos = doc.lastAutoTable.finalY + 10;
    recipe.instructions.forEach((step, index) => {
      doc.text(`${index + 1}. ${step.description}`, 10, yPos);
      yPos += 8;
    });

    doc.save(`${recipe.title}.pdf`);
  };

  if (!recipe) return <p>Đang tải...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <h2>Nguyên liệu</h2>
      <ul>
        {recipe.ingredients.map((i, idx) => (
          <li key={idx}>{i.name} - {i.quantity} {i.unitName}</li>
        ))}
      </ul>

      <h2>Các bước nấu</h2>
      <ol>
        {recipe.instructions.map((step, idx) => (
          <li key={idx}>{step.description}</li>
        ))}
      </ol>

      <button onClick={handleDownloadPDF}>
        Tải PDF
      </button>
    </div>
  );
}
