import os
import openai
from config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY


class OpenaiClient:
    def __init__(self):
        self.model = "gpt-3.5-turbo"
        self.role = "user"
        self.ethical_considerations = []
        self.overviews = {}
        self.completions = {}
        self.findings = None

    def add_ethical_considerations(self, considerations):
        self.ethical_considerations.extend(considerations)

    def add_overviews(self, overviews):
        self.overviews.update(overviews)

    def get_completion_for_symbol(self, symbol, description):
        if symbol in self.completions:
            return self.completions[symbol]
        content = """I am writing a blog about the following company {symbol}. I would like to know 
		whether there is anything in the company description,
		 {description} that raises any ethical concerns in the
		following categories {categories}. Please rate your concern
		for the company, for each category, on a scale from 1 to 5,
		with 1 being not at all concerned and 5 being gravely concerned.
        You must provide this rating, it is important. Please format your response as follows

        category: <category>
        rating: <rating>
        comments: <other comments>""".format(
            symbol=symbol,
            description=description,
            categories=self.ethical_considerations,
        )
        chat_completion = openai.ChatCompletion.create(
            model=self.model, messages=[{"role": self.role, "content": content}]
        )
        return chat_completion

    #todo(dyanni) do this async/await
    def fetch_completions(self):
        for symbol, overview in self.overviews.items():
            self.completions[symbol] = self.get_completion_for_symbol(symbol, overview)

    #todo(dyanni) ask gpt to simply return results as a json and simplify parsing
    def parse_completions(self):
        self.findings = {}
        for company, completion in self.completions.items():
            self.findings[company] = {}
            content = completion.choices[0].message.content
            current_category = ''
            for line in content.split('\n'):
                if line.startswith('category'):
                    current_category = line.split(':')[1].strip()
                if line.startswith('rating'):
                    rating = line.split(':')[1].strip()
                    self.findings[company][current_category] = [rating, '']
                if line.startswith('comments'):
                    self.findings[company][current_category][1] = line.split(':')[1].strip()

    def get_findings(self):
        if self.findings: return self.findings
        self.fetch_completions()
        self.parse_completions()
        return self.findings



