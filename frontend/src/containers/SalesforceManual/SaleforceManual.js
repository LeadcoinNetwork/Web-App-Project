import React from 'react'
import t from '../../utils/translate/translate'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Button from "Components/Button"

class SalesforceManual extends React.Component {
  render() {
    return (
      <>
        <div className="nav-container">
          <div className="back-wrapper">
            <div
              className="back"
              onClick={() => {
                this.props.push('/sell-leads')
              }}
            >
              <div className="back-arrow" />
              <div className="back-text">Back</div>
            </div>
          </div>
          <div className="next-wrapper">
            <div
              className="next"
              onClick={() => {
                this.props.push('/csv-upload')
              }}
            >
              <div className="next-text">Next</div>
              <div className="next-arrow" />
            </div>
          </div>
        </div>
        <div style={{ float: 'left' }}>
          <h1>{t('Salesforce Manual')}</h1>
        </div>

        <br style={{ clear: 'both' }} />
        <h3>
          {t(
            'This is step by step guide how you can export your leads from salesforce in to CSV file.',
          )}
        </h3>
        <p>
          Original docs you can find{' '}
          <a
            href="https://help.salesforce.com/articleView?id=exporting_data.htm&type=5"
            target="_blank"
          >
            here
          </a>
          .
        </p>

        <div className="manual-container">
          <h2>Export Data</h2>
          <h4>
            You can use the Data Loader export wizard to extract data from a
            Salesforce object.
          </h4>
          <div>
            <ol>
              <li>
                Open the{' '}
                <a
                  href="https://help.salesforce.com/articleView?id=installing_the_data_loader.htm&type=5"
                  target="_blank"
                >
                  Data Loader
                </a>
                .
              </li>
              <li>
                Click Export. If you want to also export archived activity
                records and soft-deleted records, click Export All instead.
              </li>
              <li>
                Enter your Salesforce username and password, and click Log in.
              </li>
              <li>
                When you’re logged in, click Next. (You are not asked to log in
                again until you log out or close the program.) If your
                organization restricts IP addresses, logins from untrusted IPs
                are blocked until they’re activated. Salesforce automatically
                sends you an activation email that you can use to log in. The
                email contains a security token that you must add to the end of
                your password. For example, if your password is mypassword, and
                your security token is XXXXXXXXXX, you must enter
                mypasswordXXXXXXXXXX to log in.
              </li>
              <li>
                Choose an object. For example, select the Account object. If
                your object name isn’t listed, select Show all objects to see
                all the objects that you can access. The objects are listed by
                localized label name, with the developer name in parentheses.
                For object descriptions, see the{' '}
                <a
                  href="https://developer.salesforce.com/docs/atlas.en-us.218.0.api.meta/api/sforce_api_quickstart_intro.htm"
                  target="_blank"
                >
                  SOAP API Developer Guide
                </a>
                .
              </li>
              <li>
                Select the CSV file to export the data to. You can choose an
                existing file or create a file. If you select an existing file,
                the export replaces its contents. To confirm the action, click
                Yes, or choose another file by clicking No.
              </li>
              <li>Click Next.</li>
              <li>
                Create a SOQL query for the data export. For example, select Id
                and Name in the query fields, and click Finish. As you follow
                the next steps, the CSV viewer displays all the Account names
                and their IDs. SOQL is the Salesforce Object Query Language.
                Similar to the SELECT command in SQL, with SOQL, you can specify
                the source object, a list of fields to retrieve, and conditions
                for selecting rows in the source object. Choose the fields you
                want to export. Optionally, select conditions to filter your
                dataset. If you do not select any conditions, all the data to
                which you have read access is returned. Review the generated
                query and edit if necessary.For more information on SOQL, see
                the{' '}
                <a
                  href="https://developer.salesforce.com/docs/atlas.en-us.218.0.soql_sosl.meta/soql_sosl/"
                  target="_blank"
                >
                  SOQL and SOSL Reference
                </a>
                .
              </li>
              <li>
                Click Finish, then click Yes to confirm. A progress information
                window reports the status of the operation. After the operation
                completes, a confirmation window summarizes your results.
              </li>
              <li>
                To view the CSV file. click View Extraction, or to close, click
                OK. For more details, see{' '}
                <a
                  href="https://help.salesforce.com/articleView?id=reviewing_output_files.htm&type=5"
                  target="_blank"
                >
                  Review Data Loader Output Files
                </a>
                .
              </li>
            </ol>
            <Button
              className="next-button"
              onClick={() => {
                this.props.push('/csv-upload')
              }}
              appStyle={true}
            >
              {t("Next")}
            </Button>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({})

export default connect(
  mapStateToProps,
  {
    push,
  },
)(SalesforceManual)
