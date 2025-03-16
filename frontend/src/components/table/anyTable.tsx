import { useNavigate } from "react-router-dom";
import Button from "../button/Button.tsx";


interface TableProps {
  thead: string[];
  headerData?: string[];
  tbodys?: Array<any>;
  titleHeader?: string;
  add?: boolean;
  linkAdd?: string;
  view?: boolean;
  linkView?: string;
  tog?: boolean;
  edit?: boolean;
  linkEdit?: string;
  del?: boolean;
  handleDelete?: () => void;
}

export default function AnyTable({
  thead,
  titleHeader,
  add = false,
  linkAdd,
  headerData,
  tbodys,
  view = false,
  linkView,
  edit = false,
  linkEdit,
  del = false,
  handleDelete,
}: TableProps) {
  const renderActions = (row: any) => (
    <td className="p-2 w-[400px] flex items-center gap-2 justify-center">
      {view && (
        <Button
          className="btn-sm px-2 py-2"
          text={"View"}
          //  icon={}
          onClick={() => linkView && navigate(linkView + "/" + row?._id)}
        />
      )}
      {edit && (
        <Button
          text={"Edit"}
          className=""
          //  icon={}
          onClick={() => linkEdit && navigate(linkEdit + "/" + row?._id)}
        />
      )}
      {del && (
        <Button
          text={"Delete"}
          className=""
          //  icon={}
          onClick={() => handleDelete(row?._id)}
        />
      )}
    </td>
  );

  const navigate = useNavigate();

  return (
    <>
      <div
        className={`overflow-x-scroll hide-scrollbar`}
      >
        {(titleHeader || add) && (
          <div className="flex justify-between items-center">
            <div className="pt-3 pl-4 mb-3">
              <h1 className="font-bold text-[25px]">{titleHeader}</h1>
            </div>
            {
              add && (
                <Button text={`Add ${titleHeader}`} width="w-32" onClick={() => linkAdd && navigate(linkAdd)} />
              )
            }
          </div>
        )}
        <hr className="border-amber-400 mb-5" />
        <div className={`relative`}>
          <table className="w-full border-collapse border-2 border-amber-400">
            <thead>
              <tr className="border-2 border-amber-400">
                {thead?.map((header, index) => (
                  <th key={index} className={`p-3`}>
                    <span className="">{`${header}`}</span>
                  </th>
                ))}
                <th className={`w-[250px] text-center p-3`}>{"Actions"}</th>
              </tr>
            </thead>
            <tbody>
              {tbodys?.map((row, rowIndex) => (
                <tr key={rowIndex} className={`border-2 border-amber-400`}>
                  {headerData?.map((header, index) => (
                    <td
                      key={index}
                      className="min-w-[120px] !text-center mx-2 justify-items-center "
                    >
                      {header === "image" || header === "avatar" ? (
                        <img
                          src={row?.[header][0].url}
                          alt="profile"
                          className="w-10 h-10 mx-auto rounded-full bg-cover bg-center"
                          loading="lazy"
                        />
                      ) : header === "section" ? (
                        <span className="block max-w-xs px-2 overflow-hidden text-ellipsis whitespace-nowrap">
                          {row?.[header]?.title || "No Title"}
                        </span>
                      ) : (
                        <span className="block max-w-xs px-2 overflow-hidden text-ellipsis whitespace-nowrap">
                          {row?.[header] || "N/A"}
                        </span>
                      )}
                    </td>
                  ))}

                  {renderActions(row)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
