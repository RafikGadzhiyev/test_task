import { FC } from "react";
import { NEXT_KEY } from "@/consts/data";
import { motion, AnimatePresence } from "framer-motion";

interface IListProps {
  isIncluded: boolean;
  values: string[];
  listKey: string;
  fields: string[];
  constructedData: { [key: string]: { [key: string]: any } };
}

export const List: FC<IListProps> = ({
  isIncluded,
  listKey,
  values,
  fields,
  constructedData,
}) => {
  return (
    <ul
      style={{
        marginLeft: isIncluded ? "30px" : 0,
      }}
    >
      {values.map((v) => {
        return (
          <li key={v}>
            <AnimatePresence>
              {isIncluded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  layout
                  className="rounded-md bg-gray-700 px-3 py-1 my-1.5 block w-fit"
                >
                  {v}
                </motion.span>
              )}
            </AnimatePresence>
            {listKey !== "citizen" && (
              <List
                isIncluded={fields.includes(NEXT_KEY[listKey])}
                listKey={NEXT_KEY[listKey]}
                values={Array.from(
                  constructedData[NEXT_KEY[listKey]][
                    listKey === "city" ? v + " г." : v
                  ]
                )}
                constructedData={constructedData}
                fields={fields}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
