import { Descriptions } from "antd";
import { RegisterContext } from "pages/register/utils/RegisterContext";
import { labels, stepsTitles } from "pages/register/utils/consts";
import { useContext } from "react";
import useCustomFetch from "services/useFetch";

const FormsSummery = () => {
  const { stepsContent } = useContext(RegisterContext);
  const provinceId = stepsContent.get(2).province ?? null;

  const { data: provincesData } = useCustomFetch({
    url: "/provinces",
    method: "GET",
  });

  const { data: citiesData } = useCustomFetch({
    url: provinceId ? `/cities/${provinceId}` : null,
    method: "GET",
  });

  function collectItemsFromCtx(index) {
    const stepContent = stepsContent.get(index);

    let items = [];
    if (index === 1) {
      const zeroStep = stepsContent.get(0);
      items.push({
        key: Object.keys(zeroStep)[0],
        label: labels[Object.keys(zeroStep)[0]],
        children: Object.values(zeroStep)[0] === "legal" ? "حقوقی" : "حقیقی",
      });
    }
    if (index === 2) {
      const locationData = stepsContent.get(2);
      items = [
        {
          key: "province",
          label: labels["province"],
          children: provincesData.results.find(
            (province) => province.id === locationData.province
          )?.name,
        },
        {
          key: "city",
          label: labels["city"],
          children: citiesData.results.find(
            (city) => city.id === locationData.city
          )?.name,
        },
      ];
    } else
      for (const [key, value] of Object.entries(stepContent)) {
        items.push({
          key,
          label: labels[key],
          children: value,
        });
      }
    return items;
  }
  const stepsTitleExceptLast = stepsTitles.slice(0, -1);
  return (
    <>
      {stepsTitleExceptLast.map((step, index) => (
        <Descriptions
          key={index}
          title={step.title}
          items={collectItemsFromCtx(index + 1)}
          colon
          size="small"
          column={1}
          layout="horizontal"
          bordered
          style={{
            maxWidth: 600,
            paddingInline: "1rem",
            marginInline: "auto",
            marginBlock: "1rem",
          }}
        />
      ))}
    </>
  );
};

export default FormsSummery;
