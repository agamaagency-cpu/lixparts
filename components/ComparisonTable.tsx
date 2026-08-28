import { CheckIcon } from "./Icons";

const rows = [
  {
    param: "Оригинальное качество",
    used: "Да, оригинал OEM",
    neu: "Да, оригинал OEM",
    dup: "Аналог, качество варьируется",
  },
  {
    param: "Заводская геометрия",
    used: "Сохранена",
    neu: "Сохранена",
    dup: "Возможны отклонения",
  },
  {
    param: "Совпадение креплений",
    used: "Штатное",
    neu: "Штатное",
    dup: "Иногда требуется подгонка",
  },
  {
    param: "Возможность попасть в цвет",
    used: "Часто заводской окрас",
    neu: "Под покраску",
    dup: "Под покраску",
  },
  {
    param: "Стоимость",
    used: "Выгодная",
    neu: "Высокая",
    dup: "Низкая",
  },
];

export default function ComparisonTable() {
  const cols = [
    { key: "used", title: "Оригинальная б/у", highlight: true },
    { key: "neu", title: "Новая оригинальная", highlight: false },
    { key: "dup", title: "Дубликат / аналог", highlight: false },
  ] as const;

  return (
    <div className="overflow-hidden rounded-2xl border border-graphite-200">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-graphite-200 bg-graphite-50">
              <th className="p-4 font-medium text-graphite-500">Параметр</th>
              {cols.map((c) => (
                <th
                  key={c.key}
                  className={`p-4 font-semibold ${
                    c.highlight ? "bg-graphite-900 text-white" : "text-graphite-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {c.highlight && <CheckIcon width={16} height={16} />}
                    {c.title}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite-200">
            {rows.map((r) => (
              <tr key={r.param}>
                <td className="p-4 font-medium text-graphite-700">{r.param}</td>
                <td className="bg-graphite-50/60 p-4 font-medium text-graphite-900">
                  {r.used}
                </td>
                <td className="p-4 text-graphite-500">{r.neu}</td>
                <td className="p-4 text-graphite-500">{r.dup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-graphite-200 bg-graphite-50 p-4 text-xs text-graphite-400">
        Сравнение приведено для ориентира. Итоговое состояние конкретной детали
        всегда подтверждается реальными фотографиями.
      </p>
    </div>
  );
}
