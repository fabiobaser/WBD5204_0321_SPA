import React, { useState } from "react";
import faker from "faker";
import { Card, Grid, Image, Pagination } from "semantic-ui-react";

export default () => {
  const [ap, setActivePage] = useState(0);

  const recipes = [];
  for (let i = 0; i < 100; i++) {
    recipes.push({
      title: faker.animal.fish(),
      img: `https://picsum.photos/seed/${"image-" + i}/200/150`,
      desc: faker.lorem.sentence(),
    });
  }

  const RecipeCard = ({ title, imageUrl, description }) => {
    return (
      <Card style={{ height: "100%" }}>
        <Image src={imageUrl} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Description>{description}</Card.Description>
        </Card.Content>
      </Card>
    );
  };

  const handlePageChange = (event, props) => {
    const { activePage } = props;
    setActivePage(activePage);
  };

  const pageSize = 10;
  console.log(recipes);
  const recipesOnPage = recipes.slice(pageSize * ap, pageSize * ap + pageSize);

  return (
    <div>
      <Grid columns={6}>
        {recipesOnPage.map((recipe) => (
          <Grid.Column>
            <RecipeCard
              title={recipe.title}
              imageUrl={recipe.img}
              description={recipe.desc}
            />
          </Grid.Column>
        ))}
      </Grid>
      <div
        style={{
          textAlign: "center",
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}
      >
        <Pagination
          defaultActivePage={0}
          totalPages={Math.ceil(recipes.length / 10)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
