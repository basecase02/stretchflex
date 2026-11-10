import "@/styles/utility.css";
import { hand } from "@/components/text";

type Row = [service: string, newMembers: string, existing: string];

/** The Goodlife page's "Your Discount at a Glance" table. */
export function RatesTable({ kicker, title, handWord, head, rows }: { kicker: string; title: string; handWord?: string; head: Row; rows: Row[] }) {
  return (
    <section className="blk blk--rose panel">
      <div className="wrap">
        <header className="blk__head blk__head--center">
          <p className="kicker">{kicker}</p>
          <h2 className="display blk__title">{hand(title, handWord)}</h2>
        </header>
        <div className="rates">
          <table>
            <thead>
              <tr>
                {head.map((cell) => (
                  <th scope="col" key={cell}>
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([service, a, b]) => (
                <tr key={service}>
                  <th scope="row">{service}</th>
                  <td>{a}</td>
                  <td>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
