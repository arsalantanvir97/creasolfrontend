import { useState } from "react";
import FormTable from "./FormTable";

const FormListingAdmin = ({ Orders }) => {
  const [filter, setFilter] = useState("Not Submitted");
  return (
    <section id="configuration" className="dashboard">
      <div className="row">
        <div className="col-12">
          <div className="content-body">
            <div className="page-title mb-0">
              <div className="row mb-5">
                <div className="col-12">
                  <h2 className="mb-0">Form Status</h2>
                </div>
              </div>
            </div>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    filter === "Not Submitted" ? "active" : ""
                  }`}
                  onClick={(e) => setFilter("Not Submitted")}
                >
                  Show Incomplete Forms
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    filter === "Submitted" ? "active" : ""
                  }`}
                  onClick={(e) => setFilter("Submitted")}
                >
                  Show Complete Forms
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${filter === "" ? "active" : ""}`}
                  onClick={(e) => setFilter("")}
                >
                  Show All
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active">
                <div className="card shadow-none bg-transparent p-0 d-block card-chart border-none align-items-center">
                  <div className="card-body p-0">
                    <div className="chartbox position-relative text-center">
                      <div className="main-tabble table-responsive">
                        <FormTable
                          Orders={Orders}
                          Filter={filter}
                          isAdmin={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormListingAdmin;
