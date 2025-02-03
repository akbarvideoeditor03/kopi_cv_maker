import React, { useRef } from "react";
import { jsPDF } from "jspdf";

const HTMLToPDF = () => {
    const contentRef = useRef();

    const generatePDF = () => {
        const doc = new jsPDF("p", "mm", "a4");
        const element = contentRef.current;

        doc.html(element, {
            callback: (pdf) => {
                pdf.save("document.pdf");
            },
            x: 10,
            y: 10,
            width: 180,
            windowWidth: 800,
        });
    };

    return (
        <div className="container col-f card-mini" style={{ height:"210mm" }}>
            <div ref={contentRef} style={{ padding: "1rem" }}>
                <div className="container col-f">
                    <p>
                        <strong>Lorem ipsum</strong> dolor <i>sit amet</i> consectetur <u>adipisicing elit</u>. Repellat quae minus totam eum recusandae corporis pariatur expedita aspernatur animi voluptas possimus facere illum quis dolorem quaerat atque adipisci, cupiditate ad.
                        <ul>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                        </ul>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique laboriosam tenetur necessitatibus quod impedit eaque quisquam est? Quo consequatur facilis, laboriosam eius natus quasi quibusdam non excepturi corporis aspernatur consectetur?
                        <ol type="1">
                            <li>Lorem</li>
                            <li>Lorem</li>
                            <li>Lorem</li>
                            <li>Lorem</li>
                            <li>Lorem</li>
                        </ol>
                    </p>
                </div>
            </div>
            <button onClick={generatePDF}>Download PDF</button>
        </div>
    );
};

export default HTMLToPDF;
