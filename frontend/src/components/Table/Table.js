import React from 'react'
import Button from 'Components/Button';
import THead from './THead';
import TBody from './TBody';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: props.fields,
      records: props.records,
      selectedRecords: new Set(),
    };
    console.log(window.addEventListener('scroll', () => console.log(window.document.body.getBoundingClientRect())))

  }
  toggleRecord = (id) => {
    let selectedRecords = new Set(this.state.selectedRecords);

    selectedRecords.delete(id) ? null : selectedRecords.add(id);

    this.setState({ selectedRecords });
  }
  getDinamicColsCount(fields) {
    return fields.filter(f => (
      f.maxWidth === 'auto'
    )).length;
  }
  getWidthOfStaticCols(fields) {
    let width = 0;

    fields.forEach(f => {
      if (f.maxWidth !== 'auto') {
        width += Number(f.maxWidth.substr(0, f.maxWidth.length - 2));
      }
    })

    return width;
  }
  render() {
    let { 
      fields,
      records,
      selectedRecords,
    } = this.state;
    let props = this.props;
    let dinamicColsCount = this.getDinamicColsCount(fields);
    let widthOfStaticCols = this.getWidthOfStaticCols(fields);

    return (
      <section className='ldc-table' >
        {
          props.multipleSelectionButton ? (
            <Button label={props.multipleSelectionButton}
                    disabled={!selectedRecords.size}
                    onClick={() => props.multipleSelectionAction(Array.from(selectedRecords))}
                    />
          ) : null
        }
        <THead fields={fields}
               colCount={dinamicColsCount}
               staticColsWidth={widthOfStaticCols}
               />
        <TBody fields={fields}
               records={records}
               colCount={dinamicColsCount}
               staticColsWidth={widthOfStaticCols}
               toggleRecord={this.toggleRecord}
               selectedRecords={selectedRecords}
               recordMainButton={props.recordMainButton}
               recordMainAction={props.recordMainAction}
               />
        <div className='t-footer'></div>
      </section>

    );
  }
}

export default Table;