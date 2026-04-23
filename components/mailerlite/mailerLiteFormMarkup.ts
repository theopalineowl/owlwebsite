/** MailerLite embed — HTML only (no scripts). */
export const ML_FORM_MARKUP = `
<div id="mlb2-40131402" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-40131402">
  <div class="ml-form-align-center">
    <div class="ml-form-embedWrapper embedForm">
      <div class="ml-form-embedBody ml-form-embedBodyDefault row-form">
        <form
          class="ml-block-form"
          action="https://assets.mailerlite.com/jsonp/2278902/forms/185211668340410185/subscribe"
          data-code=""
          method="post"
          target="_blank"
        >
          <div class="ml-form-formContent">
            <div class="ml-form-name-pair">
              <div class="ml-form-fieldRow">
                <div class="ml-field-group ml-field-name">
                  <input
                    aria-label="name"
                    type="text"
                    class="form-control"
                    data-inputmask=""
                    name="fields[name]"
                    placeholder="First name"
                    autocomplete="given-name"
                  />
                </div>
              </div>
              <div class="ml-form-fieldRow">
                <div class="ml-field-group ml-field-last_name">
                  <input
                    aria-label="last_name"
                    type="text"
                    class="form-control"
                    data-inputmask=""
                    name="fields[last_name]"
                    placeholder="Last name"
                    autocomplete="family-name"
                  />
                </div>
              </div>
            </div>
            <div class="ml-form-fieldRow ml-form-fieldRow-email ml-last-item">
              <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                <input
                  aria-label="email"
                  aria-required="true"
                  type="email"
                  class="form-control"
                  data-inputmask=""
                  name="fields[email]"
                  placeholder="Email"
                  autocomplete="email"
                />
              </div>
            </div>
          </div>
          <input type="hidden" name="ml-submit" value="1" />
          <div class="ml-form-embedSubmit">
            <button type="submit" class="primary">Join the Journey</button>
            <button disabled="disabled" style="display: none" type="button" class="loading">
              <div class="ml-form-embedSubmitLoad"></div>
              <span class="sr-only">Loading...</span>
            </button>
          </div>
          <input type="hidden" name="anticsrf" value="true" />
        </form>
      </div>
      <div class="ml-form-successBody row-success" style="display: none">
        <div class="ml-form-successContent">
          <h4>Thank you!</h4>
          <p>You have successfully joined our subscriber list.</p>
        </div>
      </div>
    </div>
  </div>
</div>
`.trim();
