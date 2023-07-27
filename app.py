from flask import Flask, jsonify, request, render_template
from ethical_concerns import get_company_overviews, analyze_ethical_concerns

app = Flask(__name__, static_url_path='/static', static_folder='static')

# app.jinja_env.block_start_string = '[['
# app.jinja_env.block_end_string = ']]'
# app.jinja_env.variable_start_string = '[['
# app.jinja_env.variable_end_string = ']]'
# app.jinja_env.comment_start_string = '[{#'
# app.jinja_env.comment_end_string = '#}]'

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/multi")
def multi():
    return render_template('multiselect.html')

@app.route('/test')
def test():
    return render_template('testVue.html')


@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    ethical_concerns = data.get("ethical_concerns", [])
    companies = data.get("companies", [])

    # Get company overviews from Alpha Vantage API
    company_overviews = get_company_overviews(companies)

    # Perform analysis with OpenAI API
    analysis_results = analyze_ethical_concerns(ethical_concerns, company_overviews)

    # test comment
    return jsonify(analysis_results)


if __name__ == "__main__":
    app.run(debug=True)
