import "../App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import ReactImageMagnify from "react-magnify-image";

const LiveMonitoring = () => {
  const [data, setData] = useState([{}]);
  const [cctvid, setCctvid] = useState(1);
  const [cctvname, setCctvname] = useState("CCTV BMO2");
  const [cctvlocation, setCctvlocation] = useState("E Camera 3");
  const [cctvlink, setCctvlink] = useState("rtsp://admin:Buma@2020@10.1.73.20:554/LiveMedia/ch1/Media2");
  const [cctvip, setCctvip] = useState("10.1.73.20");
  const livecctv = "http://127.0.0.1:5000/video_feed/" + cctvid;

  useEffect(() => {
    axios
      .get("/cctv")
      .then((res) => {
        console.log("Getting from ::::", res.data.data);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // const livecctv = "http://127.0.0.1:5000/video_feed/" + cctvid;
  
  const arr = data.map((data, index) => {
    return (
      <div className="d-grid px-2 py-1">
        <button
          type="button"
          className={
            "shadow-all btn fw-semibold py-2 rounded-3 text-start" +
            (cctvid == data.id ? " btn-outline-success" : " btn-success")
          }
          key={data.id}
          onClick={() => {
            setCctvid(data.id);
            setCctvname(data.name);
            setCctvlocation(data.location);
            setCctvip(data.ip);
            setCctvlink(data.link);
          }}
        >
          <div className="">
            {data.name} - {data.location}
          </div>
        </button>
      </div>
    );
  });

  return (
    <div>
      <div className="navbar-component">
        <div className="nav-border">
          <div className="container">
            <nav className="navbar navbar-expand-md">
              <div className="container-fluid">
                <div className="navbar-brand">
                  <a className="page-current">
                    <img
                      className="logo"
                      src={require("../assets/logo.png")}
                      alt=""
                    />
                  </a>
                </div>
                <div
                  className="collapse navbar-collapse justify-content-end"
                  id="navbarNavDropdown"
                >
                  <ul className="navbar-nav gap-2">
                    <li className="nav-item">
                      <a className="nav-link fw-semibold page-current">
                        Live Monitoring
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="livemonitoring-body">
        <div>
          <div className="container pt-3 pb-1">
            <div className="row">
              <div className="col-3">
                <div className="shadow-all mb-3 bg-body rounded-top px-3 py-2">
                  <h6 className="fw-semibold">List CCTV</h6>
                  <p className="p-small">
                    Pilih CCTV untuk melihat live monitoring
                  </p>
                </div>
                <div className="shadow-all mb-3 bg-body rounded-bottom px-3 py-2 cctvlistbutton-component">
                  {arr}
                </div>
              </div>
              <div className="col">
                <div className="shadow-all mb-3 bg-body rounded-top px-3 py-2">
                  <h6 className="fw-semibold">Real Time Monitoring</h6>
                  <p className="p-small">
                    Monitoring deviasi yang terdeteksi secara real time melalui
                    CCTV Mining Eyes
                  </p>
                </div>
                <div className="shadow-all mb-3 bg-body rounded-bottom px-3 pt-2">
                  <div className="d-grid px-2 py-2">
                    <ReactImageMagnify
                      className="mw-100 image-border"
                      {...{
                        smallImage: {
                          alt: "",
                          isFluidWidth: true,
                          src: livecctv,
                        },
                        largeImage: {
                          src: livecctv,
                          width: 3000,
                          height: 1800,
                        },
                        enlargedImagePosition: "over",
                      }}
                    />
                    <div className="cam-navigation shadow-all d-flex justify-content-end align-items-center p-2">
                      <button class="navigation">
                        <Icon icon="charm:refresh" />
                      </button>
                      <button class="navigation">
                        <Icon icon="akar-icons:chevron-left" />
                      </button>
                      <button class="navigation">
                        <Icon icon="akar-icons:chevron-right" />
                      </button>
                      <button class="navigation">
                        <Icon icon="akar-icons:chevron-down" />
                      </button>
                      <button class="navigation">
                        <Icon icon="akar-icons:chevron-up" />
                      </button>
                      <button class="navigation">
                        <Icon icon="bx:zoom-out" />
                      </button>
                      <button class="navigation">
                        <Icon icon="bx:zoom-in" />
                      </button>
                      <button class="navigation">
                        <Icon icon="ic:outline-zoom-out-map" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="shadow-all mb-3 bg-body rounded-top px-3 py-2">
                  <h6 className="fw-semibold">Position</h6>
                  <p className="p-small">
                    CCTV Coordinate
                  </p>
                </div>
                <div className="shadow-all mb-3 bg-body rounded-bottom px-3 pt-2">
                  <div className="d-grid px-2 pt-2">
                    <h6 className="fw-semibold pb-2">
                      {cctvname} - {cctvlocation}
                    </h6>
                    <div className="d-flex pb-2">
                      <p className="fw-semibold pe-2 p-small">IP</p>
                      <p className="p-small">{cctvip}</p>
                    </div>
                    <p className="fw-semibold pe-2 pb-2">
                      Titik Koordinat
                    </p>
                    <div className="p-small">
                      <div className="d-flex pe-4">
                        <p className="fw-semibold pe-2">X</p>
                        <p>0.123456789</p>
                      </div>
                      <div className="d-flex pe-4">
                        <p className="fw-semibold pe-2">Y</p>
                        <p>0.123456789</p>
                      </div>
                      <div className="d-flex">
                        <p className="fw-semibold pe-2">Z</p>
                        <p>0.123456789</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMonitoring;
