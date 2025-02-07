import React, { useRef } from "react";
import { jsPDF } from "jspdf"

const HTMLToPDF = () => {
    const contentRef = useRef();

    const generatePDF = () => {
        const doc = new jsPDF("p", "mm", "a4");
        const element = contentRef.current;

        doc.html(element, {
            callback: (pdf) => {
                pdf.save("document.pdf");
            },
            width: 170,
            windowWidth: 800,
            margin:20,
            autoPaging:"text"
        });
    };

    return (
        <div className="container col-f card-mini">
            <div ref={contentRef} style={{ padding: "1rem", textAlign:"justify" }}>
                <p>
                        <b>Lorem ipsum</b> dolor <i>sit amet</i> consectetur <u>adipisicing elit</u>. Repellat quae minus totam eum recusandae corporis pariatur expedita aspernatur animi voluptas possimus facere illum quis dolorem quaerat atque adipisci, cupiditate ad.
                        <ul>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                            <li>Lorem Ipsum</li>
                        </ul>
                        <p>
                            "Lorem ipsum dolor sit amet, c<b style={{ marginTop:'-10px' }}>Lorem ipsum</b>onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, c<b style={{ marginTop:'-10px' }}>Lorem ipsum</b>onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum<b>Lorem ipsum</b> et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, c<b>Lorem ipsum</b>onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
                        </p>
                        <br/>
                    </p>
            </div>
            <button onClick={generatePDF}>Download PDF</button>
        </div>
    );
};

export default HTMLToPDF;
