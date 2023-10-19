import { useEffect, useMemo, useRef, useState } from "react";
import "./index.scss";
import { getValue, setValue } from "./lodash";
import CloseSvgComponent from "./assets/close";
// import { getLookupAPIs } from "./lookup-apis";
// import { QueryRequestHelper } from "common/query-request-helper";
// https://lottiefiles.com/90550-dot-loader-animation
// https://lottiefiles.com/39555-dot-trio-fast

const CustomSearchableDropdown = (props) => {
  const { label, id, value, searchLoading, removeClose, onChange, values } =
    props;

  const inputRef = useRef(null);
  const ref = useRef();

  /* -------------------------------------------------------------------------- */
  /*                               UseState Section                             */
  /* -------------------------------------------------------------------------- */
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [inputChange, setInputChange] = useState(false);
  const colorCodes = [
    "#82E0AA",
    "#fea7a7",
    "#fdd399",
    "#fff1a3",
    "#a8e8ad",
    "#b1dbfd",
    "#d4c9fd",
    "#beeae8",
    "#e9bfed",
    "#bbd2ef",
    "#d0d9e2",
  ];
  const [data, setData] = useState([
    {
      colorCode: "#82E0AA",
      name: "color1",
      label: "color1",
      id: 1,
    },
    {
      colorCode: "#fea7a7",
      name: "color2",
      label: "color2",
      id: 2,
    },

    {
      colorCode: "#fdd399",
      name: "color3",
      label: "color3",
      id: 3,
    },
    {
      colorCode: "#fff1a3",
      name: "color4",
      label: "color4",
      id: 4,
    },
    {
      colorCode: "#b1dbfd",
      name: "color5",
      label: "color5",
      id: 5,
    },
    {
      colorCode: "#d4c9fd",
      name: "color6",
      label: "color6",
      id: 6,
    },
    {
      colorCode: "#beeae8",
      name: "color7",
      label: "color7",
      id: 7,
    },
    {
      colorCode: "#e9bfed",
      name: "color8",
      label: "color8",
      id: 8,
    },
  ]);
  /* -------------------------------------------------------------------------- */
  /*                               UseEffect Section                            */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    fetchDefaultData();
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setQuery("");
  }, [props.resetInput]);

  useEffect(() => {
    if (query) {
      setInputChange(true);
    }
  }, [query]);

  /* -------------------------------------------------------------------------- */
  /*                                     API Section                            */
  /* -------------------------------------------------------------------------- */

  const handleFetchData = async (search_text) => {
    // if (search_text)
    //   try {
    //     let payload = {
    //       search: search_text,
    //       page_no: 1,
    //       page_size: 10,
    //     };
    //     let queryRequest = QueryRequestHelper(payload);
    //     let resp = await getLookupAPIs(
    //       getValue(props, `lookup_api`, ""),
    //       queryRequest
    //     );
    //     if (resp) {
    //       let items =
    //         getValue(resp, `data.length`, 0) > 0
    //           ? getValue(resp, `data`, []).map((item) => ({
    //               id: getValue(item, `id`, ""),
    //               name:
    //                 getValue(item, `user.first_name`, "") +
    //                 " " +
    //                 getValue(item, `user.last_name`, ""),
    //               value:
    //                 getValue(item, `user.first_name`, "") +
    //                 " " +
    //                 getValue(item, `user.last_name`, ""),
    //               label:
    //                 getValue(item, `user.first_name`, "") +
    //                 " " +
    //                 getValue(item, `user.last_name`, ""),
    //               [label]:
    //                 getValue(item, `user.first_name`, "") +
    //                 " " +
    //                 getValue(item, `user.last_name`, ""),
    //             }))
    //           : [];
    //       setData(items);
    //     }
    //   } catch (error) {}
    // else onChange(null);
  };
  const fetchDefaultData = async () => {
    // try {
    //   let payload = {
    //     page_no: 1,
    //     page_size: 10,
    //   };
    //   let queryRequest = QueryRequestHelper(payload);
    //   let resp = await getLookupAPIs(
    //     getValue(props, `lookup_api`, ""),
    //     queryRequest
    //   );
    //   if (resp) {
    //     let items =
    //       getValue(resp, `data.length`, 0) > 0
    //         ? getValue(resp, `data`, []).map((item) => ({
    //             id: getValue(item, `id`, ""),
    //             name:
    //               getValue(item, `user.first_name`, "") +
    //               " " +
    //               getValue(item, `user.last_name`, ""),
    //             value:
    //               getValue(item, `user.first_name`, "") +
    //               " " +
    //               getValue(item, `user.last_name`, ""),
    //             label:
    //               getValue(item, `user.first_name`, "") +
    //               " " +
    //               getValue(item, `user.last_name`, ""),
    //             [label]:
    //               getValue(item, `user.first_name`, "") +
    //               " " +
    //               getValue(item, `user.last_name`, ""),
    //           }))
    //         : [];
    //     setData(items);
    //   }
    // } catch (error) {}
  };

  const handleClickOption = (option) => {
    onChange && onChange(option);
    setInputChange(false);
    setQuery("");
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onChange(null);
  };

  /* -------------------------------------------------------------------------- */
  /*                               Onchange section                             */
  /* -------------------------------------------------------------------------- */
  const toggleBox = (e) => {
    setIsOpen(!isOpen);
  };
  const toggle = (e) => {
    setIsOpen(e && e.target === inputRef.current);
  };
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      //   console.log("clicked outside");
      setIsOpen(false);
    } else {
      //   console.log("click inside");
    }
  };
  const filter = (options) => {
    let filtered =
      getValue(options, `length`, 0) > 0
        ? options.filter((item) => !values.includes(getValue(item, `name`, "")))
        : [];
    return getValue(filtered, `length`, 0) > 0
      ? filtered.filter(
          (option) =>
            getValue(option, `[${label}]`, "") &&
            option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      : [];
  };
  const findSelectedPipeline = (id) => {
    let list =
      getValue(data, `length`, 0) > 0
        ? data.filter((item) => getValue(item, `id`, "") === id)
        : [];
    return getValue(list, `length`, 0) > 0
      ? getValue(list, `[${0}].label`, "")
      : "";
  };
  const valueLabel = useMemo(
    () => findSelectedPipeline(value),
    [value, getValue(data, `length`, 0) > 0]
  );

  const valuesSet = new Set(values);
  const selectedData = useMemo(() => {
    return data.filter((item) => valuesSet.has(getValue(item, "name", "")));
  }, [data, valuesSet, values]);

  useEffect(() => {
    if (query) {
      setIsOpen(true);
    }
  }, [query]);
  return (
    <>
      <div className={"tag-dropdownselect-form"} ref={ref}>
        <div
          className={`tag-multidropdown-box position-relative ${
            isOpen ? "active" : ""
          }`}
          onClick={toggleBox}
          style={{ width: props.width }} /* add custom width here */
        >
          <div className="tag-search_container">
            {selectedData.map((item, index) => {
              if (item)
                return (
                  <div
                    className="d-flex align-items-center px-1 tag_container"
                    key={index}
                    style={{ background: getValue(item, `colorCode`, "") }}
                  >
                    <p className="tag-text">{getValue(item, `label`, "")}</p>
                    <div
                      onClick={() => handleClickOption(item)}
                      className="tag-item-close"
                    >
                      <CloseSvgComponent size={20} />
                    </div>
                  </div>
                );
            })}
            <input
              className="tag-search_input"
              ref={inputRef}
              type="text"
              value={
                inputChange
                  ? query
                    ? query
                    : valueLabel
                  : valueLabel
                  ? valueLabel
                  : query
              }
              name="searchTerm"
              autoComplete="off"
              placeholder={getValue(
                props,
                `placeholder`,
                "Please Add/Search here..."
              )}
              onChange={(e) => {
                !e.target.value && onChange(null);
                setQuery(e.target.value);
                handleFetchData(e.target.value);
              }}
              onClick={toggleBox}
            />
          </div>
          <div className="right_container">
            {valueLabel && (
              <div className="close_image_container">
                <img
                  src={"/dropdown/close.svg"}
                  className="close_image"
                  onClick={(e) => handleClose(e)}
                />
              </div>
            )}
          </div>
        </div>

        <div
          className={`tag-options ${isOpen ? "open" : ""}`}
          style={{ width: props.width }} /* add custom width here */
        >
          <div>
            <div className="tag-option_container">
              {isLoading ? (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    marginBottom: "5px",
                  }}
                >
                  <img src={`/dropdown/loader1.gif`} className="loader" />
                </div>
              ) : filter(data).length > 0 ? (
                filter(data).map((option, index) => {
                  return (
                    <div
                      onClick={() => {
                        handleClickOption(option);
                        // toggle();
                      }}
                      className={`option ${
                        option.id === value ? "selected" : ""
                      }`}
                      key={`${id}-${index}`}
                    >
                      <div
                        className="selected_text px-3 p-1"
                        style={{
                          background: getValue(option, `colorCode`, ""),
                        }}
                      >
                        {option[label]}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <p>Hint: Select one of the colors below to add a tag.</p>
                  {query ? (
                    <div className="mutlidropdown-tag-circle-container">
                      {colorCodes.map((item) => {
                        return (
                          <div
                            className="mutlidropdown-tag-circle"
                            style={{ background: item }}
                          ></div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="nodata">No Tags Found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomSearchableDropdown;
