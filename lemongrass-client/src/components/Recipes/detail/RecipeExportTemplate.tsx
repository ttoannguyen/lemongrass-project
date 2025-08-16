// import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";

// interface RecipeExportTemplateProps {
//   recipe: RecipeResponse;
//   includeImages: boolean;
//   fontSize: number;
//   primaryColor: string;
// }

// const A4_PX_WIDTH = 794; // approx A4 width at 96dpi

// const RecipeExportTemplate = ({
//   recipe,
//   includeImages,
//   fontSize,
//   primaryColor,
// }: RecipeExportTemplateProps) => {
//   return (
//     <div
//       style={{
//         fontFamily: "Arial, sans-serif",
//         padding: "20px",
//         width: `${A4_PX_WIDTH}px`,
//         maxWidth: "100%", // allow shrinking inside modal
//         backgroundColor: "#fff",
//         color: "#333",
//         boxSizing: "border-box",
//         borderRadius: 8,
//         boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
//       }}
//     >
//       <h1
//         style={{
//           fontSize: `${fontSize + 8}px`,
//           color: primaryColor,
//           textAlign: "center",
//           marginBottom: "18px",
//           lineHeight: 1.2,
//         }}
//       >
//         {recipe.title}
//       </h1>

//       <p
//         style={{
//           fontSize: `${fontSize}px`,
//           lineHeight: "1.6",
//           marginBottom: "16px",
//           textAlign: "justify",
//         }}
//       >
//         {recipe.description}
//       </p>

//       {includeImages && recipe.images[0]?.url && (
//         <img
//           crossOrigin="anonymous"
//           src={recipe.images[0].url}
//           alt={recipe.title}
//           style={{
//             width: "100%",
//             maxHeight: "300px",
//             objectFit: "cover",
//             borderRadius: "8px",
//             marginBottom: "16px",
//             display: "block",
//           }}
//         />
//       )}

//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", gap: 12 }}>
//         <p style={{ fontSize: `${fontSize}px`, margin: 0 }}>
//           <strong>Thời gian nấu:</strong> {recipe.cookingTime} phút
//         </p>
//         <p style={{ fontSize: `${fontSize}px`, margin: 0 }}>
//           <strong>Khẩu phần:</strong> {recipe.servings} người
//         </p>
//       </div>

//       <h2 style={{ fontSize: `${fontSize + 4}px`, color: primaryColor, marginBottom: "10px" }}>
//         Nguyên liệu
//       </h2>

//       <ul style={{ listStyleType: "disc", paddingLeft: "20px", marginBottom: "16px" }}>
//         {recipe.ingredients
//           .slice()
//           .sort((a, b) => a.order - b.order)
//           .map((ing) => (
//             <li key={ing.id} style={{ fontSize: `${fontSize}px`, marginBottom: "6px" }}>
//               {ing.name}: {ing.quantity} {ing.unitName} {ing.note && `(${ing.note})`}
//             </li>
//           ))}
//       </ul>

//       <h2 style={{ fontSize: `${fontSize + 4}px`, color: primaryColor, marginBottom: "10px" }}>
//         Hướng dẫn
//       </h2>

//       <div>
//         {recipe.instructions
//           .slice()
//           .sort((a, b) => a.stepNumber - b.stepNumber)
//           .map((step) => (
//             <div key={step.id} style={{ marginBottom: "14px" }}>
//               <p style={{ fontSize: `${fontSize}px`, fontWeight: 700, color: primaryColor, margin: 0 }}>
//                 Bước {step.stepNumber}:
//               </p>
//               <p style={{ fontSize: `${fontSize}px`, lineHeight: "1.6", marginTop: 6 }}>
//                 {step.description}
//               </p>

//               {includeImages && step.images.length > 0 && (
//                 <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
//                   {step.images
//                     .slice()
//                     .sort((a, b) => a.displayOrder - b.displayOrder)
//                     .map((img, index) => (
//                       <img
//                         key={index}
//                         crossOrigin="anonymous"
//                         src={img.url}
//                         alt={`Step ${step.stepNumber} image`}
//                         style={{
//                           width: "150px",
//                           height: "150px",
//                           objectFit: "cover",
//                           borderRadius: "8px",
//                           display: "block",
//                         }}
//                       />
//                     ))}
//                 </div>
//               )}
//             </div>
//           ))}
//       </div>

//       <p style={{ fontSize: `${Math.max(fontSize - 2, 10)}px`, textAlign: "center", marginTop: "18px", color: "#666" }}>
//         Được tạo bởi {recipe.accountShortResponse.firstName} {recipe.accountShortResponse.lastName} vào{" "}
//         {new Date(recipe.createdDate).toLocaleDateString("vi-VN")}
//       </p>
//     </div>
//   );
// };

// export default RecipeExportTemplate;

import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";

interface RecipeExportTemplateProps {
  recipe: RecipeResponse;
  includeImages: boolean;
  fontSize: number;
  primaryColor: string;
}

const A4_PX_WIDTH = 794; // A4 approx width in px at 96dpi

const RecipeExportTemplate = ({
  recipe,
  includeImages,
  fontSize,
  primaryColor,
}: RecipeExportTemplateProps) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        width: `${A4_PX_WIDTH}px`,
        maxWidth: "100%",
        backgroundColor: "#fff",
        color: "#333",
        display: "flex",
        gap: 20,
        boxSizing: "border-box",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* Sidebar bên trái */}
      <div
        style={{
          width: "35%", // khoảng 1/3 cho nguyên liệu + tiêu đề
          borderRight: `2px solid ${primaryColor}`,
          paddingRight: 16,
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontSize: `${fontSize + 8}px`,
            color: primaryColor,
            textAlign: "center",
            marginBottom: "18px",
            lineHeight: 1.2,
          }}
        >
          {recipe.title}
        </h1>
        <p
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: "1.6",
            marginBottom: "16px",
            textAlign: "justify",
          }}
        >
          {recipe.description}
        </p>

        <div style={{ marginBottom: "16px" }}>
          <p style={{ fontSize: `${fontSize}px`, margin: "6px 0" }}>
            <strong>Thời gian nấu:</strong> {recipe.cookingTime} phút
          </p>
          <p style={{ fontSize: `${fontSize}px`, margin: "6px 0" }}>
            <strong>Khẩu phần:</strong> {recipe.servings} người
          </p>
        </div>

        <h2 style={{ fontSize: `${fontSize + 4}px`, color: primaryColor, marginBottom: "10px" }}>
          Nguyên liệu
        </h2>

        <ul
          style={{
            listStyleType: "disc",
            paddingLeft: "20px",
            marginBottom: "16px",
            maxHeight: "60vh",
            overflowY: "auto",
          }}
        >
          {recipe.ingredients
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((ing) => (
              <li
                key={ing.id}
                style={{ fontSize: `${fontSize}px`, marginBottom: "6px" }}
                title={ing.note || ""}
              >
                {ing.name}: {ing.quantity} {ing.unitName} {ing.note && `(${ing.note})`}
              </li>
            ))}
        </ul>
      </div>

      {/* Phần hướng dẫn bên phải */}
      <div
        style={{
          width: "65%",
          paddingLeft: 16,
          boxSizing: "border-box",
          overflowY: "auto",
          maxHeight: "80vh",
        }}
      >
        <h2 style={{ fontSize: `${fontSize + 4}px`, color: primaryColor, marginBottom: "10px" }}>
          Hướng dẫn
        </h2>

        {recipe.instructions
          .slice()
          .sort((a, b) => a.stepNumber - b.stepNumber)
          .map((step) => (
            <div key={step.id} style={{ marginBottom: "14px" }}>
              <p
                style={{
                  fontSize: `${fontSize}px`,
                  fontWeight: 700,
                  color: primaryColor,
                  margin: 0,
                }}
              >
                Bước {step.stepNumber}:
              </p>
              <p style={{ fontSize: `${fontSize}px`, lineHeight: "1.6", marginTop: 6 }}>
                {step.description}
              </p>

              {includeImages && step.images.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {step.images
                    .slice()
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map((img, index) => (
                      <img
                        key={index}
                        crossOrigin="anonymous"
                        src={img.url}
                        alt={`Step ${step.stepNumber} image`}
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          display: "block",
                        }}
                      />
                    ))}
                </div>
              )}
            </div>
          ))}

        <p
          style={{
            fontSize: `${Math.max(fontSize - 2, 10)}px`,
            textAlign: "center",
            marginTop: "18px",
            color: "#666",
          }}
        >
          Được tạo bởi {recipe.accountShortResponse.firstName} {recipe.accountShortResponse.lastName} vào{" "}
          {new Date(recipe.createdDate).toLocaleDateString("vi-VN")}
        </p>
      </div>
    </div>
  );
};

export default RecipeExportTemplate;
